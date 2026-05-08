import { motion } from "motion/react";
import { Trophy, Medal, Award } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/LeaderboardSection.css";

const LEADERBOARD_DATA = [
  { rank: 1,  username: "ByteMaster",   score: 15420, puzzlesSolved: 24, completionTime: "45:23" },
  { rank: 2,  username: "CodeBreaker",  score: 14890, puzzlesSolved: 23, completionTime: "48:15" },
  { rank: 3,  username: "DigitalGhost", score: 14230, puzzlesSolved: 22, completionTime: "51:42" },
  { rank: 4,  username: "HackerPro",    score: 13750, puzzlesSolved: 21, completionTime: "54:18" },
  { rank: 5,  username: "ITWizard",     score: 13200, puzzlesSolved: 20, completionTime: "56:34" },
  { rank: 6,  username: "PixelHunter", score: 12890, puzzlesSolved: 20, completionTime: "58:22" },
  { rank: 7,  username: "CipherKing",  score: 12450, puzzlesSolved: 19, completionTime: "61:15" },
  { rank: 8,  username: "DataSeeker",  score: 11920, puzzlesSolved: 18, completionTime: "63:47" },
  { rank: 9,  username: "LogicLord",   score: 11350, puzzlesSolved: 17, completionTime: "66:12" },
  { rank: 10, username: "ErrorFree",   score: 10890, puzzlesSolved: 16, completionTime: "68:55" },
];

function RankIcon({ rank }) {
  if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal  className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Award  className="h-6 w-6 text-amber-700" />;
  return <span className="text-muted-foreground font-medium">#{rank}</span>;
}

export function LeaderboardSection() {
  const { t } = useLanguage();

  return (
    <section id="leaderboard" className="leaderboard-section">
      <div className="leaderboard-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="leaderboard-title">
            <Trophy className="h-10 w-10 leaderboard-title-icon" />
            {t("leaderboard.title")}
          </h2>
          <p className="leaderboard-subtitle">{t("leaderboard.subtitle")}</p>

          <div className="leaderboard-card">
            <div className="leaderboard-scroll">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>{t("leaderboard.rank")}</th>
                    <th>{t("leaderboard.player")}</th>
                    <th className="col-right">{t("leaderboard.score")}</th>
                    <th className="col-right col-hide-sm">{t("leaderboard.puzzles")}</th>
                    <th className="col-right col-hide-md">{t("leaderboard.time")}</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADERBOARD_DATA.map((entry, index) => (
                    <motion.tr
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <td><RankIcon rank={entry.rank} /></td>
                      <td className="col-name">{entry.username}</td>
                      <td className="col-right col-score">{entry.score.toLocaleString()}</td>
                      <td className="col-right col-hide-sm">{entry.puzzlesSolved}</td>
                      <td className="col-right col-hide-md col-time">{entry.completionTime}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
