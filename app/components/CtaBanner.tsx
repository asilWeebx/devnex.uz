"use client";
import { useLang } from "../context/LangContext";

export default function CtaBanner() {
  const { t } = useLang();

  return (
    <section style={{
      padding: "80px 0",
      background: "#0A0C10",
    }}>
      <div className="container">
        <div style={{
          background: "linear-gradient(135deg, #1B45D4 0%, #7C3AED 60%, #0891B2 100%)",
          borderRadius: 28,
          padding: "64px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -60, right: 200, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -80, right: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

          <div style={{ position: "relative", maxWidth: 560 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
              Bepul konsultatsiya
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
              Loyihangizni bugun boshlang
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
              30 daqiqalik bepul konsultatsiyada g'oyangizni aytib bering. Stack, muddat va narxni birgalikda aniqlaymiz.
            </p>
          </div>

          <div style={{ display: "flex", gap: 14, position: "relative", flexShrink: 0, flexWrap: "wrap" }}>
            <a href="#aloqa" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#fff", color: "#1B45D4",
              padding: "16px 32px", borderRadius: 50,
              fontSize: 15, fontWeight: 700,
              boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)"; }}
            >
              Zayafka yuborish →
            </a>
            <a href="tel:+998772657788" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.12)", color: "#fff",
              padding: "15px 28px", borderRadius: 50,
              fontSize: 15, fontWeight: 600,
              border: "1.5px solid rgba(255,255,255,0.2)",
              transition: "background 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
              </svg>
              Qo'ng'iroq qilish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
