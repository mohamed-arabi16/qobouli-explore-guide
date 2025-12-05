import programsList from '@/data/programs.json';

// Define Program type based on the structure in programs.json (array of {title: string})
export interface Program {
  title: string;
  // Add other properties if programs.json items have more than just title
}

// Type assertion for the imported JSON
const programs: Program[] = programsList as Program[];

// Keyword map from PRD §2
export const keywordMap: Record<string, string[]> = {
  cs_ai: ['Computer', 'Software', 'AI', 'Data Science'],
  cyber: ['Cyber', 'Security', 'Forensic IT'],
  data: ['Data', 'Analytics', 'Big Data'],
  soft_eng: ['Software Engineering', 'Programming'],
  elec: ['Electrical', 'Electronics', 'Avionics'],
  mech: ['Mechanical', 'Automotive'],
  civil: ['Civil', 'Construction', 'Structural'],
  mechatro: ['Mechatronics', 'Robotics'],
  arch: ['Architecture', 'Interior'],
  graphic: ['Graphic', 'Visual', 'Animation'],
  media: ['Media', 'Cinema', 'TV', 'Film'],
  bus_mgmt: ['Management', 'Administration', 'Project'],
  acc_fin: ['Accounting', 'Finance'],
  econ: ['Economics', 'Banking'],
  marketing: ['Marketing', 'Logistics'],
  law_intl: ['Law', 'International Relations'],
  medicine: ['Medicine', 'Surgery'],
  dentistry: ['Dentistry', 'Orthodontics'],
  pharmacy: ['Pharmacy', 'Pharmacology'],
  nursing: ['Nursing', 'Physiotherapy', 'Midwifery'],
  biosci: ['Bio', 'Genetics', 'Molecular', 'Biotech'],
  psych: ['Psychology', 'Social Work'],
  edu_lang: ['Education', 'Teaching', 'Language', 'Translation'],
  tourism: ['Tourism', 'Hospitality'],
  aviation: ['Aviation', 'Pilot'],
  // _other has no keywords and should not be recommended
};

export interface SortedMajor {
  slug: string;
  score?: number; // Score is optional as PRD §5 pickPrograms signature only shows {slug:string}[]
}

// Pre-build an inverted index for faster lookups
const programIndex = new Map<string, Program[]>();
const allKeywords = new Set<string>();

// Populate allKeywords from keywordMap
Object.values(keywordMap).forEach(keys => {
  keys.forEach(k => allKeywords.add(k.toLowerCase()));
});

// Index all programs by their keywords
programs.forEach(program => {
  const programTitleLower = program.title.toLowerCase();
  allKeywords.forEach(keyword => {
    if (programTitleLower.includes(keyword)) {
      if (!programIndex.has(keyword)) {
        programIndex.set(keyword, []);
      }
      // Avoid adding duplicate programs for the same keyword
      if (!programIndex.get(keyword)!.find(p => p.title === program.title)) {
          programIndex.get(keyword)!.push(program);
      }
    }
  });
});


export function pickPrograms(sortedMajors: SortedMajor[]): Program[] {
  const result: Program[] = [];
  const pickedTitles = new Set<string>(); // To avoid duplicate programs in the result

  if (!programs || programs.length === 0) {
    console.warn('Program list is empty. Cannot pick programs.');
    return [];
  }

  for (const major of sortedMajors) {
    if (result.length >= 3) break;

    const slug = major.slug;
    const keys = keywordMap[slug] || [];
    if (keys.length === 0 && slug !== '_other') {
      console.warn(`No keywords found for slug: ${slug}`);
    }

    // Use the pre-built index for efficient lookup
    for (const key of keys) {
        const hits = programIndex.get(key.toLowerCase()) || [];
        for (const hit of hits) {
            if (result.length < 3 && !pickedTitles.has(hit.title)) {
                result.push(hit);
                pickedTitles.add(hit.title);
            }
            if (result.length >= 3) break;
        }
        if (result.length >= 3) break;
    }
  }
  return result;
}

// Note: PRD §5 mentions "Budget filtering optional when tuition is available."
// This implies programs.json might have tuition data later.
// For now, no budget filtering is implemented as tuition data is not in programs.json.
