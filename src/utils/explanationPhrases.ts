// src/utils/explanationPhrases.ts

export type Locale = 'en' | 'ar';

export const phraseMap: Record<string, (loc: Locale) => string> = {
  // SP1 - Rank school subjects
  math:       (loc: Locale) => loc === 'ar' ? 'لديك شغف بالرياضيات وحل المعادلات.' : 'You are passionate about mathematics and solving equations.',
  physics:    (loc: Locale) => loc === 'ar' ? 'تستمتع بفهم قوانين الفيزياء والكون.' : 'You enjoy understanding the laws of physics and the universe.',
  biology:    (loc: Locale) => loc === 'ar' ? 'لديك فضول تجاه علوم الأحياء والكائنات الحية.' : 'You are curious about biology and living organisms.',
  computer:   (loc: Locale) => loc === 'ar' ? 'تنجذب إلى عالم الحاسوب والتكنولوجيا الرقمية.' : 'You are drawn to the world of computers and digital technology.',
  literature: (loc: Locale) => loc === 'ar' ? 'تقدّر الأدب وتحليل النصوص بعمق.' : 'You appreciate literature and analyzing texts deeply.',
  art:        (loc: Locale) => loc === 'ar' ? 'لديك حس فني وتميل إلى التعبير الإبداعي.' : 'You have an artistic sense and lean towards creative expression.',
  economics:  (loc: Locale) => loc === 'ar' ? 'تهتم بالاقتصاد وكيفية عمل الأسواق.' : 'You are interested in economics and how markets work.',
  social:     (loc: Locale) => loc === 'ar' ? 'تستمتع بدراسة المجتمعات والعلاقات الإنسانية.' : 'You enjoy studying societies and human relations.',

  // PRJ - Best school project
  robot:       (loc: Locale) => loc === 'ar' ? 'بناء الروبوتات يظهر اهتمامك بالهندسة والأتمتة.' : 'Building robots shows your interest in engineering and automation.',
  financeSim:  (loc: Locale) => loc === 'ar' ? 'إدارة محاكاة مالية تعكس ميولك نحو الأعمال والتحليل المالي.' : 'Managing a finance simulation reflects your inclination towards business and financial analysis.',
  artExpo:     (loc: Locale) => loc === 'ar' ? 'تنظيم معرض فني يسلط الضوء على مهاراتك الإبداعية والتنظيمية.' : 'Organizing an art exhibition highlights your creative and organizational skills.',
  documentary: (loc: Locale) => loc === 'ar' ? 'إنتاج فيلم وثائقي قصير يكشف عن اهتمامك بالإعلام وسرد القصص.' : 'Producing a short documentary reveals your interest in media and storytelling.',
  bioFair:     (loc: Locale) => loc === 'ar' ? 'المشاركة في معرض علوم الأحياء تبرز شغفك بالبحث العلمي البيولوجي.' : 'Participating in a bio science fair showcases your passion for biological research.',
  modelPlane:  (loc: Locale) => loc === 'ar' ? 'بناء نموذج طائرة يشير إلى اهتمامك بالطيران والهندسة الدقيقة.' : 'Building a model airplane indicates your interest in aviation and precision engineering.',

  // STYLE - Problem-solving style
  logical:  (loc: Locale) => loc === 'ar' ? 'أسلوبك المنطقي والتحليلي يساعدك على فهم المشكلات المعقدة.' : 'Your logical and analytical style helps you understand complex problems.',
  visual:   (loc: Locale) => loc === 'ar' ? 'تفكيرك البصري يجعلك مبدعًا في إيجاد حلول مرئية وتصميمية.' : 'Your visual thinking makes you creative in finding visual and design-oriented solutions.',
  empathic: (loc: Locale) => loc === 'ar' ? 'تركيزك على التعاطف يجعلك ماهرًا في فهم احتياجات الآخرين.' : 'Your focus on empathy makes you skilled in understanding others\' needs.',
  // 'debate' from STYLE is different from 'DEBATE' question. Using 'debateStyle' for clarity if needed, or assume context handles it.
  // For now, using 'debate' as the booster key is 'debate'.
  debate:   (loc: Locale) => loc === 'ar' ? 'قدرتك على الإقناع والنقاش تدعم توجهاتك القيادية والقانونية.' : 'Your persuasive and debate-oriented style supports leadership and legal inclinations.',
  venture:  (loc: Locale) => loc === 'ar' ? 'روح المبادرة لديك تشير إلى استعدادك للمخاطرة والابتكار في الأعمال.' : 'Your entrepreneurial spirit indicates a readiness for risk-taking and business innovation.',

  // TEAM - Team role
  coder:      (loc: Locale) => loc === 'ar' ? 'في الفريق، غالبًا ما تكون أنت من يقوم بالبرمجة والتنفيذ التقني.' : 'In a team, you are often the one doing the coding and technical implementation.',
  planner:    (loc: Locale) => loc === 'ar' ? 'تتميز بمهارات التخطيط والتنسيق وإدارة المشاريع.' : 'You excel at planning, coordinating, and managing projects.',
  presenter:  (loc: Locale) => loc === 'ar' ? 'قدرتك على العرض والإلقاء تجعلك المتحدث باسم الفريق.' : 'Your presentation skills make you the spokesperson for the team.',
  caregiver:  (loc: Locale) => loc === 'ar' ? 'تهتم براحة الفريق وتوفير الدعم المعنوي، مما يعزز التعاون.' : 'You care for the team\'s well-being and provide moral support, fostering collaboration.',
  researcher: (loc: Locale) => loc === 'ar' ? 'تميل إلى البحث العميق وجمع المعلومات لدعم قرارات الفريق.' : 'You tend to do in-depth research and gather information to support team decisions.',

  // EMPATHY, RISK, SALARY, LAB_WORK, OUTDOOR, SPORTS_INT, ENVIRON, RESEARCH, STABILITY, TRAVEL - common "yes" / "no"
  // Generally, "yes" responses are good boosters. "no" might be less useful for positive explanation.
  yes: (loc: Locale) => loc === 'ar' ? 'إجابتك الإيجابية تعكس اهتمامًا واضحًا.' : 'Your positive response reflects a clear interest.', // Generic "yes" - specific ones below

  // LEAD
  agree:    (loc: Locale) => loc === 'ar' ? 'تفضيلك لقيادة المجموعات الكبيرة يظهر ميولك القيادية.' : 'Your preference for leading large groups shows your leadership inclinations.',
  // neutral: (loc: Locale) => loc === 'ar' ? ' موقفك المحايد يشير إلى مرونتك.' : 'Your neutral stance indicates flexibility.', // Less strong as a booster
  // disagree: (loc: Locale) => loc === 'ar' ? 'تفضيلك لعدم القيادة قد يعني تركيزك على أدوار أخرى.' : 'Your preference not to lead might mean you focus on other roles.', // Not a positive booster

  // RESEARCH (yes/no)
  // 'yes' handled by specific phrase if needed, or generic 'yes'.
  // 'no' for RESEARCH implies preference for performing.
  research_yes: (loc: Locale) => loc === 'ar' ? 'تفضيلك للبحث على الأداء المسرحي يشير إلى طبيعة تحليلية واستقصائية.' : 'Preferring research over performing suggests an analytical and investigative nature.',
  research_no: (loc: Locale) => loc === 'ar' ? 'تفضيلك للأداء المسرحي على البحث يبرز مهاراتك في التواصل والعرض.' : 'Preferring performing over research highlights your communication and presentation skills.',


  // STABILITY (yes/no)
  stability_yes: (loc: Locale) => loc === 'ar' ? 'بحثك عن الاستقرار الوظيفي يوجهك نحو مهن ذات أمان عالٍ.' : 'Your preference for job stability guides you towards secure professions.',
  stability_no: (loc: Locale) => loc === 'ar' ? 'عدم إعطاء الأولوية للاستقرار الوظيفي قد يعني انفتاحك على مجالات ديناميكية ومتغيرة.' : 'Not prioritizing job stability may mean openness to dynamic and changing fields.',

  // HEALTHCARE, MEDIA_INT, LEGAL_INT, BUSINESS_INT - common "love" / "ok" / "no"
  love: (loc: Locale) => loc === 'ar' ? 'شغفك الكبير بهذا المجال هو مؤشر قوي.' : 'Your strong passion for this field is a powerful indicator.', // Generic "love"
  ok:   (loc: Locale) => loc === 'ar' ? 'اهتمامك المعتدل يشير إلى إمكانية التكيف.' : 'Your moderate interest suggests adaptability.', // Generic "ok"

  // Specific "yes" boosters where context is important from question prompt
  EMPATHY_yes:    (loc: Locale) => loc === 'ar' ? 'قدرتك على استشعار مشاعر الآخرين بسهولة هي ميزة قيمة.' : 'Your ability to easily sense others\' feelings is a valuable trait.',
  RISK_yes:       (loc: Locale) => loc === 'ar' ? 'راحتك مع المخاطر الجسدية تفتح لك أبواب مجالات عملية معينة.' : 'Your comfort with physical risk opens doors to certain practical fields.',
  SALARY_yes:     (loc: Locale) => loc === 'ar' ? 'إعطاؤك الأولوية للراتب المرتفع يوجه اختياراتك المهنية.' : 'Prioritizing a high salary directs your career choices.',
  TRAVEL_yes:     (loc: Locale) => loc === 'ar' ? 'استمتاعك بالسفر للعمل يعكس طبيعة مغامرة وحب للاستكشاف.' : 'Your enjoyment of traveling for work reflects an adventurous and exploratory nature.',
  LAB_WORK_yes:   (loc: Locale) => loc === 'ar' ? 'تفضيلك للعمل في المختبر يشير إلى اهتمامك بالبحث العلمي والتجارب.' : 'Your preference for lab work indicates an interest in scientific research and experiments.',
  OUTDOOR_yes:    (loc: Locale) => loc === 'ar' ? 'تفضيلك للعمل الخارجي والميداني يظهر حبك للبيئات العملية المتنوعة.' : 'Your preference for outdoor/site work shows your love for varied work environments.',
  SPORTS_INT_yes: (loc: Locale) => loc === 'ar' ? 'اهتمامك بالنشاط البدني وعلوم الرياضة يوجهك نحو مجالات صحية وحركية.' : 'Your interest in physical activity and sports science directs you to health and kinesiology fields.',
  ENVIRON_yes:    (loc: Locale) => loc === 'ar' ? 'تهتم بالاستدامة البيئية، ما يشير إلى شغف بالمشاريع الخضراء.' : 'You care about environmental sustainability, hinting at passion for green projects.', // PRD Example

  // Grade bands
  gradeBand0: (loc: Locale) => loc === 'ar' ? 'معدلك الحالي قد يتطلب النظر في مجموعة واسعة من الخيارات الأكاديمية.' : 'Your current average may require considering a broad range of academic options.',
  gradeBand1: (loc: Locale) => loc === 'ar' ? 'معدلك الجيد يفتح لك العديد من المسارات الأكاديمية الواعدة.' : 'Your good average opens up many promising academic paths for you.',
  gradeBand2: (loc: Locale) => loc === 'ar' ? 'معدلك المرتفع يؤهلك للمنافسة على التخصصات الأكثر طلبًا وتميزًا.' : 'Your high average qualifies you to compete for the most sought-after and distinguished majors.',

  // Fallback for unmapped boosters (though ideally all boosters from useMajorScorer should be mapped)
  default_booster: (loc: Locale) => loc === 'ar' ? 'اختياراتك المتنوعة تساهم في تشكيل توصياتك.' : 'Your varied choices contribute to shaping your recommendations.',
};


/**
 * Builds an array of explanation phrases based on the provided boosters.
 * @param boosters - An array of string identifiers (e.g., option IDs from answers).
 * @param locale - The desired language ('en' or 'ar').
 * @returns An array of up to 4 unique explanation strings.
 */
export const buildExplanation = (boosters: string[], locale: Locale): string[] => {
  const explanations: Set<string> = new Set();
  const MAX_EXPLANATIONS = 4;

  // Prioritize specific boosters if available, then more generic ones
  // This order can be adjusted based on desired explanation hierarchy
  const priorityOrder = [
    // Grade bands are usually very informative
    "gradeBand2", "gradeBand1", "gradeBand0",
    // Specific positive affirmations
    "ENVIRON_yes", "EMPATHY_yes", "RISK_yes", "SALARY_yes", "TRAVEL_yes", "LAB_WORK_yes", "OUTDOOR_yes", "SPORTS_INT_yes",
    "research_yes", "stability_yes",
    // Project types
    "robot", "financeSim", "artExpo", "documentary", "bioFair", "modelPlane",
    // Problem-solving styles
    "logical", "visual", "empathic", "debate", "venture", // 'debate' from STYLE
    // Team roles
    "coder", "planner", "presenter", "caregiver", "researcher",
    // Ranked subjects
    "math", "physics", "biology", "computer", "literature", "art", "economics", "social",
    // Preferences from single-choice questions
    "agree", // from LEAD
    "love", // generic for HEALTHCARE, MEDIA_INT etc.
    "ok",   // generic
    "research_no", "stability_no", // "no" options that might still be explanatory
    // Generic "yes" if no specific _yes version was hit, less ideal
    // "yes"
  ];

  // Add explanations based on priority order
  for (const boosterKey of priorityOrder) {
    if (boosters.includes(boosterKey)) {
      if (phraseMap[boosterKey]) {
        explanations.add(phraseMap[boosterKey](locale));
        if (explanations.size >= MAX_EXPLANATIONS) break;
      }
    }
  }

  // If not enough explanations, try any other boosters that might have a direct map
  if (explanations.size < MAX_EXPLANATIONS) {
    for (const booster of boosters) {
      if (phraseMap[booster]) {
        explanations.add(phraseMap[booster](locale));
        if (explanations.size >= MAX_EXPLANATIONS) break;
      }
    }
  }

  // If still no explanations and there were boosters, add a default one
  if (explanations.size === 0 && boosters.length > 0 && phraseMap.default_booster) {
    explanations.add(phraseMap.default_booster(locale));
  }

  return Array.from(explanations);
};

// Fallback for direct use if a key needs translation outside buildExplanation
export const translatePhrase = (key: string, locale: Locale): string | null => {
  if (phraseMap[key]) {
    return phraseMap[key](locale);
  }
  console.warn(`Phrase not found for key: ${key} and locale: ${locale}`);
  return null;
};
