import { motion } from "motion/react";
import { Download, Gamepad2, Ghost } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/HomeSection.css";

export function HomeSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="home-section">
      <div className="home-bg-gradient" />

      <div className="home-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title row */}
          <motion.div
            animate={{
              textShadow: [
                "0 0 10px rgba(239,68,68,0.5)",
                "0 0 20px rgba(239,68,68,0.8)",
                "0 0 10px rgba(239,68,68,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="home-title-row"
          >
            <Ghost className="home-ghost-icon" />
            <h1 className="home-title">{t("hero.title")}</h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="home-tagline"
          >
            {t("hero.tagline")}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="home-description"
          >
            {t("hero.description")}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="home-buttons"
          >
            <a href="/download">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="home-btn-primary"
              >
                <Download className="h-5 w-5" />
                {t("hero.get_steam_key")}
              </motion.button>
            </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="home-btn-secondary"
              >
                <Gamepad2 className="h-5 w-5" />
                {t("hero.view_leaderboard")}
              </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
