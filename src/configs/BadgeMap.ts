export interface BadgeDetail {
  emoji: string;
  label_en: string;
  label_ar: string;
}

export interface BadgeMap {
  [major_slug: string]: BadgeDetail;
}

const badgeMap: BadgeMap = {
  // Technology & Computing
  cs_ai: {
    emoji: '🤖',
    label_en: 'Tech Innovator',
    label_ar: 'مبتكر تقني',
  },
  cyber: {
    emoji: '🔐',
    label_en: 'Digital Guardian',
    label_ar: 'حارس رقمي',
  },
  data: {
    emoji: '📊',
    label_en: 'Data Explorer',
    label_ar: 'مستكشف البيانات',
  },
  soft_eng: {
    emoji: '💻',
    label_en: 'Code Architect',
    label_ar: 'مهندس البرمجيات',
  },

  // Engineering
  elec: {
    emoji: '⚡',
    label_en: 'Electric Mind',
    label_ar: 'عقل كهربائي',
  },
  mech: {
    emoji: '⚙️',
    label_en: 'Machine Master',
    label_ar: 'سيد الآلات',
  },
  civil: {
    emoji: '🏗️',
    label_en: 'Structure Builder',
    label_ar: 'باني الهياكل',
  },
  mechatro: {
    emoji: '🦾',
    label_en: 'Robotics Pioneer',
    label_ar: 'رائد الروبوتات',
  },

  // Design & Architecture
  arch: {
    emoji: '🏛️',
    label_en: 'Space Designer',
    label_ar: 'مصمم الفضاءات',
  },
  graphic: {
    emoji: '🎨',
    label_en: 'Visual Creator',
    label_ar: 'مبدع بصري',
  },
  media: {
    emoji: '🎬',
    label_en: 'Media Storyteller',
    label_ar: 'راوي إعلامي',
  },

  // Business & Finance
  bus_mgmt: {
    emoji: '📈',
    label_en: 'Business Leader',
    label_ar: 'قائد أعمال',
  },
  acc_fin: {
    emoji: '💰',
    label_en: 'Finance Expert',
    label_ar: 'خبير مالي',
  },
  econ: {
    emoji: '📉',
    label_en: 'Economy Analyst',
    label_ar: 'محلل اقتصادي',
  },
  marketing: {
    emoji: '📣',
    label_en: 'Brand Strategist',
    label_ar: 'استراتيجي العلامات',
  },

  // Law & Politics
  law_intl: {
    emoji: '⚖️',
    label_en: 'Justice Advocate',
    label_ar: 'مناصر العدالة',
  },

  // Healthcare
  medicine: {
    emoji: '🩺',
    label_en: 'Healing Hero',
    label_ar: 'بطل الشفاء',
  },
  dentistry: {
    emoji: '🦷',
    label_en: 'Smile Guardian',
    label_ar: 'حارس الابتسامة',
  },
  pharmacy: {
    emoji: '💊',
    label_en: 'Wellness Expert',
    label_ar: 'خبير العافية',
  },
  nursing: {
    emoji: '👩‍⚕️',
    label_en: 'Care Champion',
    label_ar: 'بطل الرعاية',
  },
  biosci: {
    emoji: '🧬',
    label_en: 'Life Scientist',
    label_ar: 'عالم الحياة',
  },

  // Social Sciences
  psych: {
    emoji: '🧠',
    label_en: 'Mind Explorer',
    label_ar: 'مستكشف العقل',
  },
  edu_lang: {
    emoji: '📚',
    label_en: 'Knowledge Shaper',
    label_ar: 'صانع المعرفة',
  },

  // Tourism & Aviation
  tourism: {
    emoji: '🌍',
    label_en: 'World Explorer',
    label_ar: 'مستكشف العالم',
  },
  aviation: {
    emoji: '✈️',
    label_en: 'Sky Navigator',
    label_ar: 'ملاح السماء',
  },

  // Legacy mappings for backward compatibility
  computer: {
    emoji: '💻',
    label_en: 'Tech Explorer',
    label_ar: 'مستكشف التكنولوجيا',
  },
  engineering: {
    emoji: '⚙️',
    label_en: 'Engineering Innovator',
    label_ar: 'مبتكر الهندسة',
  },
  design: {
    emoji: '🎨',
    label_en: 'Design Visionary',
    label_ar: 'صاحب رؤية في التصميم',
  },
  business: {
    emoji: '📈',
    label_en: 'Business Strategist',
    label_ar: 'استراتيجي الأعمال',
  },
  law: {
    emoji: '⚖️',
    label_en: 'Justice Advocate',
    label_ar: 'ناصر العدالة',
  },
  science: {
    emoji: '🔬',
    label_en: 'Science Pathfinder',
    label_ar: 'رائد العلوم',
  },
  arts: {
    emoji: '🎭',
    label_en: 'Creative Spirit',
    label_ar: 'روح إبداعية',
  },
  education: {
    emoji: '🧑‍🏫',
    label_en: 'Knowledge Shaper',
    label_ar: 'صانع المعرفة',
  },
  architecture: {
    emoji: '🏗️',
    label_en: 'Structure Shaper',
    label_ar: 'مصمم هياكل',
  },
  sports: {
    emoji: '🏃',
    label_en: 'Sports Pro',
    label_ar: 'محترف رياضي',
  },
  language: {
    emoji: '🈶',
    label_en: 'Linguist',
    label_ar: 'خبير لغات',
  },
  social_sciences: {
    emoji: '🌍',
    label_en: 'Social Analyst',
    label_ar: 'محلل اجتماعي',
  },
  health: {
    emoji: '🏥',
    label_en: 'Health Hero',
    label_ar: 'بطل الصحة',
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
