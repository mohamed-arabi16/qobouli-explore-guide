// TODO: Consider moving title, preview, fullText into locale JSON files if they need to be managed by translators.
// For now, they are kept here as per the original structure.

export interface AnnouncementItem {
  id: string;
  title: { en: string; ar: string };
  preview: { en: string; ar: string };
  fullText: { en: string; ar: string };
}

export const announcementsData: AnnouncementItem[] = [
  {
    id: '1',
    title: {
      en: 'Announcement 1: New programs at Istanbul Aydin University – Academic Year 2025–2026',
      ar: 'إعلان 1: برامج جديدة في جامعة إسطنبول أيدن – العام الدراسي 2025–2026',
    },
    preview: {
      en: 'Applications are now open for new programs starting September 2025.',
      ar: 'يسرنا إعلامكم بفتح باب التقديم لعدد من البرامج الجديدة في جامعة إسطنبول أيدن، والتي ستبدأ في سبتمبر 2025.',
    },
    fullText: {
      en: 'We are pleased to announce the opening of applications for several new programs at Istanbul Aydin University, commencing in September 2025.\n\nDiploma programs (Turkish – $3,000 per year): UAV Technology and Operation, Computer-Aided Design and Animation, Flight Operations Management, Air Logistics.\n\nBachelor\'s programs (Turkish – $5,000 per year): Political Science and International Relations.\n\nBachelor\'s programs (English): Pharmacy – $15,000, Psychology – $6,000, Molecular Biology and Genetics – $6,000, Digital Game Design – $6,000, Radio, Television and Cinema – $6,000, Accounting and Financial Management – $6,000, Artificial Intelligence and Data Engineering – $6,500, Aviation Electronics and Electrical – $6,500.\n\nPilotage (English): Tuition $8,000, Flight course fee €18,750.\n\nApplications are currently open with an early booking discount until 20 June 2025 (discount does not apply to Medicine, Dentistry or Pharmacy).',
      ar: 'يسرنا إعلامكم بفتح باب التقديم لعدد من البرامج الجديدة في جامعة إسطنبول أيدن، والتي ستبدأ في سبتمبر 2025.\n\nبرامج الدبلوم (اللغة التركية – 3000 دولار سنويًا): • تكنولوجيا وتشغيل الطائرات المسيّرة (UAV) • التصميم والرسم المتحرك باستخدام الحاسوب • إدارة عمليات الطيران • الخدمات اللوجستية الجوية\n\nبرامج البكالوريوس (اللغة التركية – 5000 دولار سنويًا): • العلوم السياسية والعلاقات الدولية\n\nبرامج البكالوريوس (اللغة الإنجليزية): • الصيدلة – 15000 دولار • علم النفس – 6000 دولار • البيولوجيا الجزيئية وعلم الوراثة – 6000 دولار • تصميم الألعاب الرقمية – 6000 دولار • الراديو والتلفزيون والسينما – 6000 دولار • إدارة المحاسبة والتمويل – 6000 دولار • هندسة الذكاء الاصطناعي والبيانات – 6500 دولار • الإلكترونيات والكهرباء في الطيران – 6500 دولار\n\nالطيران (Pilotage) – اللغة الإنجليزية: • الرسوم الدراسية: 8000 دولار • رسوم دورة الطيران: 18750 يورو\n\nيُرجى ملاحظة أن باب التقديم مفتوح حاليًا، مع إمكانية الاستفادة من خصم الحجز المبكر حتى تاريخ 20 يونيو 2025 (الخصم لا يشمل تخصصات الطب وطب الأسنان والصيدلة).',
    },
  },
  {
    id: '2',
    title: {
      en: 'Announcement 2: Important notice from Kent University – Tuition fees for diploma programs',
      ar: 'إعلان 2: تنويه هام من جامعة كينت – الرسوم الدراسية لبرامج الدبلوم',
    },
    preview: {
      en: 'Kent University announces the new fees for diploma programs.',
      ar: 'أعلنت جامعة كينت عن الرسوم الدراسية الجديدة الخاصة ببرامج المعاهد (الدبلوم).',
    },
    fullText: {
      en: 'Kent University has announced the following tuition fees for its diploma programs for the coming academic year: annual fee $1,300. Students paying for both years at once pay $1,800 only. This amount includes the Turkish preparatory year if chosen by the student.',
      ar: 'أعلنت جامعة كينت (Kent Üniversitesi) عن الرسوم الدراسية الجديدة الخاصة ببرامج المعاهد (الدبلوم) للعام الدراسي القادم، وذلك على النحو التالي: • الرسوم السنوية: 1300 دولار • في حال الدفع الكامل لسنتين دفعة واحدة: 1800 دولار فقط\n\nملاحظة: تشمل رسوم 1800 دولار رسوم سنة اللغة التحضيرية للغة التركية، في حال اختيار الطالب إضافتها إلى البرنامج.',
    },
  },
  {
    id: '3',
    title: {
      en: 'Announcement 3: Final extension for early payment discount at Istanbul Aydin University',
      ar: 'إعلان 3: تمديد نهائي لخصم الدفع المبكر في جامعة إسطنبول أيدن',
    },
    preview: {
      en: 'The 5% early payment discount is extended until 20 June 2025.',
      ar: 'نُحيطكم علمًا بأنه تم تمديد مهلة خصم الدفع المبكر بنسبة 5٪ حتى يوم الجمعة الموافق 20 يونيو 2025.',
    },
    fullText: {
      en: 'We inform you that the 5% early payment discount for diploma and bachelor\'s programs at Istanbul Aydin University has been extended until Friday, 20 June 2025. Prospective students are encouraged to take advantage of this final extension.',
      ar: 'نُحيطكم علمًا بأنه تم تمديد مهلة خصم الدفع المبكر بنسبة 5٪ لبرامج الدبلوم والبكالوريوس في جامعة إسطنبول أيدن، وذلك حتى يوم الجمعة الموافق 20 يونيو 2025. نُشجّع جميع الراغبين بالتسجيل على الاستفادة من هذا التمديد النهائي.',
    },
  },
  {
    id: '4',
    title: {
      en: 'Announcement 4: Update on programs and seat availability at Istanbul Aydin University – 2025',
      ar: 'إعلان 4: تحديث حالة التخصصات والمقاعد في جامعة إسطنبول أيدن – 2025',
    },
    preview: {
      en: 'Important updates on seat availability for the 2025–2026 academic year.',
      ar: 'يُعلن مكتب التسجيل عن تحديثات مهمة تتعلق بتوافر المقاعد في برامج البكالوريوس والدبلوم.',
    },
    fullText: {
      en: 'The registration office announces important updates regarding seat availability in bachelor\'s and diploma programs for the 2025–2026 academic year. Final registration begins on 1 July 2025. Students who have visas or do not require one must complete registration before 11 July 2025. After this date, reservations for students who paid but did not finish registration will be canceled and remaining seats will be allocated on a first-come, first-served basis. Closed majors: Physical Education and Sports Teaching, Sports Management, Coaching Training, Primary Education, History, Economics and Finance, Elementary Mathematics Education, English Language Teaching (English).\n\nExamples of available majors and remaining seats:\nCollege of Education: Arabic Language Teaching for Non-Natives – 20 seats, Preschool Education – 6 seats, Special Education – 3 seats, Guidance and Psychological Counseling – 4 seats, Turkish Language Teaching – 20 seats.\nCollege of Arts and Sciences: English Language and Literature (English) – 38 seats, Psychology – 26 seats, Sociology – 17 seats, Translation and Interpretation (Arabic) – 17 seats, Translation and Interpretation (English) – 12 seats, Translation and Interpretation (Russian) – 14 seats.\nCollege of Fine Arts: Digital Game Design – 21 seats, Culinary Arts – 14 seats, Animation – 22 seats, Acting – 14 seats, Graphic Design – 27 seats, Fashion and Textile Design – 13 seats.\nFaculty of Law: Law – 145 seats.\nFaculty of Engineering: Computer Engineering (English) – 61 seats, Electrical and Electronics Engineering (English) – 70 seats, Industrial Engineering (English) – 70 seats, Civil Engineering (Turkish) – 44 seats, Civil Engineering (English) – 39 seats, Mechanical Engineering (Turkish) – 36 seats, Mechanical Engineering (English) – 42 seats, Aerospace Engineering (English) – 45 seats, Software Engineering (English) – 51 seats.\nAnatolian Vocational School: Computer Programming (Turkish) – 30 seats, Computer Programming (English) – 99 seats, Logistics – 30 seats, Graphic Design – 30 seats, Civil Aviation Services (Turkish) – 30 seats, Civil Aviation Services (English) – 60 seats, Internet and Network Technologies (English) – 30 seats, Fashion Design – 42 seats, Public Relations and Presentation – 30 seats, Food Technology, Marketing, Insurance, Translation, Human Resources, Occupational Safety, Hair Care and Beauty and others (28–75 seats depending on the major).\nSchool of Health Services: Oral and Dental Health – 28 seats, Anesthesia, Emergency, Medical Imaging, Medical Laboratories, Pharmaceutical Services, Prosthetics, Audiometry and others (28–41 seats each).\n\nFor more details about any major, please contact the Qobouli team.',
      ar: 'يُعلن مكتب التسجيل عن تحديثات مهمة تتعلق بتوافر المقاعد في برامج البكالوريوس والدبلوم في جامعة إسطنبول أيدن للعام الدراسي 2025–2026. • يبدأ التسجيل النهائي بتاريخ: 1 يوليو 2025 • يجب على الطلاب الحاصلين على الفيزا أو غير الملزمين بالتأشيرة، إتمام التسجيل قبل 11 يوليو 2025 • بعد هذا التاريخ، سيتم إلغاء الحجز للطلاب الذين دفعوا ولم يكملوا إجراءات التسجيل، وسيتم توزيع المقاعد المتبقية حسب أولوية الحضور والتسجيل الفعلي (First Come, First Served)\n\nالتخصصات المغلقة (لا توجد مقاعد متاحة حاليًا): • تعليم التربية البدنية والرياضة • إدارة الرياضة • تدريب المدربين • التعليم الابتدائي • التاريخ • الاقتصاد والتمويل • تعليم الرياضيات في المرحلة الابتدائية • تعليم اللغة الإنجليزية (باللغة الإنجليزية)\n\nأمثلة على التخصصات المتاحة وعدد المقاعد المتبقية:\n\nكلية التربية: • تعليم اللغة العربية للناطقين بغيرها: 20 مقعدًا • التعليم ما قبل المدرسة: 6 مقاعد • التعليم الخاص: 3 مقاعد • الإرشاد والتوجيه النفسي: 4 مقاعد • تعليم اللغة التركية: 20 مقعدًا\n\nكلية العلوم والآداب: • اللغة الإنجليزية وآدابها (بالإنجليزية): 38 مقعدًا • علم النفس: 26 مقعدًا • علم الاجتماع: 17 مقعدًا • الترجمة التحريرية والشفوية (العربية): 17 مقعدًا • الترجمة التحريرية والشفوية (الإنجليزية): 12 مقعدًا • الترجمة التحريرية والشفوية (الروسية): 14 مقعدًا\n\nكلية الفنون الجميلة: • تصميم الألعاب الرقمية: 21 مقعدًا • فنون الطهي والطبخ: 14 مقعدًا • الرسوم المتحركة: 22 مقعدًا • التمثيل المسرحي: 14 مقعدًا • التصميم الغرافيكي: 27 مقعدًا • تصميم الأزياء والنسيج: 13 مقعدًا\n\nكلية الحقوق: • القانون: 145 مقعدًا\n\nكلية الهندسة: • هندسة الحاسوب (إنجليزي): 61 مقعدًا • هندسة الكهرباء والإلكترون (إنجليزي): 70 مقعدًا • الهندسة الصناعية (إنجليزي): 70 مقعدًا • الهندسة المدنية (تركي): 44 مقعدًا • الهندسة المدنية (إنجليزي): 39 مقعدًا • هندسة الميكانيك (تركي): 36 مقعدًا • هندسة الميكانيك (إنجليزي): 42 مقعدًا • هندسة الطيران والفضاء (إنجليزي): 45 مقعدًا • هندسة البرمجيات (إنجليزي): 51 مقعدًا\n\nمدرسة الأناضول المهنية: • برمجة الحاسوب (تركي): 30 مقعدًا • برمجة الحاسوب (إنجليزي): 99 مقعدًا • اللوجستيات: 30 مقعدًا • التصميم الغرافيكي: 30 مقعدًا • الخدمات الجوية المدنية (تركي): 30 مقعدًا • الخدمات الجوية المدنية (إنجليزي): 60 مقعدًا • تقنيات الإنترنت والشبكات (إنجليزي): 30 مقعدًا • تصميم الأزياء: 42 مقعدًا • العلاقات العامة والعروض التقديمية: 30 مقعدًا • تكنولوجيا الغذاء، التسويق، التأمين، الترجمة، الموارد البشرية، السلامة المهنية، رعاية الشعر والتجميل وغيرها (جميعها بين 28–75 مقعدًا متبقيًا حسب التخصص)\n\nمدرسة الخدمات الصحية: • الصحة الفموية وطب الأسنان: 28 مقعدًا • التخدير، الطوارئ، التصوير الطبي، المختبرات الطبية، الخدمات الصيدلانية، الأطراف الاصطناعية، السمع، وغيرها (كل تخصص ما بين 28 إلى 41 مقعدًا متبقيًا)\n\nلمزيد من التفاصيل الدقيقة حول أي تخصص، يُرجى التواصل مع فريق قبولي.',
    },
  },
  {
    id: '5',
    title: {
      en: 'Announcement 5: Scholarship update at Ibn Haldun University',
      ar: 'إعلان 5: تحديث بخصوص المنحة في جامعة ابن خلدون',
    },
    preview: {
      en: 'New admissions available with a 60% tuition scholarship.',
      ar: 'تُعلن جامعة ابن خلدون عن توفر قبولات جديدة بمنحة دراسية تغطي 60٪ من الرسوم الدراسية.',
    },
    fullText: {
      en: 'Ibn Haldun University announces new admissions with a scholarship covering 60% of tuition fees. Interested students should apply quickly to secure their seats within this limited opportunity.',
      ar: 'تُعلن جامعة ابن خلدون عن توفر قبولات جديدة بمنحة دراسية تغطي 60٪ من الرسوم الدراسية. ننصح الطلاب الراغبين بالتقديم بالمسارعة لحجز مقاعدهم ضمن هذه الفرصة المحدودة.',
    },
  },
  {
    id: '6',
    title: {
      en: 'Announcement 6: Important note regarding application to Uskudar University',
      ar: 'إعلان 6: تنويه هام بشأن التقديم إلى جامعة أوسكودار',
    },
    preview: {
      en: 'Uskudar University has updated its admission requirements.',
      ar: 'أعلنت جامعة أوسكودار عن تعديل في شروط قبول الطلاب الجدد.',
    },
    fullText: {
      en: 'Uskudar University has amended the admission criteria as follows: Applications will not be accepted from students who obtained the Turkish high school diploma three years ago or more, as well as current-year graduates. Applications from all Open Education system students (Açık Öğretim) are not accepted. Please take these standards into account. A detailed announcement of the official requirements will be published later.',
      ar: 'أعلنت جامعة أوسكودار عن تعديل في شروط قبول الطلاب الجدد، على النحو التالي: • لن تُقبل طلبات الطلاب الحاصلين على الشهادة الثانوية التركية منذ ثلاث سنوات أو أكثر، بالإضافة إلى خريجي العام الحالي. • لن تُقبل طلبات جميع طلاب نظام التعليم المفتوح (Açık Öğretim)، دون استثناء.\n\nنُرجى من جميع المهتمين بالتقديم إلى الجامعة أخذ هذه المعايير بعين الاعتبار. سيتم لاحقًا نشر إعلان تفصيلي يتضمن كافة الشروط الرسمية المعتمدة.',
    },
  },
  {
    id: '7',
    title: {
      en: 'Announcement 7: Gelisim University – processing time for acceptance letters',
      ar: 'إعلان 7: جامعة غليشيم – مدة إصدار القبولات',
    },
    preview: {
      en: 'Initial offer letters in 1–3 days; final letters in 3–5 days.',
      ar: 'تُحيط جامعة غليشيم الطلاب علمًا بمدة إصدار خطابات القبول.',
    },
    fullText: {
      en: 'Gelisim University informs students that the initial offer letter is issued within 1 to 3 business days and the final acceptance letter within 3 to 5 business days. Please consider this timeframe when organizing your application and registration procedures.',
      ar: 'تُحيط جامعة غليشيم الطلاب علمًا بما يلي: • مدة إصدار خطاب القبول الأولي (Offer Letter): من 1 إلى 3 أيام عمل • مدة إصدار خطاب القبول النهائي (Final Acceptance Letter): من 3 إلى 5 أيام عمل\n\nنُوصي بأخذ هذه المدة الزمنية في الاعتبار عند تنظيم إجراءات التقديم والتسجيل.',
    },
  },
  {
    id: '8',
    title: {
      en: 'Announcement 8: Topkapi University – refund policy and preparatory year cost',
      ar: 'إعلان 8: جامعة توب كابي – سياسة استرداد الرسوم وتكلفة السنة التحضيرية',
    },
    preview: {
      en: 'Refund available minus $200 if visa is refused; English prep year costs the same as the academic year.',
      ar: 'أولًا – سياسة استرداد الرسوم في حال رفض الفيزا، وثانيًا – تكلفة السنة التحضيرية لتخصصات الدبلوم باللغة الإنجليزية.',
    },
    fullText: {
      en: 'First – Refund policy in case of visa refusal: If the student\'s visa is rejected by the consulate, the paid amount is refundable minus $200 as administrative fees.\n\nSecond – For diploma majors taught in English, the cost of the English preparatory year is equal to the tuition fee of the academic year itself.',
      ar: 'أولًا – سياسة استرداد الرسوم في حال رفض الفيزا: في حال رفض تأشيرة الطالب من قبل القنصلية، يحق له استرداد المبلغ المدفوع بعد خصم 200 دولار أمريكي كرسوم إدارية.\n\nثانيًا – السنة التحضيرية لتخصصات الدبلوم (اللغة الإنجليزية): تكلفة السنة التحضيرية للغة الإنجليزية تعادل تمامًا رسوم سنة التخصص الأكاديمية نفسها.',
    },
  },
  {
    id: '9',
    title: {
      en: 'Announcement 9: Nisantasi University – new programs opened',
      ar: 'إعلان 9: جامعة نيشان تاشي – فتح برامج جديدة',
    },
    preview: {
      en: 'Applications open for Mechanical Engineering (English) and Medical Device Technologies (Turkish).',
      ar: 'تُعلن جامعة نيشان تاشي عن فتح باب التقديم لبرنامجين جديدين.',
    },
    fullText: {
      en: 'Nisantasi University has opened applications for two new programs: Mechanical Engineering (Bachelor\'s, English) and Medical Device Technologies (two-year diploma, Turkish). Registration is available starting from the 2025–2026 academic year. Interested students are encouraged to apply early to secure a seat.',
      ar: 'تُعلن جامعة نيشان تاشي عن فتح باب التقديم لبرنامجين جديدين: • هندسة الميكانيك – بكالوريوس (اللغة الإنجليزية) • تقنيات الأجهزة الطبية – دبلوم سنتين (اللغة التركية)\n\nيُتاح التسجيل في هذه البرامج بدءًا من العام الأكاديمي 2025–2026. ننصح الطلاب المهتمين بالتقديم المبكر لضمان توفر المقاعد.',
    },
  },
  {
    id: '10',
    title: {
      en: 'Announcement 10: Haliç University – discount policy for academic year 2025–2026',
      ar: 'إعلان 10: نظام الخصومات في جامعة الخليج – العام الدراسي 2025–2026',
    },
    preview: {
      en: 'Haliç University publishes updates on discounts for international students.',
      ar: 'أعلنت جامعة الخليج عن التحديثات على نظام الخصومات المعتمد للطلاب الدوليين.',
    },
    fullText: {
      en: 'Haliç University announces the following updates to the discount system for international students: Sibling discount – 10% for students who have a brother or sister enrolled at the university. Full early payment discount – 15% for students who complete full payment before 1 August 2025 and 5% for those who complete payment after this date.',
      ar: 'أعلنت جامعة الخليج (Haliç University) عن التحديثات التالية على نظام الخصومات المعتمد للطلاب الدوليين: • خصم الإخوة: 10٪ للطلاب الذين لديهم أخ أو أخت مسجل في الجامعة • خصم الدفع الكامل المبكر: • 15٪ للطلاب الذين يُنهون الدفع الكامل قبل 1 أغسطس 2025 • 5٪ للطلاب الذين يُنهون الدفع الكامل بعد هذا التاريخ',
    },
  },
];
