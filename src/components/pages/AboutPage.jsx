import { motion } from "motion/react";
import { BookOpen, Brain, Ghost, Trophy } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/AboutPage.css";

export function AboutPage() {
  const { t } = useLanguage();

  const educationItems = [
    { icon: Brain,    title: t("about.real_world_skills"),    desc: t("about.real_world_desc") },
    { icon: BookOpen, title: t("about.problem_solving"),      desc: t("about.problem_solving_desc") },
    { icon: Trophy,   title: t("about.competitive_learning"), desc: t("about.competitive_learning_desc") },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="about-title">{t("about.title")}</h1>
          <p className="about-subtitle">{t("about.subtitle")}</p>

          <div className="about-grid">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="about-story-title">{t("about.story_title")}</h2>
              <p className="about-story-text">{t("about.story_p1")}</p>
              <p className="about-story-text">{t("about.story_p2")}</p>
            </motion.div>

            {/* Educational Description*/}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-edu-card"
            >
              <h2 className="about-edu-title">{t("about.education_title")}</h2>
              <div className="about-edu-list">
                {educationItems.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="about-edu-item">
                    <Icon className="h-6 w-6 about-edu-item-icon" />
                    <div>
                      <h3 className="about-edu-item-title">{title}</h3>
                      <p className="about-edu-item-desc">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Why Lost Byte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-why-card"
          >
            <div className="about-why-header">
              <Ghost className="h-10 w-10 about-why-icon" />
              <h2 className="about-why-title">{t("about.why_title")}</h2>
            </div>
            <p className="about-why-text">{t("about.why_desc")}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
