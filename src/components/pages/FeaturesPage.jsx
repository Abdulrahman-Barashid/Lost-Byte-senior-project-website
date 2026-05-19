import { motion } from "motion/react";
import { Zap, Users, Lightbulb, Target, Clock, Shield } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/FeaturesPage.css";

function BrainIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
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
  { key: "features.cat_programming", count: "1" },
  { key: "features.cat_Others", count: "2" },
];

export function FeaturesPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: BrainIcon,
      title: t("features.educational_puzzles"),
      description: t("features.educational_puzzles_desc"),
    },
    {
      icon: Zap,
      title: t("features.intense_atmosphere"),
      description: t("features.intense_atmosphere_desc"),
    },
    {
      icon: Users,
      title: t("features.global_leaderboard"),
      description: t("features.global_leaderboard_desc"),
    },
    {
      icon: Lightbulb,
      title: t("features.difficulty_levels"),
      description: t("features.difficulty_levels_desc"),
    },
    {
      icon: Target,
      title: t("features.achievement_system"),
      description: t("features.achievement_system_desc"),
    },
    {
      icon: Clock,
      title: t("features.time_attack"),
      description: t("features.time_attack_desc"),
    },
    {
      icon: Shield,
      title: t("features.safe_learning"),
      description: t("features.safe_learning_desc"),
    },
    {
      icon: Users,
      title: t("features.story_driven"),
      description: t("features.story_driven_desc"),
    },
  ];

  return (
    <div className="features-page">
      <div className="features-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="features-title">{t("features.title")}</h1>
          <p className="features-subtitle">{t("features.subtitle")}</p>

          {/* Feature cards */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="features-card"
              >
                <div className="features-card-icon-box">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="features-card-title">{feature.title}</h3>
                  <p className="features-card-desc">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Puzzle categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="features-categories-card"
          >
            <h2 className="features-categories-title">
              {t("features.puzzle_categories")}
            </h2>
            <div className="features-categories-grid">
              {PUZZLE_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="features-category-item"
                >
                  <p className="features-category-name">{t(category.key)}</p>
                  <p className="features-category-count">
                    {t("features.puzzle_count")} {category.count}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
