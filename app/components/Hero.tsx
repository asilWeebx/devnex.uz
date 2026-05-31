"use client";
import dynamic from "next/dynamic";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), { ssr: false });

const avatarItems = [
  { init: "AB", color: "#1B45D4" },
  { init: "RS", color: "#7C3AED" },
  { init: "DK", color: "#0891B2" },
  { init: "JT", color: "#059669" },
  { init: "MY", color: "#D97706" },
];

export default function Hero() {
  const { t } = useLang();
  const { isDark } = useTheme();

  const heroBg = isDark
    ? "linear-gradient(160deg,#0D1117 0%,#0D1117 100%)"
    : "linear-gradient(160deg,#EEF2FF 0%,#F5F6FA 45%,#EDF4FF 100%)";

  const blob1 = isDark
    ? "rgba(27,69,212,0.12)"
    : "rgba(37,99,235,0.10)";

  const blob2 = isDark
    ? "rgba(124,58,237,0.08)"
    : "rgba(124,58,237,0.07)";

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "var(--nav-h)",
      background: heroBg,
      transition: "background .4s ease",
    }}>
      <ParticleBackground />

      {/* Blobs */}
      <div style={{ position:"absolute",top:"-8%",right:"-6%",width:560,height:560,borderRadius:"50%",background:`radial-gradient(circle,${blob1} 0%,transparent 70%)`,pointerEvents:"none",zIndex:1 }}/>
      <div style={{ position:"absolute",bottom:"8%",left:"-8%",width:440,height:440,borderRadius:"50%",background:`radial-gradient(circle,${blob2} 0%,transparent 70%)`,pointerEvents:"none",zIndex:1 }}/>

      <div className="container" style={{ position:"relative",zIndex:2,padding:"80px 28px 140px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>

          {/* Live badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: isDark ? "rgba(22,27,34,0.9)" : "rgba(255,255,255,0.88)",
            border: `1px solid ${isDark ? "rgba(27,69,212,0.3)" : "rgba(37,99,235,0.2)"}`,
            borderRadius: 50, padding: "9px 20px 9px 10px",
            marginBottom: 40,
            backdropFilter: "blur(12px)",
            boxShadow: "0 2px 16px rgba(0,0,0,.06)",
          }}>
            <span style={{
              background: "#DCFCE7", border: "1px solid #BBF7D0",
              borderRadius: 50, padding: "4px 10px",
              fontSize: 11, fontWeight: 700, color: "#15803D", letterSpacing: ".06em",
            }}>OCHIQ</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--clr-text-2)" }}>{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(48px,8vw,92px)",
            fontWeight: 900,
            letterSpacing: "-.038em",
            lineHeight: 1.0,
            marginBottom: 28,
            color: "var(--clr-text)",
          }}>
            <span style={{ display:"block" }}>{t.hero.line1}</span>
            <span style={{ display:"block", background:"linear-gradient(135deg,#1B45D4 0%,#7C3AED 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              {t.hero.line2}
            </span>
            <span style={{ display:"block" }}>{t.hero.line3}</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(16px,1.8vw,19px)",
            color: "var(--clr-text-2)",
            lineHeight: 1.8,
            marginBottom: 44,
            maxWidth: 580,
            margin: "0 auto 44px",
          }}>
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",alignItems:"center" }}>
            <a href="#aloqa" className="btn-primary" style={{ fontSize:16,padding:"17px 36px" }}>
              {t.hero.cta1}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#loyihalar" className="btn-secondary" style={{ fontSize:16,padding:"16px 36px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {t.hero.cta2}
            </a>
          </div>

          {/* Social proof */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginTop:48 }}>
            <div style={{ display:"flex" }}>
              {avatarItems.map((a,i) => (
                <div key={a.init} style={{
                  width:36,height:36,borderRadius:"50%",
                  background:`linear-gradient(135deg,${a.color},${a.color}bb)`,
                  border:`2.5px solid var(--clr-surface)`,
                  marginLeft: i===0?0:-10,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:11,fontWeight:800,color:"#fff",
                  position:"relative",zIndex:avatarItems.length-i,
                }}>{a.init}</div>
              ))}
            </div>
            <div style={{ textAlign:"left" }}>
              <div style={{ display:"flex",gap:2,marginBottom:3 }}>
                {[1,2,3,4,5].map(i=>(
                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <p style={{ fontSize:13,color:"var(--clr-text-2)" }}>
                <strong style={{ color:"var(--clr-text)" }}>5+ yil</strong> tajriba, <strong style={{ color:"var(--clr-text)" }}>real loyihalar</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{
        position:"absolute",bottom:42,left:"50%",transform:"translateX(-50%)",
        display:"flex",gap:0,
        background: isDark ? "rgba(22,27,34,0.85)" : "rgba(255,255,255,0.82)",
        border:`1px solid var(--clr-border)`,
        borderRadius:18,
        backdropFilter:"blur(16px)",
        overflow:"hidden",
        zIndex:3,
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
      }} className="stats-strip">
        {[
          { num:"5+", label:"Yil tajriba" },
          { num:"30+", label:"Loyihalar" },
          { num:"6",   label:"Xizmat yo'nalishi" },
          { num:"100%", label:"Muddatga rioya" },
        ].map((s,i) => (
          <div key={s.label} style={{
            padding:"16px 32px",textAlign:"center",
            borderLeft: i>0 ? "1px solid var(--clr-border)" : "none",
          }}>
            <div style={{ fontSize:"clamp(20px,3vw,28px)",fontWeight:900,color:"var(--clr-text)",letterSpacing:-1,lineHeight:1 }}>{s.num}</div>
            <div style={{ fontSize:11.5,color:"var(--clr-text-3)",fontWeight:600,marginTop:3,whiteSpace:"nowrap" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ticker */}
      <div style={{
        position:"absolute",bottom:0,left:0,right:0,height:42,
        background:"#0A0C10",overflow:"hidden",display:"flex",alignItems:"center",zIndex:2,
      }}>
        <div style={{ display:"flex",animation:"ticker 26s linear infinite",whiteSpace:"nowrap" }}>
          {Array(2).fill(["Flutter","Swift","Kotlin","React Native","Next.js","Node.js","Python","PostgreSQL","AWS","Docker","Kubernetes","Figma","React","Redis","FastAPI","TensorFlow"]).flat().map((item,i)=>(
            <span key={i} style={{ color:"#475569",fontSize:11,fontWeight:600,letterSpacing:".08em",padding:"0 20px" }}>
              {item}<span style={{ color:"#1e293b",paddingLeft:20 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:700px){ .stats-strip{display:none!important} }
      `}</style>
    </section>
  );
}
