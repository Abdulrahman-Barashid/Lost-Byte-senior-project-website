import { motion } from "motion/react";
import { Download, Gamepad2, Ghost } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{
              textShadow: [
                "0 0 10px rgba(239,68,68,0.5)",
                "0 0 20px rgba(239,68,68,0.8)",
                "0 0 10px rgba(239,68,68,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <Ghost className="h-16 w-16 md:h-24 md:w-24 text-red-500" />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-red-500">
              {t("hero.title")}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl mb-6 text-muted-foreground"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg mb-12 max-w-2xl mx-auto text-foreground/70"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/download">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-500/30"
              >
                <Download className="h-5 w-5" />
                {t("hero.get_steam_key")}
              </motion.button>
            </a>
            <a href="#leaderboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-accent text-secondary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Gamepad2 className="h-5 w-5" />
                {t("hero.view_leaderboard")}
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
