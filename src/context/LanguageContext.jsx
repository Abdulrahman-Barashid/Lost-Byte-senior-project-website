import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(undefined);

const translations = {
  en: {
    // Layout
    "layout.home": "Home",
    "layout.about": "About",
    "layout.features": "Features",
    "layout.gallery": "Gallery",
    "layout.download": "Download",
    "layout.support": "Support",
    "layout.theme": "Theme",
    "layout.navigation": "Navigation",
    "layout.footer": "Lost Byte — Abdulrahman Barashid. All rights reserved.",

    // Hero
    "hero.title": "LOST BYTE",
    "hero.tagline": "A Horror Game Where Knowledge is Your Only Weapon",
    "hero.description":
      "Solve IT puzzles to escape the digital nightmare. Test your knowledge, survive the challenge, and compete on the leaderboard.",
    "hero.get_steam_key": "Get Steam Key",
    "hero.view_leaderboard": "View Leaderboard",

    // About
    "about.title": "About Lost Byte",
    "about.subtitle": "A horror-themed game that challenges your IT knowledge while keeping you on edge",
    "about.story_title": "The Story",
    "about.story_p1":
      "You wake up in a corrupted digital realm where data has turned hostile. The only escape is solving IT puzzles that test your knowledge of programming, networking, cybersecurity, and computer science fundamentals.",
    "about.story_p2":
      "Every correct answer brings you closer to freedom. Navigate glitchy environments, decode cryptic messages, and survive the digital threats lurking in every corner.",
    "about.education_title": "Educational Value",
    "about.real_world_skills": "Real-World IT Skills",
    "about.real_world_desc": "Master concepts used in actual IT careers",
    "about.problem_solving": "Problem Solving",
    "about.problem_solving_desc": "Develop critical thinking under pressure",
    "about.competitive_learning": "Competitive Learning",
    "about.competitive_learning_desc": "Compete on leaderboards and improve your skills",
    "about.why_title": 'Why "Lost Byte"?',
    "about.why_desc":
      "In computing, a lost byte can corrupt an entire system. In this game, you search for lost bytes — fragments of knowledge scattered across a corrupted network. Each puzzle represents missing information that, when understood, restores order. Here, knowledge is not just power — it is survival.",

    // Features
    "features.title": "Game Features",
    "features.subtitle": "A blend of horror gameplay and educational IT challenges for a unique experience",
    "features.educational_puzzles": "Educational Puzzles",
    "features.educational_puzzles_desc": "Solve real IT challenges covering programming, networking, databases, and cybersecurity.",
    "features.intense_atmosphere": "Immersive Atmosphere",
    "features.intense_atmosphere_desc": "Tension-driven environments that create urgency as you race against time.",
    "features.global_leaderboard": "Global Leaderboard",
    "features.global_leaderboard_desc": "Compete with players worldwide and track your ranking.",
    "features.difficulty_levels": "Multiple Difficulty Levels",
    "features.difficulty_levels_desc": "Puzzles scale from beginner to expert to match your skill level.",
    "features.achievement_system": "Achievement System",
    "features.achievement_system_desc": "Unlock badges and rewards as you master different IT domains.",
    "features.time_attack": "Time Attack Mode",
    "features.time_attack_desc": "Race against the clock in speed-run challenges for bonus points.",
    "features.safe_learning": "Safe Learning Environment",
    "features.safe_learning_desc": "Build confidence by learning through gameplay with no real-world consequences.",
    "features.story_driven": "Story-Driven Gameplay",
    "features.story_driven_desc": "Uncover the mystery behind the digital corruption through an engaging narrative.",

    // Leaderboard
    "leaderboard.title": "Global Leaderboard",
    "leaderboard.subtitle": "Compete with players worldwide for the top spot",
    "leaderboard.rank": "Rank",
    "leaderboard.player": "Player",
    "leaderboard.score": "Score",
    "leaderboard.puzzles": "Puzzles",
    "leaderboard.time": "Time",

    // Gallery
    "gallery.title": "Game Gallery",
    "gallery.subtitle": "Screenshots and artwork from Lost Byte",
    "gallery.click_to_view": "Click to view",
    "gallery.close": "Close",
    "gallery.system_req": "System Requirements",
    "gallery.minimum": "Minimum",
    "gallery.recommended": "Recommended",
    "gallery.img1_title": "Main Menu",
    "gallery.img1_desc":  "The haunting main menu interface",
    "gallery.img2_title": "Puzzle Room",
    "gallery.img2_desc":  "Solve IT puzzles to progress",
    "gallery.img3_title": "Coding Challenge",
    "gallery.img3_desc":  "Debug corrupted code",
    "gallery.img4_title": "Network Maze",
    "gallery.img4_desc":  "Navigate through network topology",
    "gallery.img5_title": "Leaderboard",
    "gallery.img5_desc":  "Compete globally",
    "gallery.img6_title": "Boss Encounter",
    "gallery.img6_desc":  "Face the ultimate challenge",

    // Features page
    "features.puzzle_categories": "Puzzle Categories",
    "features.cat_programming":     "Programming",
    "features.cat_networking":      "Networking",
    "features.cat_databases":       "Databases",
    "features.cat_cybersecurity":   "Cybersecurity",
    "features.cat_algorithms":      "Algorithms",
    "features.cat_system_design":   "System Design",
    "features.cat_cloud":           "Cloud Computing",

    // Support
    "support.title": "Contact Support",
    "support.description": "Have a question or need help? Send us a message and we will get back to you as soon as possible.",
    "support.name": "Your Name",
    "support.name_placeholder": "Abdulrahman Barashid",
    "support.email": "Your Email",
    "support.email_placeholder": "Example@gmail.com",
    "support.message": "Your Message",
    "support.message_placeholder": "Describe your issue or question...",
    "support.submit": "Send Message",
    "support.submitting": "Sending...",
    "support.success": "Message sent!",
    "support.success_description": "We will get back to you as soon as possible.",
    "support.error_fill_all": "Please fill in all fields",
    "support.contact_email": "Email",
    "support.contact_response": "Response Time",
    "support.contact_response_value": "Within 24 hours",
    "support.contact_hours": "Availability",
    "support.contact_hours_value": "24/7 Support",

    // Download
    "download.title": "Download Lost Byte",
    "download.description": "Get started with Lost Byte and put your IT knowledge to the test.",
    "download.kau_student": "KAU Student?",
    "download.kau_description": "Students with a @stu.kau.edu.sa email get free access.",
    "download.verify_email": "Verify Your Student Email",
    "download.email_placeholder": "your.id@stu.kau.edu.sa",
    "download.verify": "Verify & Download",
    "download.verifying": "Verifying...",
    "download.free_access": "Free Access",
    "download.free_access_desc": "KAU students receive lifetime access at no cost upon verification.",
    "download.or": "OR",
    "download.purchase": "Purchase License",
    "download.price": "$9.99",
    "download.purchase_description": "One-time purchase for lifetime access",
    "download.buy_now": "Buy Now",
    "download.processing": "Processing...",
    "download.secure_payment": "Secure payment powered by Stripe",
    "download.system_req": "System Requirements",
    "download.minimum": "Minimum",
    "download.recommended": "Recommended",
    "download.verification_success": "Email verified!",
    "download.verification_success_description": "Your download will start shortly.",
    "download.verification_failed": "Verification failed",
    "download.verification_failed_description": "Please use a valid @stu.kau.edu.sa email address.",
    "download.payment_success": "Payment successful!",
    "download.payment_success_description": "Your download will start shortly.",
    "download.scan_to_pay": "Or scan to pay",
    "download.scan_qr_desc": "Scan with your camera app to pay via PayPal",
  },

  ar: {
    // Layout
    "layout.home": "الرئيسية",
    "layout.about": "عن اللعبة",
    "layout.features": "المميزات",
    "layout.gallery": "المعرض",
    "layout.download": "تحميل",
    "layout.support": "الدعم",
    "layout.theme": "السمة",
    "layout.navigation": "التنقل",
    "layout.footer": "لوست بايت — عبدالرحمن برشيد. جميع الحقوق محفوظة.",

    // Hero
    "hero.title": "لوست بايت",
    "hero.tagline": "لعبة رعب حيث المعرفة هي سلاحك الوحيد",
    "hero.description":
      "حل ألغاز تقنية المعلومات للهروب من الكابوس الرقمي. اختبر معرفتك وتسلق لوحة المتصدرين.",
    "hero.get_steam_key": "احصل على مفتاح ستيم",
    "hero.view_leaderboard": "عرض لوحة المتصدرين",

    // About
    "about.title": "عن لوست بايت",
    "about.subtitle": "تجربة رعب فريدة تختبر معرفتك بتقنية المعلومات",
    "about.story_title": "القصة",
    "about.story_p1":
      "تستيقظ في عالم رقمي تالف حيث أصبحت البيانات عدائية. الطريقة الوحيدة للهروب هي حل ألغاز تقنية تشمل البرمجة والشبكات والأمن السيبراني.",
    "about.story_p2":
      "كل إجابة صحيحة تقربك من الحرية. تنقل عبر بيئات معطلة وفكّ رسائل غامضة للنجاة.",
    "about.education_title": "القيمة التعليمية",
    "about.real_world_skills": "مهارات تقنية حقيقية",
    "about.real_world_desc": "أتقن المفاهيم المستخدمة في وظائف تقنية المعلومات",
    "about.problem_solving": "حل المشكلات",
    "about.problem_solving_desc": "طور التفكير النقدي تحت الضغط",
    "about.competitive_learning": "التعلم التنافسي",
    "about.competitive_learning_desc": "تنافس في لوحات المتصدرين وحسّن مهاراتك",
    "about.why_title": "لماذا «لوست بايت»؟",
    "about.why_desc":
      "في العالم الرقمي، بايت واحد مفقود قد يفسد نظاماً بأكمله. في لعبتنا، أنت تبحث عن هذه البايتات — أجزاء من المعرفة منتشرة في شبكة تالفة. المعرفة هنا ليست مجرد قوة — إنها البقاء.",

    // Features
    "features.title": "مميزات اللعبة",
    "features.subtitle": "مزيج من ألعاب الرعب والتحديات التعليمية لتقنية المعلومات",
    "features.educational_puzzles": "ألغاز تعليمية",
    "features.educational_puzzles_desc": "حل تحديات تقنية تغطي البرمجة والشبكات وقواعد البيانات والأمن السيبراني.",
    "features.intense_atmosphere": "أجواء غامرة",
    "features.intense_atmosphere_desc": "بيئات مشحونة تخلق التوتر بينما تتسابق مع الزمن.",
    "features.global_leaderboard": "لوحة متصدرين عالمية",
    "features.global_leaderboard_desc": "تنافس مع لاعبين حول العالم وتتبع ترتيبك.",
    "features.difficulty_levels": "مستويات صعوبة متعددة",
    "features.difficulty_levels_desc": "ألغاز تتناسب مع مستواك من المبتدئ إلى الخبير.",
    "features.achievement_system": "نظام إنجازات",
    "features.achievement_system_desc": "افتح الشارات والمكافآت بينما تتقن مجالات التقنية.",
    "features.time_attack": "وضع الهجوم الزمني",
    "features.time_attack_desc": "تسابق مع الوقت للحصول على نقاط إضافية.",
    "features.safe_learning": "بيئة تعلم آمنة",
    "features.safe_learning_desc": "ابنِ ثقتك وتعلم دون عواقب حقيقية.",
    "features.story_driven": "لعب مدفوع بالقصة",
    "features.story_driven_desc": "اكتشف غموض الفساد الرقمي من خلال سرد جذاب.",

    // Leaderboard
    "leaderboard.title": "لوحة المتصدرين العالمية",
    "leaderboard.subtitle": "تنافس مع لاعبين حول العالم للحصول على المركز الأول",
    "leaderboard.rank": "المرتبة",
    "leaderboard.player": "اللاعب",
    "leaderboard.score": "النتيجة",
    "leaderboard.puzzles": "الألغاز",
    "leaderboard.time": "الوقت",

    // Gallery
    "gallery.title": "معرض اللعبة",
    "gallery.subtitle": "لقطات شاشة وأعمال فنية من لوست بايت",
    "gallery.click_to_view": "انقر للعرض",
    "gallery.close": "إغلاق",
    "gallery.system_req": "متطلبات النظام",
    "gallery.minimum": "الحد الأدنى",
    "gallery.recommended": "الموصى به",
    "gallery.img1_title": "القائمة الرئيسية",
    "gallery.img1_desc":  "واجهة القائمة الرئيسية المرعبة",
    "gallery.img2_title": "غرفة الألغاز",
    "gallery.img2_desc":  "حل ألغاز تقنية المعلومات للتقدم",
    "gallery.img3_title": "تحدي البرمجة",
    "gallery.img3_desc":  "اكتشف الأخطاء في الكود التالف",
    "gallery.img4_title": "متاهة الشبكة",
    "gallery.img4_desc":  "تنقل عبر طوبولوجيا الشبكة",
    "gallery.img5_title": "لوحة المتصدرين",
    "gallery.img5_desc":  "تنافس على مستوى عالمي",
    "gallery.img6_title": "مواجهة الزعيم",
    "gallery.img6_desc":  "واجه التحدي الأقصى",

    // Features page
    "features.puzzle_categories": "فئات الألغاز",
  "features.cat_programming":     "البرمجة",
  "features.cat_networking":      "الشبكات",
  "features.cat_databases":       "قواعد البيانات",
  "features.cat_cybersecurity":   "الأمن السيبراني",
  "features.cat_algorithms":      "الخوارزميات",
  "features.cat_system_design":   "تصميم الأنظمة",
  "features.cat_cloud":           "الحوسبة السحابية",

    // Support
    "support.title": "تواصل مع الدعم",
    "support.description": "هل لديك سؤال؟ أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",
    "support.name": "اسمك",
    "support.name_placeholder": "محمد عبدالله",
    "support.email": "بريدك الإلكتروني",
    "support.email_placeholder": "example@gmail.com",
    "support.message": "رسالتك",
    "support.message_placeholder": "اكتب مشكلتك أو سؤالك...",
    "support.submit": "إرسال الرسالة",
    "support.submitting": "جارٍ الإرسال...",
    "support.success": "تم إرسال الرسالة!",
    "support.success_description": "سنرد عليك في أقرب وقت ممكن.",
    "support.error_fill_all": "يرجى ملء جميع الحقول",
    "support.contact_email": "البريد الإلكتروني",
    "support.contact_response": "وقت الاستجابة",
    "support.contact_response_value": "خلال 24 ساعة",
    "support.contact_hours": "مواعيد الدعم",
    "support.contact_hours_value": "متاح 24/7",

    // Download
    "download.title": "تحميل لوست بايت",
    "download.description": "ابدأ رحلتك مع لوست بايت واختبر معرفتك بتقنية المعلومات.",
    "download.kau_student": "طالب في جامعة الملك عبدالعزيز؟",
    "download.kau_description": "الطلاب بعنوان @stu.kau.edu.sa يحصلون على وصول مجاني.",
    "download.verify_email": "تحقق من بريدك الجامعي",
    "download.email_placeholder": "your.id@stu.kau.edu.sa",
    "download.verify": "تحقق وحمّل",
    "download.verifying": "جارٍ التحقق...",
    "download.free_access": "وصول مجاني",
    "download.free_access_desc": "يحصل طلاب جامعة الملك عبدالعزيز على وصول مدى الحياة مجاناً عند التحقق.",
    "download.or": "أو",
    "download.purchase": "شراء الترخيص",
    "download.price": "$9.99",
    "download.purchase_description": "دفعة واحدة للوصول مدى الحياة",
    "download.buy_now": "اشترِ الآن",
    "download.processing": "جارٍ المعالجة...",
    "download.secure_payment": "دفع آمن عبر Stripe",
    "download.system_req": "متطلبات النظام",
    "download.minimum": "الحد الأدنى",
    "download.recommended": "الموصى به",
    "download.verification_success": "تم التحقق!",
    "download.verification_success_description": "سيبدأ التحميل قريباً.",
    "download.verification_failed": "فشل التحقق",
    "download.verification_failed_description": "يرجى استخدام بريد @stu.kau.edu.sa صالح.",
    "download.payment_success": "تمت عملية الدفع!",
    "download.payment_success_description": "سيبدأ التحميل قريباً.",
    "download.scan_to_pay": "أو امسح للدفع",
    "download.scan_qr_desc": "امسح الرمز بكاميرا هاتفك للدفع عبر PayPal",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "ar" : "en"));

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
