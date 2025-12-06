import { useMemo } from 'react';
import questionsConfig from '@/configs/scorer_questions.json';

// Types based on scorer_questions.json structure
interface QuestionOptionWeight {
  [bucketSlug: string]: number;
}

interface GradeRules {
  [gradeLevel: string]: { [bucketSlug: string]: number };
}

interface Question {
  id: string;
  type: 'rank' | 'single' | 'scale';
  category?: string;
  options?: string[] | Record<string, string>;
  weight_mapping?: Record<string, QuestionOptionWeight>;
  weights?: Record<string, QuestionOptionWeight | number>;
  yes_weight?: number;
  scale_weight?: number;
  targets?: string[];
  negative_targets?: string[];
  grade_rules?: GradeRules;
  archetype_mapping?: Record<string, string>;
}

type AnswerValue = string | string[] | number | undefined;

export interface Answer {
  questionId: string;
  value: AnswerValue;
}

export interface Scores {
  [slug: string]: number;
}

// Psychological Archetype Types
export type ArchetypeType =
  | 'analytical'    // Logic-driven, data-oriented
  | 'creative'      // Design-focused, artistic
  | 'social'        // People-oriented, empathetic
  | 'practical'     // Hands-on, doer
  | 'investigative' // Research-oriented, curious
  | 'enterprising'  // Leadership-oriented, ambitious
  | 'intuitive'     // Gut-feeling, instinctive
  | 'idealistic'    // Values-driven, principled
  | 'conventional'; // Structured, traditional

export interface ArchetypeScores {
  [archetype: string]: number;
}

export interface PsychologicalProfile {
  primaryArchetype: ArchetypeType;
  secondaryArchetype: ArchetypeType | null;
  archetypeScores: ArchetypeScores;
  profileSummary: {
    en: string;
    ar: string;
  };
}

export interface MajorRecommendation {
  slug: string;
  score: number;
  matchScore: number; // 0-100 normalized score
  reasons: {
    en: string[];
    ar: string[];
  };
  isWildcard?: boolean;
}

export interface MajorScorerResult {
  scores: Scores;
  sortedMajors: MajorRecommendation[];
  boosters: string[];
  psychologicalProfile: PsychologicalProfile;
  wildcardMajor: MajorRecommendation | null;
}

// Bucket slugs from PRD §2
const BUCKET_SLUGS: string[] = [
  'cs_ai', 'cyber', 'data', 'soft_eng', 'elec', 'mech', 'civil', 'mechatro',
  'arch', 'graphic', 'media', 'bus_mgmt', 'acc_fin', 'econ', 'marketing',
  'law_intl', 'medicine', 'dentistry', 'pharmacy', 'nursing', 'biosci',
  'psych', 'edu_lang', 'tourism', 'aviation', '_other'
];

// Major display names for reason generation
const MAJOR_NAMES: Record<string, { en: string; ar: string }> = {
  cs_ai: { en: 'Computer Science & AI', ar: 'علوم الحاسوب والذكاء الاصطناعي' },
  cyber: { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
  data: { en: 'Data Science', ar: 'علم البيانات' },
  soft_eng: { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
  elec: { en: 'Electrical Engineering', ar: 'الهندسة الكهربائية' },
  mech: { en: 'Mechanical Engineering', ar: 'الهندسة الميكانيكية' },
  civil: { en: 'Civil Engineering', ar: 'الهندسة المدنية' },
  mechatro: { en: 'Mechatronics', ar: 'الميكاترونيكس' },
  arch: { en: 'Architecture', ar: 'العمارة' },
  graphic: { en: 'Graphic Design', ar: 'التصميم الجرافيكي' },
  media: { en: 'Media & Communication', ar: 'الإعلام والاتصال' },
  bus_mgmt: { en: 'Business Management', ar: 'إدارة الأعمال' },
  acc_fin: { en: 'Accounting & Finance', ar: 'المحاسبة والمالية' },
  econ: { en: 'Economics', ar: 'الاقتصاد' },
  marketing: { en: 'Marketing', ar: 'التسويق' },
  law_intl: { en: 'Law & International Relations', ar: 'القانون والعلاقات الدولية' },
  medicine: { en: 'Medicine', ar: 'الطب' },
  dentistry: { en: 'Dentistry', ar: 'طب الأسنان' },
  pharmacy: { en: 'Pharmacy', ar: 'الصيدلة' },
  nursing: { en: 'Nursing', ar: 'التمريض' },
  biosci: { en: 'Biological Sciences', ar: 'العلوم الحيوية' },
  psych: { en: 'Psychology', ar: 'علم النفس' },
  edu_lang: { en: 'Education & Languages', ar: 'التعليم واللغات' },
  tourism: { en: 'Tourism & Hospitality', ar: 'السياحة والضيافة' },
  aviation: { en: 'Aviation', ar: 'الطيران' },
};

// Archetype profile descriptions
const ARCHETYPE_PROFILES: Record<ArchetypeType, { en: string; ar: string }> = {
  analytical: {
    en: 'You are an "Analytical Thinker" who excels at breaking down complex problems with logic and precision.',
    ar: 'أنت "مفكر تحليلي" تتفوق في تحليل المشكلات المعقدة بالمنطق والدقة.'
  },
  creative: {
    en: 'You are a "Creative Visionary" who thrives on artistic expression and innovative design.',
    ar: 'أنت "صاحب رؤية إبداعية" تزدهر في التعبير الفني والتصميم المبتكر.'
  },
  social: {
    en: 'You are a "Social Connector" who finds fulfillment in understanding and helping others.',
    ar: 'أنت "رابط اجتماعي" تجد الرضا في فهم الآخرين ومساعدتهم.'
  },
  practical: {
    en: 'You are a "Practical Doer" who prefers hands-on work and tangible results.',
    ar: 'أنت "عملي منفذ" تفضل العمل اليدوي والنتائج الملموسة.'
  },
  investigative: {
    en: 'You are an "Investigative Scholar" driven by curiosity and the pursuit of knowledge.',
    ar: 'أنت "باحث استقصائي" تدفعك الفضول والسعي وراء المعرفة.'
  },
  enterprising: {
    en: 'You are an "Enterprising Leader" who naturally takes charge and drives initiatives forward.',
    ar: 'أنت "قائد ريادي" تتولى المسؤولية بشكل طبيعي وتدفع المبادرات للأمام.'
  },
  intuitive: {
    en: 'You are an "Intuitive Navigator" who trusts your instincts and sees patterns others miss.',
    ar: 'أنت "ملاح بديهي" تثق بحدسك وترى أنماطاً يفتقدها الآخرون.'
  },
  idealistic: {
    en: 'You are an "Idealistic Advocate" guided by strong values and a desire to make a difference.',
    ar: 'أنت "مناصر مثالي" توجهك قيم قوية ورغبة في إحداث فرق.'
  },
  conventional: {
    en: 'You are a "Systematic Organizer" who values structure, order, and established methods.',
    ar: 'أنت "منظم منهجي" تقدر البنية والنظام والأساليب المعتمدة.'
  }
};

// Reason templates for different scoring factors
const REASON_TEMPLATES: Record<string, { en: string; ar: string }> = {
  // Subject-based reasons
  math_affinity: { en: 'Your strong affinity for mathematics', ar: 'ميولك القوية للرياضيات' },
  physics_interest: { en: 'Your interest in physics and mechanics', ar: 'اهتمامك بالفيزياء والميكانيكا' },
  biology_passion: { en: 'Your passion for biology and life sciences', ar: 'شغفك بعلم الأحياء وعلوم الحياة' },
  chemistry_love: { en: 'Your love for chemistry', ar: 'حبك للكيمياء' },
  computer_enthusiasm: { en: 'Your enthusiasm for computers and technology', ar: 'حماسك للحاسوب والتكنولوجيا' },
  literature_appreciation: { en: 'Your appreciation for literature and language', ar: 'تقديرك للأدب واللغة' },
  art_creativity: { en: 'Your artistic creativity', ar: 'إبداعك الفني' },
  economics_interest: { en: 'Your interest in economics and markets', ar: 'اهتمامك بالاقتصاد والأسواق' },

  // Skill-based reasons
  analytical_skills: { en: 'Your strong analytical thinking skills', ar: 'مهاراتك القوية في التفكير التحليلي' },
  creative_abilities: { en: 'Your creative and artistic abilities', ar: 'قدراتك الإبداعية والفنية' },
  communication_strength: { en: 'Your excellent communication skills', ar: 'مهاراتك الممتازة في التواصل' },
  empathy_strength: { en: 'Your high level of empathy', ar: 'مستواك العالي من التعاطف' },
  detail_oriented: { en: 'Your detail-oriented approach', ar: 'منهجك الذي يهتم بالتفاصيل' },
  leadership_qualities: { en: 'Your leadership qualities', ar: 'صفاتك القيادية' },

  // Value-based reasons
  helping_others: { en: 'Your desire to help people directly', ar: 'رغبتك في مساعدة الناس مباشرة' },
  innovation_drive: { en: 'Your drive for innovation', ar: 'دافعك للابتكار' },
  social_impact: { en: 'Your commitment to social impact', ar: 'التزامك بالتأثير الاجتماعي' },
  financial_goals: { en: 'Your financial and career goals', ar: 'أهدافك المالية والمهنية' },
  stability_preference: { en: 'Your preference for career stability', ar: 'تفضيلك للاستقرار الوظيفي' },

  // Work style reasons
  tech_environment: { en: 'Your preference for tech-focused environments', ar: 'تفضيلك للبيئات التقنية' },
  healthcare_calling: { en: 'Your calling to healthcare', ar: 'دعوتك للرعاية الصحية' },
  outdoor_preference: { en: 'Your preference for outdoor work', ar: 'تفضيلك للعمل الخارجي' },
  creative_studio: { en: 'Your desire for creative work spaces', ar: 'رغبتك في مساحات العمل الإبداعية' },
  business_orientation: { en: 'Your business-oriented mindset', ar: 'عقليتك الموجهة للأعمال' },

  // Problem-solving style reasons
  logical_approach: { en: 'Your logical problem-solving approach', ar: 'منهجك المنطقي في حل المشكلات' },
  visual_thinking: { en: 'Your visual thinking style', ar: 'أسلوب تفكيرك البصري' },
  research_oriented: { en: 'Your research-oriented mindset', ar: 'عقليتك الموجهة للبحث' },
  experimental_nature: { en: 'Your experimental nature', ar: 'طبيعتك التجريبية' },

  // Grade-based reasons
  high_academic: { en: 'Your strong academic performance', ar: 'أداؤك الأكاديمي القوي' },
  academic_fit: { en: 'Programs matching your academic level', ar: 'برامج تناسب مستواك الأكاديمي' },
};

// Type assertion for the imported JSON
const questions: Question[] = questionsConfig as Question[];

// Helper function to determine reasons for a major
function generateReasonsForMajor(
  majorSlug: string,
  answers: Answer[],
  boosters: string[]
): { en: string[]; ar: string[] } {
  const reasons: { en: string[]; ar: string[] } = { en: [], ar: [] };
  const maxReasons = 3;

  // Map boosters to reason templates based on major
  const majorReasonMap: Record<string, string[]> = {
    cs_ai: ['computer_enthusiasm', 'analytical_skills', 'innovation_drive', 'tech_environment'],
    cyber: ['computer_enthusiasm', 'analytical_skills', 'detail_oriented', 'tech_environment'],
    data: ['math_affinity', 'analytical_skills', 'logical_approach', 'research_oriented'],
    soft_eng: ['computer_enthusiasm', 'logical_approach', 'detail_oriented', 'tech_environment'],
    elec: ['physics_interest', 'math_affinity', 'experimental_nature', 'analytical_skills'],
    mech: ['physics_interest', 'experimental_nature', 'outdoor_preference', 'analytical_skills'],
    civil: ['math_affinity', 'outdoor_preference', 'detail_oriented', 'analytical_skills'],
    mechatro: ['computer_enthusiasm', 'physics_interest', 'innovation_drive', 'experimental_nature'],
    arch: ['art_creativity', 'creative_abilities', 'visual_thinking', 'detail_oriented'],
    graphic: ['art_creativity', 'creative_abilities', 'visual_thinking', 'creative_studio'],
    media: ['creative_abilities', 'communication_strength', 'visual_thinking', 'creative_studio'],
    bus_mgmt: ['leadership_qualities', 'business_orientation', 'communication_strength', 'analytical_skills'],
    acc_fin: ['math_affinity', 'detail_oriented', 'analytical_skills', 'stability_preference'],
    econ: ['economics_interest', 'analytical_skills', 'research_oriented', 'business_orientation'],
    marketing: ['communication_strength', 'creative_abilities', 'business_orientation', 'leadership_qualities'],
    law_intl: ['communication_strength', 'analytical_skills', 'research_oriented', 'social_impact'],
    medicine: ['biology_passion', 'helping_others', 'healthcare_calling', 'high_academic'],
    dentistry: ['biology_passion', 'detail_oriented', 'healthcare_calling', 'helping_others'],
    pharmacy: ['chemistry_love', 'biology_passion', 'detail_oriented', 'healthcare_calling'],
    nursing: ['empathy_strength', 'helping_others', 'healthcare_calling', 'social_impact'],
    biosci: ['biology_passion', 'research_oriented', 'experimental_nature', 'innovation_drive'],
    psych: ['empathy_strength', 'helping_others', 'research_oriented', 'social_impact'],
    edu_lang: ['communication_strength', 'empathy_strength', 'helping_others', 'stability_preference'],
    tourism: ['communication_strength', 'social_impact', 'outdoor_preference', 'business_orientation'],
    aviation: ['physics_interest', 'outdoor_preference', 'leadership_qualities', 'analytical_skills'],
  };

  const relevantReasons = majorReasonMap[majorSlug] || ['analytical_skills', 'innovation_drive'];

  // Add reasons based on the major's key factors
  for (const reasonKey of relevantReasons) {
    if (reasons.en.length >= maxReasons) break;
    const template = REASON_TEMPLATES[reasonKey];
    if (template && !reasons.en.includes(template.en)) {
      reasons.en.push(template.en);
      reasons.ar.push(template.ar);
    }
  }

  // Ensure we have at least one reason
  if (reasons.en.length === 0) {
    reasons.en.push('Your overall profile matches this field');
    reasons.ar.push('ملفك الشخصي العام يتناسب مع هذا المجال');
  }

  return reasons;
}

// Calculate psychological archetype scores
function calculateArchetypeScores(answers: Answer[]): ArchetypeScores {
  const archetypeScores: ArchetypeScores = {
    analytical: 0,
    creative: 0,
    social: 0,
    practical: 0,
    investigative: 0,
    enterprising: 0,
    intuitive: 0,
    idealistic: 0,
    conventional: 0,
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    // Apply archetype mapping from questions
    if (question.archetype_mapping && typeof answer.value === 'string') {
      const archetype = question.archetype_mapping[answer.value];
      if (archetype && archetypeScores[archetype] !== undefined) {
        archetypeScores[archetype] += 3;
      }
    }

    // Additional archetype scoring based on scale questions
    if (question.type === 'scale' && typeof answer.value === 'number') {
      const normalizedValue = answer.value / 4; // Normalize to 0-1

      switch (question.id) {
        case 'ANALYTICAL_THINKING':
          archetypeScores.analytical += normalizedValue * 4;
          break;
        case 'CREATIVITY_LEVEL':
          archetypeScores.creative += normalizedValue * 4;
          break;
        case 'EMPATHY_LEVEL':
          archetypeScores.social += normalizedValue * 4;
          break;
        case 'CODING_INTEREST':
          archetypeScores.analytical += normalizedValue * 2;
          archetypeScores.practical += normalizedValue * 2;
          break;
        case 'COMMUNICATION_SKILL':
          archetypeScores.social += normalizedValue * 3;
          archetypeScores.enterprising += normalizedValue * 2;
          break;
        case 'RISK_TOLERANCE':
          archetypeScores.enterprising += normalizedValue * 3;
          break;
        case 'INNOVATION_DRIVE':
          archetypeScores.creative += normalizedValue * 2;
          archetypeScores.investigative += normalizedValue * 2;
          break;
        case 'HELPING_OTHERS':
          archetypeScores.social += normalizedValue * 3;
          archetypeScores.idealistic += normalizedValue * 2;
          break;
      }
    }

    // Team role based archetype scoring
    if (question.id === 'TEAM_ROLE' && typeof answer.value === 'string') {
      switch (answer.value) {
        case 'leader':
          archetypeScores.enterprising += 3;
          break;
        case 'executor':
          archetypeScores.practical += 3;
          break;
        case 'creative':
          archetypeScores.creative += 3;
          break;
        case 'analyst':
          archetypeScores.analytical += 3;
          break;
        case 'mediator':
          archetypeScores.social += 3;
          break;
        case 'researcher':
          archetypeScores.investigative += 3;
          break;
      }
    }
  });

  return archetypeScores;
}

// Determine the psychological profile
function determinePsychologicalProfile(archetypeScores: ArchetypeScores): PsychologicalProfile {
  const sortedArchetypes = Object.entries(archetypeScores)
    .sort(([, a], [, b]) => b - a) as [ArchetypeType, number][];

  const primaryArchetype = sortedArchetypes[0][0];
  const secondaryArchetype = sortedArchetypes[1][1] > 0 ? sortedArchetypes[1][0] : null;

  // Generate combined profile summary
  let summaryEn = ARCHETYPE_PROFILES[primaryArchetype].en;
  let summaryAr = ARCHETYPE_PROFILES[primaryArchetype].ar;

  if (secondaryArchetype && sortedArchetypes[1][1] >= sortedArchetypes[0][1] * 0.5) {
    // If secondary archetype is significant (at least 50% of primary)
    const secondaryAdditionEn = ` You also show strong ${secondaryArchetype} tendencies.`;
    const secondaryAdditionAr = ` كما تُظهر ميولاً ${secondaryArchetype === 'creative' ? 'إبداعية' :
      secondaryArchetype === 'analytical' ? 'تحليلية' :
      secondaryArchetype === 'social' ? 'اجتماعية' :
      secondaryArchetype === 'practical' ? 'عملية' :
      secondaryArchetype === 'investigative' ? 'استقصائية' :
      secondaryArchetype === 'enterprising' ? 'ريادية' :
      secondaryArchetype === 'intuitive' ? 'حدسية' :
      secondaryArchetype === 'idealistic' ? 'مثالية' : 'تقليدية'} قوية.`;
    summaryEn += secondaryAdditionEn;
    summaryAr += summaryAr.endsWith('.') ? summaryAr.slice(0, -1) + secondaryAdditionAr : secondaryAdditionAr;
  }

  return {
    primaryArchetype,
    secondaryArchetype,
    archetypeScores,
    profileSummary: {
      en: summaryEn,
      ar: summaryAr
    }
  };
}

// Find wildcard major - a good fit that's unexpected
function findWildcardMajor(
  sortedMajors: MajorRecommendation[],
  psychologicalProfile: PsychologicalProfile,
  answers: Answer[]
): MajorRecommendation | null {
  // Wildcard should be outside top 3 but still have a reasonable score
  // and match the psychological profile in an unexpected way

  const wildcardCandidates = sortedMajors.slice(3, 8); // Look at positions 4-8

  if (wildcardCandidates.length === 0) return null;

  // Find a major that fits the secondary archetype or represents an unexpected match
  const archetypeMajorMap: Record<ArchetypeType, string[]> = {
    analytical: ['data', 'cs_ai', 'acc_fin', 'elec'],
    creative: ['graphic', 'arch', 'media'],
    social: ['psych', 'nursing', 'edu_lang', 'marketing'],
    practical: ['mech', 'civil', 'mechatro', 'elec'],
    investigative: ['biosci', 'medicine', 'pharmacy', 'data'],
    enterprising: ['bus_mgmt', 'marketing', 'law_intl'],
    intuitive: ['marketing', 'graphic', 'media'],
    idealistic: ['law_intl', 'psych', 'edu_lang', 'nursing'],
    conventional: ['acc_fin', 'edu_lang', 'pharmacy']
  };

  // Try to find a wildcard based on secondary archetype
  if (psychologicalProfile.secondaryArchetype) {
    const secondaryMajors = archetypeMajorMap[psychologicalProfile.secondaryArchetype];
    for (const candidate of wildcardCandidates) {
      if (secondaryMajors.includes(candidate.slug)) {
        return {
          ...candidate,
          isWildcard: true,
          reasons: {
            en: [`This unexpected match aligns with your ${psychologicalProfile.secondaryArchetype} side`],
            ar: [`هذا الاختيار غير المتوقع يتوافق مع جانبك ${
              psychologicalProfile.secondaryArchetype === 'creative' ? 'الإبداعي' :
              psychologicalProfile.secondaryArchetype === 'social' ? 'الاجتماعي' :
              psychologicalProfile.secondaryArchetype === 'practical' ? 'العملي' : 'المختلف'
            }`]
          }
        };
      }
    }
  }

  // Default: return the first wildcard candidate
  if (wildcardCandidates[0] && wildcardCandidates[0].matchScore >= 30) {
    return {
      ...wildcardCandidates[0],
      isWildcard: true,
      reasons: {
        en: ['An unexpected career path worth exploring based on your hidden potential'],
        ar: ['مسار مهني غير متوقع يستحق الاستكشاف بناءً على إمكاناتك الخفية']
      }
    };
  }

  return null;
}

const useMajorScorer = (answers: Answer[]): MajorScorerResult => {
  // Memoize the result to prevent recalculation on every render
  // Only recalculate when answers actually change (using JSON.stringify for deep comparison)
  const answersKey = useMemo(() => JSON.stringify(answers), [answers]);

  return useMemo(() => {
    const scores: Scores = BUCKET_SLUGS.reduce((acc, slug) => {
      acc[slug] = 0;
      return acc;
    }, {} as Scores);

    const boosters: string[] = [];

    // Calculate archetype scores first
    const archetypeScores = calculateArchetypeScores(answers);
    const psychologicalProfile = determinePsychologicalProfile(archetypeScores);

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) {
        console.warn(`Question with id "${answer.questionId}" not found in configuration.`);
        return;
      }

      // Add boosters for single type questions
      if (typeof answer.value === 'string' && question.type === 'single') {
        if (question.id !== 'GRADE_BAND') {
          boosters.push(answer.value);
        }
      }

      // 1. Rank type questions - assign 3/2/1 points
      if (question.type === 'rank' && Array.isArray(answer.value)) {
        (answer.value as string[]).forEach((optionKey, index) => {
          if (question.weight_mapping && question.weight_mapping[optionKey]) {
            boosters.push(optionKey);
            const rankScoreValue = 3 - index; // 1st = 3, 2nd = 2, 3rd = 1

            const bucketWeights = question.weight_mapping[optionKey];
            for (const slug in bucketWeights) {
              if (BUCKET_SLUGS.includes(slug)) {
                scores[slug] += bucketWeights[slug] * rankScoreValue;
              }
            }
          }
        });
      }

      // 2. Single type questions - apply weights
      else if (question.type === 'single' && typeof answer.value === 'string') {
        const optionKey = answer.value;

        // Handle grade rules specially
        if (question.id === 'GRADE_BAND' && question.grade_rules) {
          const gradeRules = question.grade_rules[optionKey];
          if (gradeRules) {
            for (const slug in gradeRules) {
              if (BUCKET_SLUGS.includes(slug)) {
                scores[slug] += gradeRules[slug];
              }
            }
            // Add grade-based booster
            if (optionKey === 'above_90') boosters.push('gradeBand2');
            else if (optionKey === '80_90') boosters.push('gradeBand1');
            else if (optionKey === '70_80') boosters.push('gradeBand0');
            else boosters.push('gradeBandLow');
          }
        }
        // Standard weight mapping
        else if (question.weights) {
          const weightEntry = question.weights[optionKey];
          if (typeof weightEntry === 'object') {
            const bucketWeights = weightEntry as QuestionOptionWeight;
            for (const slug in bucketWeights) {
              if (BUCKET_SLUGS.includes(slug)) {
                scores[slug] += bucketWeights[slug];
              }
            }
          }
        }
        // Yes/No type with yes_weight
        else if (question.yes_weight && optionKey === 'yes' && question.targets) {
          question.targets.forEach(slug => {
            if (BUCKET_SLUGS.includes(slug)) {
              scores[slug] += question.yes_weight!;
            }
          });
        }
      }

      // 3. Scale type questions - value * scale_weight
      else if (question.type === 'scale' && typeof answer.value === 'number') {
        if (question.targets && question.scale_weight && question.id !== 'HIGHEST_TUITION') {
          question.targets.forEach(slug => {
            if (BUCKET_SLUGS.includes(slug)) {
              scores[slug] += (answer.value as number) * question.scale_weight!;
            }
          });

          // Handle negative targets (inverse relationship)
          if (question.negative_targets) {
            question.negative_targets.forEach(slug => {
              if (BUCKET_SLUGS.includes(slug)) {
                scores[slug] -= ((answer.value as number) - 2) * question.scale_weight! * 0.5;
              }
            });
          }
        }
      }
    });

    // Floor negative totals at 0
    for (const slug in scores) {
      if (scores[slug] < 0) {
        scores[slug] = 0;
      }
    }

    // Calculate max possible score for normalization
    const allScoreValues = Object.values(scores).filter(s => s > 0);
    const maxScore = Math.max(...allScoreValues, 1);

    // Sort majors by score
    let sortedMajors = Object.entries(scores)
      .filter(([slug]) => slug !== '_other')
      .map(([slug, score]) => {
        const matchScore = Math.round((score / maxScore) * 100);
        return {
          slug,
          score,
          matchScore: Math.min(99, Math.max(0, matchScore)), // Cap at 99 to leave room for perfect matches
          reasons: generateReasonsForMajor(slug, answers, boosters),
          isWildcard: false
        };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // Tie-breaking
        if (a.slug === 'cs_ai') return -1;
        if (b.slug === 'cs_ai') return 1;
        if (a.slug === 'aviation') return 1;
        if (b.slug === 'aviation') return -1;
        return a.slug.localeCompare(b.slug);
      });

    // Adjust match scores to be more realistic (top 3 should be 70-95)
    if (sortedMajors.length > 0) {
      sortedMajors = sortedMajors.map((major, index) => {
        let adjustedScore = major.matchScore;
        if (index === 0) {
          adjustedScore = Math.max(75, Math.min(95, major.matchScore));
        } else if (index < 3) {
          adjustedScore = Math.max(60, Math.min(90, major.matchScore - (index * 5)));
        }
        return { ...major, matchScore: adjustedScore };
      });
    }

    // Validate top major exists
    const validSlugs = BUCKET_SLUGS.filter(s => s !== '_other');
    if (sortedMajors.length > 0 && !validSlugs.includes(sortedMajors[0].slug)) {
      sortedMajors = sortedMajors.filter(m => validSlugs.includes(m.slug));
      if (sortedMajors.length === 0) {
        sortedMajors = [{
          slug: 'cs_ai',
          score: 0,
          matchScore: 60,
          reasons: { en: ['Default recommendation'], ar: ['توصية افتراضية'] },
          isWildcard: false
        }];
      }
    }

    // Find wildcard suggestion
    const wildcardMajor = findWildcardMajor(sortedMajors, psychologicalProfile, answers);

    // Unique boosters
    const uniqueBoosters = [...new Set(boosters)];

    return {
      scores,
      sortedMajors,
      boosters: uniqueBoosters,
      psychologicalProfile,
      wildcardMajor
    };
  }, [answersKey, answers]);
};

export { MAJOR_NAMES };
export default useMajorScorer;
