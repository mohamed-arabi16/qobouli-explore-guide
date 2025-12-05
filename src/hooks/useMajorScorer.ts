import questionsConfig from '@/configs/scorer_questions.json';

// Types based on scorer_questions.json structure and PRD §4
interface QuestionOptionWeight {
  [bucketSlug: string]: number;
}

interface Question {
  id: string;
  type: 'rank' | 'single' | 'scale';
  // prompt_en: string; // Not directly used in scoring logic but part of the structure
  // prompt_ar?: string;
  options?: string[] | Record<string, string>; // Used to validate answers for 'rank' and 'single' if needed
  // options_en?: Record<string, string>; // Alternative for options
  weight_mapping?: Record<string, QuestionOptionWeight>; // For 'rank' type
  weights?: Record<string, QuestionOptionWeight | number>; // For 'single' type (can be direct weights or option-to-bucket map)
  yes_weight?: number; // For 'single' type with 'yes'/'no' options
  scale_weight?: number; // For 'scale' type
  targets?: string[]; // For 'single' with 'yes_weight' and 'scale' types
}

// Define a more specific type for answer values
type AnswerValue = string | string[] | number | undefined;

export interface Answer {
  questionId: string;
  value: AnswerValue;
}

export interface Scores {
  [slug: string]: number;
}

export interface MajorScorerResult {
  scores: Scores;
  sortedMajors: { slug: string; score: number }[];
  boosters: string[];
}

// Bucket slugs from PRD §2
const BUCKET_SLUGS: string[] = [
  'cs_ai', 'cyber', 'data', 'soft_eng', 'elec', 'mech', 'civil', 'mechatro',
  'arch', 'graphic', 'media', 'bus_mgmt', 'acc_fin', 'econ', 'marketing',
  'law_intl', 'medicine', 'dentistry', 'pharmacy', 'nursing', 'biosci',
  'psych', 'edu_lang', 'tourism', 'aviation', '_other'
];

// Type assertion for the imported JSON
const questions: Question[] = questionsConfig as Question[];

const useMajorScorer = (answers: Answer[]): MajorScorerResult => {
  const scores: Scores = BUCKET_SLUGS.reduce((acc, slug) => {
    acc[slug] = 0;
    return acc;
  }, {} as Scores);

  const boosters: string[] = [];

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) {
      console.warn(`Question with id "${answer.questionId}" not found in configuration.`);
      return;
    }

    // General booster for the answer value if it's a simple string and not a complex object/array
    // Specific boosters for rank items and grade bands are handled within their logic
    if (typeof answer.value === 'string' && question.type === 'single') {
        // This will add boosters like "robot", "logical", "yes", "love", "agree" etc.
        // For GRADE, it will add "lt70", "70_85", "gt85", which are then replaced by gradeBand boosters
        if (question.id !== 'GRADE') { // Grade boosters are handled specially
             boosters.push(answer.value);
        }
    }


    // 1. Rank – assign 3/2/1. (PRD §4.1)
    if (question.type === 'rank' && Array.isArray(answer.value)) {
      (answer.value as string[]).forEach((optionKey, index) => {
        if (question.weight_mapping && question.weight_mapping[optionKey]) {
          boosters.push(optionKey); // Add ranked item as booster (e.g., "math", "physics")
          const rankScoreValue = 3 - index; // 1st choice = 3, 2nd = 2, 3rd = 1

          const bucketWeights = question.weight_mapping[optionKey];
          for (const slug in bucketWeights) {
            if (BUCKET_SLUGS.includes(slug)) {
              scores[slug] += bucketWeights[slug] * rankScoreValue;
            }
          }
        }
      });
    }

    // 2. Single – if option weight map exists, add. If yes_weight, add to targets. (PRD §4.2)
    // 4. love/ok/no mapping – love=3, ok=1, no=0. (PRD §4.4) - handled by weights in JSON
    else if (question.type === 'single' && typeof answer.value === 'string') {
      const optionKey = answer.value;

      if (question.weights) {
        const weightEntry = question.weights[optionKey];
        if (typeof weightEntry === 'object') { // Option maps to bucket weights
          const bucketWeights = weightEntry as QuestionOptionWeight;
          for (const slug in bucketWeights) {
            if (BUCKET_SLUGS.includes(slug)) {
              scores[slug] += bucketWeights[slug];
            }
          }
        }
        // PRD §4.4 implies love=3, ok=1, no=0 as multipliers, but JSON defines direct bucket weights.
        // The current JSON structure for questions like HEALTHCARE directly assigns scores to buckets per option.
        // e.g., "weights": {"love": {"medicine": 3, "nursing": 2}, "ok": {"nursing": 1}}
        // If "no" should universally subtract or add points, it needs to be in JSON or handled here.
        // The PRD is slightly ambiguous here, but current code follows JSON structure.
      } else if (question.yes_weight && optionKey === 'yes' && question.targets) {
        // This handles questions like EMPATHY, RISK, SALARY, etc.
        question.targets.forEach(slug => {
          if (BUCKET_SLUGS.includes(slug)) {
            scores[slug] += question.yes_weight!;
          }
        });
      }
    }

    // 3. Scale – value * scale_weight to each target bucket. (PRD §4.3)
    else if (question.type === 'scale' && typeof answer.value === 'number') {
      if (question.targets && question.scale_weight) {
        // Exclude BUDGET question from direct scoring of program buckets as per PRD "targets": []
        if (question.id !== 'BUDGET') {
            question.targets.forEach(slug => {
                if (BUCKET_SLUGS.includes(slug)) {
                scores[slug] = (scores[slug] || 0) + (answer.value as number) * question.scale_weight!;
                }
            });
        }
        // Booster for scale questions? PRD §4.8 "Output boosters ([ "math", "logical", "gradeBand1", …])"
        // doesn't show an example for scale question values themselves being boosters.
        // The question ID itself (e.g. "MATH") could be a booster if needed by explanation layer.
        // For now, not adding direct scale value as a booster.
      }
    }

    // 5. Grade-band rule (PRD §4.5)
    if (question.id === 'GRADE' && typeof answer.value === 'string') {
      const gradeValue = answer.value;
      if (gradeValue === 'lt70') {
        boosters.push('gradeBand0');
        scores['medicine']  -= 5;
        scores['dentistry'] -= 4;
        scores['elec']      -= 2;
        scores['mech']      -= 2;
        scores['civil']     -= 2;
      } else if (gradeValue === 'gt85') {
        boosters.push('gradeBand2');
        scores['medicine'] += 1;
        scores['cs_ai']    += 1;
        scores['elec']     += 1;
        scores['mech']     += 1;
        scores['civil']    += 1;
      } else if (gradeValue === '70_85') {
        boosters.push('gradeBand1');
        // No score changes for 70-85 band as per PRD.
      }
    }
  });

  // 6. Floor negative totals at 0. (PRD §4.6)
  for (const slug in scores) {
    if (scores[slug] < 0) {
      scores[slug] = 0;
    }
  }

  // 7. Sort; tie-break array (keep cs_ai first, aviation last). (PRD §4.7)
  let sortedMajors = Object.entries(scores)
    .map(([slug, score]) => ({ slug, score }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Tie-breaking logic
      if (a.slug === 'cs_ai' && b.slug !== 'cs_ai') return -1;
      if (b.slug === 'cs_ai' && a.slug !== 'cs_ai') return 1;
      if (a.slug === 'aviation' && b.slug !== 'aviation') return 1;
      if (b.slug === 'aviation' && a.slug !== 'aviation') return -1;
      return a.slug.localeCompare(b.slug); // Alphabetical for other ties
    });

  // Filter out _other slug from the final sorted list as per PRD §2 "Unmatched rows fall into _other and are never recommended."
  sortedMajors = sortedMajors.filter(major => major.slug !== '_other');
  
  // Ensure top major exists in database (fallback to cs_ai if not found)
  if (sortedMajors.length > 0) {
    const validSlugs = ['cs_ai', 'cyber', 'data', 'soft_eng', 'elec', 'mech', 'civil', 'mechatro', 
                        'arch', 'graphic', 'media', 'bus_mgmt', 'acc_fin', 'econ', 'marketing',
                        'law_intl', 'medicine', 'dentistry', 'pharmacy', 'nursing', 'biosci',
                        'psych', 'edu_lang', 'tourism', 'aviation'];
    if (!validSlugs.includes(sortedMajors[0].slug)) {
      console.warn(`Top major slug "${sortedMajors[0].slug}" not in valid database slugs, defaulting to cs_ai`);
      sortedMajors = sortedMajors.filter(m => validSlugs.includes(m.slug));
      if (sortedMajors.length === 0) {
        sortedMajors = [{ slug: 'cs_ai', score: 0 }];
      }
    }
  }

  // 8. Output boosters (PRD §4.8)
  const uniqueBoosters = [...new Set(boosters)];

  return { scores, sortedMajors, boosters: uniqueBoosters };
};

export default useMajorScorer;
