import { Outlet, Link, useLocation } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import {
  Ghost,
  Home,
  Info,
  Sparkles,
  Image,
  Download,
  Menu,
  Languages,
  HeadphonesIcon,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { path: "/", label: t("layout.home"), icon: Home },
    { path: "/about", label: t("layout.about"), icon: Info },
    { path: "/features", label: t("layout.features"), icon: Sparkles },
    { path: "/gallery", label: t("layout.gallery"), icon: Image },
    { path: "/download", label: t("layout.download"), icon: Download },
    { path: "/support", label: t("layout.support"), icon: HeadphonesIcon },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── TOP HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Ghost className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl hidden sm:block">
                Lost Byte
              </span>
            </Link>
          </div>

          {/* Center: desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(path)
                    ? "bg-red-500 text-white shadow-md"
                    : "hover:bg-accent/60 hover:text-red-500 text-foreground/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: language + theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline text-muted-foreground">
                {language === "en" ? "EN" : "AR"}
              </span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── SIDEBAR OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR DRAWER ── */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 bg-card border-r border-border shadow-xl transition-transform duration-300 flex flex-col w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive(path)
                  ? "bg-red-500 text-white shadow-md"
                  : "hover:bg-accent/50 hover:text-red-500 text-foreground/80"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <ThemeToggle />
            <span className="text-sm font-medium">
              {t("layout.theme")}
            </span>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors w-full"
          >
            <Languages className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">
              {language === "en" ? "English" : "العربية"}
            </span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2026 {t("layout.footer")}</p>
        </div>
      </footer>
    </div>
  );
}
