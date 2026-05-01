import { motion } from "motion/react";
import { Zap, Users, Lightbulb, Target, Clock, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function BrainIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

const PUZZLE_CATEGORIES = [
  { key: "features.cat_programming",   count: "30+" },
  { key: "features.cat_networking",    count: "25+" },
  { key: "features.cat_databases",     count: "20+" },
  { key: "features.cat_cybersecurity", count: "35+" },
  { key: "features.cat_algorithms",    count: "28+" },
  { key: "features.cat_system_design", count: "22+" },
  { key: "features.cat_cloud",         count: "18+" },
];

export function FeaturesPage() {
  const { t } = useLanguage();

  const features = [
    { icon: BrainIcon, title: t("features.educational_puzzles"),  description: t("features.educational_puzzles_desc") },
    { icon: Zap,       title: t("features.intense_atmosphere"),   description: t("features.intense_atmosphere_desc") },
    { icon: Users,     title: t("features.global_leaderboard"),   description: t("features.global_leaderboard_desc") },
    { icon: Lightbulb, title: t("features.difficulty_levels"),    description: t("features.difficulty_levels_desc") },
    { icon: Target,    title: t("features.achievement_system"),   description: t("features.achievement_system_desc") },
    { icon: Clock,     title: t("features.time_attack"),          description: t("features.time_attack_desc") },
    { icon: Shield,    title: t("features.safe_learning"),        description: t("features.safe_learning_desc") },
    { icon: Users,     title: t("features.story_driven"),         description: t("features.story_driven_desc") },
  ];

  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-center mb-6">{t("features.title")}</h1>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-red-500 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">{t("features.puzzle_categories")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PUZZLE_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-muted/50 rounded-lg p-4 text-center hover:bg-muted transition-colors"
                >
                  <p className="font-semibold mb-1">{t(category.key)}</p>
                  <p className="text-sm text-muted-foreground">{category.count} {t("features.puzzles")}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
