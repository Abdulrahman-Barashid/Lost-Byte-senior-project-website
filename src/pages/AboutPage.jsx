import { motion } from "motion/react";
import { BookOpen, Brain, Ghost, Trophy } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function AboutPage() {
  const { t } = useLanguage();

  const educationItems = [
    { icon: Brain,    title: t("about.real_world_skills"), desc: t("about.real_world_desc") },
    { icon: BookOpen, title: t("about.problem_solving"),   desc: t("about.problem_solving_desc") },
    { icon: Trophy,   title: t("about.competitive_learning"), desc: t("about.competitive_learning_desc") },
  ];

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-center mb-6">{t("about.title")}</h1>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">{t("about.story_title")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("about.story_p1")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("about.story_p2")}</p>
            </motion.div>

            {/* Educational Value */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-6">{t("about.education_title")}</h2>
              <div className="space-y-4">
                {educationItems.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
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
            className="bg-gradient-to-r from-red-950/20 to-red-900/20 border border-red-500/30 rounded-lg p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Ghost className="h-10 w-10 text-red-500" />
              <h2 className="text-3xl font-bold">{t("about.why_title")}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{t("about.why_desc")}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
