"use client";
import { useState, useEffect } from "react";
import { useLang, Lang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";
import DevnexLogo from "./DevnexLogo";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: "#xizmatlar" },
    { label: t.nav.projects, href: "#loyihalar" },
    { label: t.nav.contact, href: "#aloqa" },
  ];

  const navBg = scrolled
    ? isDark
      ? "rgba(13,17,23,0.92)"
      : "rgba(245,246,250,0.92)"
    : "transparent";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "var(--nav-h)",
        display: "flex", alignItems: "center",
        background: navBg,
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid var(--clr-border)` : "none",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 16 }}>

          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <DevnexLogo height={22} />
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-links">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                padding: "8px 14px", borderRadius: 10,
                fontSize: 14, fontWeight: 500, color: "var(--clr-text-2)",
                transition: "color .18s, background .18s",
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "#1B45D4"; (e.target as HTMLElement).style.background = "rgba(27,69,212,.08)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = ""; (e.target as HTMLElement).style.background = ""; }}
              >{l.label}</a>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>

            {/* Language switcher */}
            <div style={{ display: "flex", gap: 2, background: "var(--clr-surface-2)", borderRadius: 10, padding: 3 }}>
              {(["uz", "en", "ru"] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "5px 9px", borderRadius: 7,
                  fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase",
                  background: lang === l ? "#1B45D4" : "transparent",
                  color: lang === l ? "#fff" : "var(--clr-text-3)",
                  transition: "all .18s",
                }}>{l}</button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={isDark ? "Yorug' rejim" : "Qoʻngʻir rejim"}
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: "var(--clr-surface-2)",
                border: "1px solid var(--clr-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--clr-text-2)",
                transition: "background .2s, transform .2s",
                flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              {isDark ? (
                /* Sun */
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                /* Moon */
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <a href="#aloqa" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
              {t.nav.cta}
            </a>

            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="burger" style={{ display: "none", flexDirection: "column", gap: 4.5, padding: 8 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width: 22, height: 2, background: "var(--clr-text)", borderRadius: 2, display: "block",
                  transition: "all .2s",
                  transform: menuOpen && i === 0 ? "rotate(45deg) translateY(7px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-7px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}/>
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "var(--nav-h)", left: 0, right: 0,
          background: "var(--clr-surface)",
          borderBottom: "1px solid var(--clr-border)",
          padding: "16px 28px 24px",
          zIndex: 99,
          boxShadow: "0 16px 48px rgba(0,0,0,.12)",
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "14px 4px",
              fontSize: 16, fontWeight: 500, color: "var(--clr-text)",
              borderBottom: "1px solid var(--clr-border-2)",
            }}>{l.label}</a>
          ))}
          <a href="#aloqa" className="btn-primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
            {t.nav.cta}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width:860px){ .nav-links{display:none!important} .burger{display:flex!important} }
      `}</style>
    </>
  );
}
