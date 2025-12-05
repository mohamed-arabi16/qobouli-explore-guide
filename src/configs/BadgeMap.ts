export interface BadgeDetail {
  emoji: string;
  label_en: string;
  label_ar: string;
}

export interface BadgeMap {
  [major_slug: string]: BadgeDetail;
}

// Badge map using the correct major slugs from useMajorScorer.ts
// Slugs: cs_ai, cyber, data, soft_eng, elec, mech, civil, mechatro, arch, graphic,
//        media, bus_mgmt, acc_fin, econ, marketing, law_intl, medicine, dentistry,
//        pharmacy, nursing, biosci, psych, edu_lang, tourism, aviation
const badgeMap: BadgeMap = {
  cs_ai: {
    emoji: '💻',
    label_en: 'Tech Explorer',
    label_ar: 'مستكشف التقنية',
  },
  cyber: {
    emoji: '🛡️',
    label_en: 'Cybersecurity Guardian',
    label_ar: 'حارس الأمن السيبراني',
  },
  data: {
    emoji: '📊',
    label_en: 'Data Analyst',
    label_ar: 'محلل بيانات',
  },
  soft_eng: {
    emoji: '👨‍💻',
    label_en: 'Software Developer',
    label_ar: 'مطور برمجيات',
  },
  elec: {
    emoji: '⚡',
    label_en: 'Circuit Expert',
    label_ar: 'خبير الدوائر الكهربائية',
  },
  mech: {
    emoji: '⚙️',
    label_en: 'Mechanical Engineer',
    label_ar: 'مهندس ميكانيكا',
  },
  civil: {
    emoji: '🏗️',
    label_en: 'Infrastructure Engineer',
    label_ar: 'مهندس بنية تحتية',
  },
  mechatro: {
    emoji: '🤖',
    label_en: 'Robotics Engineer',
    label_ar: 'مهندس روبوتات',
  },
  arch: {
    emoji: '🏛️',
    label_en: 'Creative Architect',
    label_ar: 'مهندس معماري مبدع',
  },
  graphic: {
    emoji: '🎨',
    label_en: 'Visual Designer',
    label_ar: 'مصمم بصري',
  },
  media: {
    emoji: '🎥',
    label_en: 'Media Expert',
    label_ar: 'خبير الإعلام',
  },
  bus_mgmt: {
    emoji: '📈',
    label_en: 'Business Leader',
    label_ar: 'قائد أعمال',
  },
  acc_fin: {
    emoji: '💰',
    label_en: 'Finance Specialist',
    label_ar: 'اختصاصي مالية',
  },
  econ: {
    emoji: '📉',
    label_en: 'Economic Analyst',
    label_ar: 'محلل اقتصادي',
  },
  marketing: {
    emoji: '📣',
    label_en: 'Marketing Expert',
    label_ar: 'خبير تسويق',
  },
  law_intl: {
    emoji: '⚖️',
    label_en: 'International Lawyer',
    label_ar: 'محامي دولي',
  },
  medicine: {
    emoji: '🩺',
    label_en: 'Doctor',
    label_ar: 'طبيب',
  },
  dentistry: {
    emoji: '🦷',
    label_en: 'Dentist',
    label_ar: 'اختصاصي أسنان',
  },
  pharmacy: {
    emoji: '💊',
    label_en: 'Pharmacist',
    label_ar: 'صيدلاني',
  },
  nursing: {
    emoji: '👩‍⚕️',
    label_en: 'Care Nurse',
    label_ar: 'ممرض رعاية',
  },
  biosci: {
    emoji: '🔬',
    label_en: 'Bioscience Researcher',
    label_ar: 'باحث علوم حيوية',
  },
  psych: {
    emoji: '🧠',
    label_en: 'Psychological Counselor',
    label_ar: 'مستشار نفسي',
  },
  edu_lang: {
    emoji: '🧑‍🏫',
    label_en: 'Educator & Language Expert',
    label_ar: 'معلّم وخبير لغات',
  },
  tourism: {
    emoji: '🏨',
    label_en: 'Hospitality & Tourism Expert',
    label_ar: 'خبير ضيافة وسياحة',
  },
  aviation: {
    emoji: '✈️',
    label_en: 'Aviation Leader',
    label_ar: 'قائد طيران',
  },
  // Default or fallback badge
  default: {
    emoji: '🌟',
    label_en: 'Future Shaper',
    label_ar: 'صانع المستقبل',
  }
};

export const getBadgeForMajor = (majorSlug: string | null): BadgeDetail => {
  if (majorSlug && badgeMap[majorSlug]) {
    return badgeMap[majorSlug];
  }
  return badgeMap.default;
};

export default badgeMap;
