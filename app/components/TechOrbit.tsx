"use client";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

const R1 = 185;
const R2 = 310;

const techRing1 = [
  { name: "Flutter",  emoji: "🐦", angle: 0 },
  { name: "Swift",    emoji: "🍎", angle: 72 },
  { name: "Kotlin",   emoji: "🤖", angle: 144 },
  { name: "React Native", emoji: "⚛️", angle: 216 },
  { name: "Node.js",  emoji: "🟢", angle: 288 },
];

const techRing2 = [
  { name: "Next.js",     emoji: "▲",  angle: 36 },
  { name: "PostgreSQL",  emoji: "🐘", angle: 96 },
  { name: "AWS",         emoji: "☁️", angle: 156 },
  { name: "Docker",      emoji: "🐳", angle: 216 },
  { name: "Figma",       emoji: "🎨", angle: 276 },
  { name: "Redis",       emoji: "⚡", angle: 336 },
  { name: "Python",      emoji: "🐍", angle: 16 },
  { name: "Terraform",   emoji: "🏗️", angle: 196 },
];

function getPos(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export default function TechOrbit() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="texnologiyalar" style={{
      padding: "120px 0",
      background: "#050609",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Glow blobs */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(27,69,212,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="label-tag" style={{ color: "#60A5FA", background: "rgba(96,165,250,0.1)", borderColor: "rgba(96,165,250,0.2)" }}>{t.tech.label}</div>
          <h2 className="section-title" style={{ color: "#fff" }}>{t.tech.title}</h2>
          <p className="section-subtitle" style={{ color: "#64748B", margin: "0 auto" }}>{t.tech.subtitle}</p>
        </div>

        {/* Orbit visualization */}
        <div className="orbit-rings" style={{
          position: "relative",
          height: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* SVG dashed rings */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
            <circle cx="50%" cy="50%" r={R1} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="5 9" />
            <circle cx="50%" cy="50%" r={R2} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 14" />
            <circle cx="50%" cy="50%" r={90} fill="rgba(27,69,212,0.06)" stroke="rgba(27,69,212,0.15)" strokeWidth="1" />
          </svg>

          {/* Center */}
          <div style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1B45D4 0%, #3B82F6 50%, #7C3AED 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 80px rgba(27,69,212,0.6), 0 0 160px rgba(27,69,212,0.2)",
            zIndex: 10,
            animation: "pulse-ring 3s ease-in-out infinite",
          }}>
            <span style={{ color: "#fff", fontSize: 24, fontWeight: 900, letterSpacing: -1 }}>D</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9.5, fontWeight: 700, letterSpacing: 2 }}>EVNEX</span>
          </div>

          {/* Ring 1 — rotates CW, pills counter-rotate to stay upright */}
          {mounted && (
            <div style={{
              position: "absolute",
              width: R1 * 2,
              height: R1 * 2,
              animation: "spin-cw 36s linear infinite",
            }}>
              {techRing1.map(tech => {
                const { x, y } = getPos(tech.angle, R1);
                return (
                  <div key={tech.name} style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animation: "spin-ccw 36s linear infinite",
                  }}>
                    <div style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      backdropFilter: "blur(12px)",
                      borderRadius: 40,
                      padding: "9px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      cursor: "default",
                      whiteSpace: "nowrap",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(27,69,212,0.3)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(27,69,212,0.5)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      }}
                    >
                      <span style={{ fontSize: 15 }}>{tech.emoji}</span>
                      <span style={{ color: "#E2E8F0", fontSize: 12.5, fontWeight: 700 }}>{tech.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ring 2 — rotates CCW */}
          {mounted && (
            <div style={{
              position: "absolute",
              width: R2 * 2,
              height: R2 * 2,
              animation: "spin-ccw 56s linear infinite",
            }}>
              {techRing2.map(tech => {
                const { x, y } = getPos(tech.angle, R2);
                return (
                  <div key={tech.name} style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    animation: "spin-cw 56s linear infinite",
                  }}>
                    <div style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 40,
                      padding: "7px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      cursor: "default",
                      whiteSpace: "nowrap",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.25)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{tech.emoji}</span>
                      <span style={{ color: "#94A3B8", fontSize: 11.5, fontWeight: 600 }}>{tech.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom tech grid — as fallback visibility on mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: 10,
          marginTop: 0,
        }} className="tech-fallback">
          {[...techRing1, ...techRing2].map(t => (
            <div key={t.name} style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "10px 14px",
            }}>
              <span style={{ fontSize: 16 }}>{t.emoji}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748B" }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%,100% { box-shadow: 0 0 80px rgba(27,69,212,0.6), 0 0 160px rgba(27,69,212,0.2); }
          50%      { box-shadow: 0 0 100px rgba(27,69,212,0.8), 0 0 200px rgba(27,69,212,0.3); }
        }
        .tech-fallback { display: none; }
        @media (max-width: 900px) {
          .tech-fallback { display: grid !important; margin-top: 40px; }
        }
      `}</style>
    </section>
  );
}
