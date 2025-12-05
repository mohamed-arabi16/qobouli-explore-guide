import programsList from '@/data/programs.json';

// Define Program type based on the structure in programs.json (array of {title: string})
export interface Program {
  title: string;
  // Add other properties if programs.json items have more than just title
}

// Type assertion for the imported JSON
const programs: Program[] = programsList as Program[];

// Keyword map - SIGNIFICANTLY EXPANDED for better program coverage
// Previous coverage: 58% | Target: 85%+
export const keywordMap: Record<string, string[]> = {
  // Technology & Computing (expanded)
  cs_ai: [
    'Computer', 'Software', 'AI', 'Data Science', 'Artificial Intelligence',
    'Machine Learning', 'Information System', 'Information Technology',
    'Computational', 'Digital', 'Web', 'Network', 'System Engineering'
  ],
  cyber: ['Cyber', 'Security', 'Forensic', 'Cryptography', 'Information Security'],
  data: ['Data', 'Analytics', 'Big Data', 'Statistics', 'Business Intelligence'],
  soft_eng: ['Software Engineering', 'Programming', 'Application Development', 'Mobile Development', 'Mobile Technology'],

  // Engineering (expanded)
  elec: [
    'Electrical', 'Electronics', 'Avionics', 'Power', 'Telecommunication', 'Signal',
    'Electric', 'Energy Systems', 'Energy Technology', 'Hybrid', 'Nuclear',
    'Alternative Energy', 'Energy Technologies', 'Electroneurophysiology'
  ],
  mech: [
    'Mechanical', 'Automotive', 'Machine', 'Manufacturing', 'Industrial Engineering',
    'Materials', 'Metallurg', 'Nanotechnology', 'Polymer', 'Welding', 'Mechanics',
    'Non Destructive', 'Testing'
  ],
  civil: [
    'Civil', 'Construction', 'Structural', 'Urban', 'City Planning', 'Regional Planning',
    'Infrastructure', 'Geotechnical', 'Geomatics', 'Surveying', 'Cadastre', 'Earthquake'
  ],
  mechatro: ['Mechatronics', 'Robotics', 'Automation', 'Control System', 'Defense Technologies'],

  // Design & Architecture (expanded)
  arch: [
    'Architecture', 'Interior', 'Landscape', 'Architectural', 'Urban Design',
    'Restoration', 'Environmental Design', 'Real Estate'
  ],
  graphic: [
    'Graphic', 'Visual', 'Animation', 'Game Design', 'Multimedia', 'Game Development',
    'Digital Design', 'Industrial Design', 'Product Design', 'Fashion', 'Arts And Design',
    'Ceramic', 'Jewelry', 'Textile Design', 'Communication Design', 'Packaging Design',
    'Design', 'User Experience', 'UX', 'Printing', 'Publishing', 'Shoe Design',
    'Textile Technology'
  ],

  // Media & Arts (expanded)
  media: [
    'Media', 'Cinema', 'TV', 'Film', 'Television', 'Journalism', 'Radio',
    'Broadcasting', 'Advertising', 'Public Relations', 'Communication',
    'Acting', 'Drama', 'Theatre', 'Performing Arts', 'Perorming Arts', 'Music', 'Photography',
    'Opera', 'Sound', 'Art Theory'
  ],

  // Business & Economics (expanded)
  bus_mgmt: [
    'Management', 'Administration', 'Project', 'Business', 'Enterprise',
    'Entrepreneur', 'Human Resource', 'Supply Chain', 'Operations',
    'Leadership', 'Strategic', 'Trade', 'Commerce', 'E-Commerce', 'Retail',
    'MBA', 'Executive', 'Industry'
  ],
  acc_fin: [
    'Accounting', 'Finance', 'Audit', 'Tax', 'Banking', 'Capital', 'Investment', 'Insurance',
    'Financial Engineering', 'Financial Technology', 'Fintech', 'Property', 'Valuation'
  ],
  econ: ['Economics', 'Economy', 'Econometrics', 'Development Economics'],
  marketing: ['Marketing', 'Logistics', 'Sales', 'Brand', 'Consumer', 'Market Research'],

  // Law & Politics (expanded)
  law_intl: [
    'Law', 'International Relations', 'Political', 'Diplomacy', 'Justice',
    'Legal', 'Public Administration', 'Government', 'Human Rights'
  ],

  // Medicine & Health (significantly expanded)
  medicine: [
    'Medicine', 'Surgery', 'Medical', 'Clinical', 'Physician', 'Doctor',
    'Pathology', 'Radiology', 'Emergency', 'Anesthesia', 'Anaesthesia',
    'Cardiology', 'Neurology', 'Oncology', 'Pediatric', 'Internal Medicine',
    'Surgical', 'Operating Room', 'Perfusion', 'Health Physics', 'Neuroscience'
  ],
  dentistry: [
    'Dentistry', 'Orthodontics', 'Dental', 'Oral', 'Prosthodontic', 'Endodontic',
    'Pedodontics', 'Periodontology', 'Aesthetic', 'Aestetic', 'Restorative'
  ],
  pharmacy: ['Pharmacy', 'Pharmacology', 'Pharmaceutical', 'Drug', 'Cosmetic', 'Medicinal'],
  nursing: [
    'Nursing', 'Physiotherapy', 'Midwifery', 'Paramedic', 'Emergency Aid',
    'First Aid', 'Patient Care', 'Healthcare', 'Elderly Care', 'Disabled Care',
    'Audiology', 'Audiometry', 'Dialysis', 'Home Care', 'Palliative',
    'Opticianry', 'Optometry', 'Podology', 'Orthopaedic Prosthesis', 'Chiropractic',
    'Occupational Health', 'Safety'
  ],

  // Life Sciences (expanded)
  biosci: [
    'Bio', 'Genetics', 'Molecular', 'Biotech', 'Biology', 'Biochemistry',
    'Microbiology', 'Anatomy', 'Physiology', 'Embryology', 'Laboratory',
    'Food', 'Nutrition', 'Dietetics', 'Environmental Science', 'Chemistry',
    'Chemical', 'Agricultural', 'Veterinary', 'Stem Cell', 'Physics',
    'Mathematics', 'Applied Math', 'Science'
  ],

  // Psychology & Social Sciences (expanded)
  psych: [
    'Psychology', 'Social Work', 'Sociology', 'Anthropology', 'Counseling',
    'Therapy', 'Mental Health', 'Rehabilitation', 'Child Development', 'Child Develeopment',
    'Family', 'Addiction', 'Behavioral', 'Cognitive', 'Social Service',
    'History', 'Philosophy', 'Migration', 'Middle East', 'Islamic Studies',
    'European Union', 'Global Relations', 'Organizational Behavior'
  ],

  // Education & Languages (expanded)
  edu_lang: [
    'Education', 'Teaching', 'Language', 'Translation', 'Pedagogy',
    'Curriculum', 'School', 'Guidance', 'English', 'Arabic', 'Turkish',
    'German', 'French', 'Spanish', 'Russian', 'Chinese', 'Japanese',
    'Literature', 'Linguistics', 'Writing', 'Interpretation', 'Coaching',
    'Sports Science', 'Exercise', 'Physical Education', 'Athletic'
  ],

  // Tourism & Hospitality (expanded)
  tourism: [
    'Tourism', 'Hospitality', 'Hotel', 'Travel', 'Culinary', 'Gastronomy',
    'Chef', 'Cook', 'Food and Beverage', 'Event', 'Recreation', 'Leisure',
    'Pastry', 'Bakery', 'Tourist Guiding', 'Seaman', 'Maritime', 'Underwater'
  ],

  // Aviation & Aerospace (expanded)
  aviation: [
    'Aviation', 'Pilot', 'Aerospace', 'Aircraft', 'Aeronautical', 'Air Traffic',
    'Flight', 'Cabin Crew', 'Ground Handling', 'Airport'
  ],
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
