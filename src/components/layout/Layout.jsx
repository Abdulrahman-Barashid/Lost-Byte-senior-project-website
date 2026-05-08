import { Outlet, Link, useLocation } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";

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
  Sun,
  Moon,
} from "lucide-react";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "../../styles/Layout.css";

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { language, toggleLanguage, t } = useLanguage();

  const { theme, setTheme } = useTheme();

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
      {/* TOP HEADER */}
      <header className="layout-header">
        <div className="layout-header-inner">
          {/* Logo */}
          <div className="layout-header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="layout-menu-btn"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="layout-logo">
              <Ghost className="h-6 w-6 layout-logo-icon" />
              <span className="layout-logo-text">Lost Byte</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="layout-desktop-nav">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`layout-nav-link${
                  isActive(path) ? " active" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Language + Theme */}
          <div className="layout-header-right">
            <button
              onClick={toggleLanguage}
              className="layout-lang-btn"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span className="layout-lang-label">
                {language === "en" ? "EN" : "AR"}
              </span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="layout-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`layout-sidebar ${sidebarOpen ? "open" : "closed"}`}
      >
        <nav className="layout-sidebar-nav">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`layout-sidebar-link${
                isActive(path) ? " active" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="layout-sidebar-footer">
          {/* Theme Button */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="layout-sidebar-theme-row"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}

            <span>{t("layout.theme")}</span>
          </button>

          {/* Language Button */}
          <button
            onClick={toggleLanguage}
            className="layout-sidebar-lang-btn"
          >
            <Languages className="h-5 w-5" />
            <span>{language === "en" ? "English" : "العربية"}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="layout-main">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="layout-footer-inner">
          <p>&copy; 2026 {t("layout.footer")}</p>
        </div>
      </footer>
    </div>
  );
}