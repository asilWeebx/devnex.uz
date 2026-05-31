"use client";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

const projects = [
  {
    id: "levelup-app",
    title: "Level Up Students",
    subtitle: "Mobil ilova",
    category: "Mobile",
    url: null,
    desc: "Level Up o'quv markazi o'quvchilari uchun Flutter'da yaratilgan mobil ilova. Dars jadvali, topshiriqlar, o'qituvchilar bilan aloqa va ball tizimi.",
    tags: ["Flutter", "Firebase", "REST API", "Push Notifications"],
    accent: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    icon: "🎓",
    platforms: ["iOS", "Android"],
    featured: true,
  },
  {
    id: "partnerspharm",
    title: "PartnersPharm",
    subtitle: "Web platforma",
    category: "Web",
    url: "https://partnerspharm.com",
    desc: "Farmatsevtika kompaniyalari va distribyutorlar uchun B2B platforma. Mahsulot katalogi, buyurtma va shartnoma boshqaruvi.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    accent: "#059669",
    accentBg: "#ECFDF5",
    accentBorder: "#A7F3D0",
    icon: "💊",
    platforms: ["Web"],
    featured: false,
  },
  {
    id: "assembly",
    title: "Assembly.uz",
    subtitle: "Web platforma",
    category: "Web",
    url: "https://assembly.uz",
    desc: "O'zbekistondagi IT hamjamiyat platformasi. Konferensiyalar, meetuplar va texnologik tadbirlarni boshqarish.",
    tags: ["React", "Node.js", "PostgreSQL"],
    accent: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    icon: "🤝",
    platforms: ["Web"],
    featured: false,
  },
  {
    id: "levelup-karshi",
    title: "Level Up Karshi",
    subtitle: "Korporativ sayt",
    category: "Web",
    url: "https://level-up-karshi.uz",
    desc: "Level Up o'quv markazining Qarshi filiali uchun rasmiy web-sayt. Kurslar, narxlar, o'qituvchilar va ro'yxatdan o'tish.",
    tags: ["Next.js", "Tailwind", "CMS"],
    accent: "#D97706",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    icon: "🏫",
    platforms: ["Web"],
    featured: false,
  },
  {
    id: "prorabbob",
    title: "ProRabbob",
    subtitle: "Biznes sayt",
    category: "Web",
    url: "https://prorabbob.uz",
    desc: "Qurilish va ta'mirlash xizmatlari kompaniyasi uchun professional sayt. Portfolio, xizmatlar ro'yxati va murojaat formasi.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    accent: "#DC2626",
    accentBg: "#FFF1F2",
    accentBorder: "#FECDD3",
    icon: "🏗️",
    platforms: ["Web"],
    featured: false,
  },
];

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  );
}

export default function Portfolio() {
  const { t } = useLang();
  const { isDark } = useTheme();

  const featured = projects.find(p => p.featured)!;
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="loyihalar" style={{ padding: "120px 0", background: "var(--clr-bg)" }}>
      <div className="container">
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:52,gap:20,flexWrap:"wrap" }}>
          <div>
            <div className="label-tag">{t.projects.label}</div>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-subtitle">Ishlab topshirgan haqiqiy loyihalarimiz — har biri real muammoni hal qiladi.</p>
          </div>
        </div>

        {/* Featured card */}
        <div style={{
          background: "var(--clr-surface)",
          border: "1px solid var(--clr-border)",
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          transition: "box-shadow .22s ease",
        }} className="featured-card"
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 72px rgba(0,0,0,.10)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
        >
          {/* Left: visual */}
          <div style={{
            background: isDark ? `rgba(8,145,178,0.08)` : featured.accentBg,
            borderRight: `1px solid var(--clr-border)`,
            padding: "52px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            minHeight: 280,
          }}>
            {/* Decorative circle */}
            <div style={{ position:"absolute",bottom:-60,right:-60,width:240,height:240,borderRadius:"50%",background:`${featured.accent}10`,pointerEvents:"none" }}/>

            <div>
              <div style={{ fontSize:56,marginBottom:20 }}>{featured.icon}</div>
              <h3 style={{ fontSize:32,fontWeight:900,color:"var(--clr-text)",letterSpacing:-1,marginBottom:8 }}>{featured.title}</h3>
              <p style={{ fontSize:15,color:"var(--clr-text-2)",lineHeight:1.6 }}>{featured.subtitle}</p>
            </div>

            <div style={{ display:"flex",gap:8,marginTop:28,flexWrap:"wrap" }}>
              {featured.platforms.map(p=>(
                <span key={p} style={{ fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:20,background:`${featured.accent}15`,color:featured.accent,border:`1px solid ${featured.accent}25` }}>{p}</span>
              ))}
              <span style={{ fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:20,background:`${featured.accent}15`,color:featured.accent,border:`1px solid ${featured.accent}25` }}>{featured.category}</span>
            </div>
          </div>

          {/* Right: info */}
          <div style={{ padding:"52px 48px",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:17,color:"var(--clr-text-2)",lineHeight:1.75,marginBottom:28 }}>{featured.desc}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                {featured.tags.map(tag=>(
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ marginTop:36,paddingTop:28,borderTop:`1px solid var(--clr-border)` }}>
              <div style={{ fontSize:13,color:"var(--clr-text-3)",marginBottom:4 }}>Play Store & App Store'da mavjud</div>
              <div style={{ display:"flex",gap:8 }}>
                {["Google Play","App Store"].map(store=>(
                  <span key={store} style={{ display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,padding:"7px 14px",borderRadius:20,background:"var(--clr-surface-2)",color:"var(--clr-text-2)",border:"1px solid var(--clr-border)" }}>{store}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4 smaller cards */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,
        }} className="proj-grid">
          {rest.map(p => (
            <div key={p.id} style={{
              background:"var(--clr-surface)",
              border:"1px solid var(--clr-border)",
              borderRadius:20,
              overflow:"hidden",
              transition:"transform .22s ease, box-shadow .22s ease",
              display:"flex",flexDirection:"column",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 20px 60px rgba(0,0,0,.09)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="none"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}
            >
              {/* Card header */}
              <div style={{
                background: isDark ? `${p.accent}10` : p.accentBg,
                borderBottom:"1px solid var(--clr-border)",
                padding:"28px 24px",
                position:"relative",overflow:"hidden",
              }}>
                <div style={{ position:"absolute",bottom:-30,right:-20,width:100,height:100,borderRadius:"50%",background:`${p.accent}10`,pointerEvents:"none" }}/>
                <div style={{ fontSize:36,marginBottom:12 }}>{p.icon}</div>
                <div style={{ fontSize:11,fontWeight:700,color:p.accent,letterSpacing:".06em",textTransform:"uppercase" as const,marginBottom:6 }}>{p.category}</div>
                <h3 style={{ fontSize:17,fontWeight:800,color:"var(--clr-text)",letterSpacing:-0.3 }}>{p.title}</h3>
              </div>

              {/* Body */}
              <div style={{ padding:"20px 24px",flex:1,display:"flex",flexDirection:"column",gap:14 }}>
                <p style={{ fontSize:13,color:"var(--clr-text-2)",lineHeight:1.65,flex:1 }}>{p.desc}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                  {p.tags.slice(0,3).map(tag=>(
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding:"14px 24px",borderTop:"1px solid var(--clr-border-2)" }}>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                    display:"inline-flex",alignItems:"center",gap:6,
                    fontSize:13,fontWeight:700,color:p.accent,
                    transition:"gap .15s",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap="10px"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap="6px"}
                  >
                    {p.url.replace("https://","")} <ExternalIcon/>
                  </a>
                ) : (
                  <span style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-3)" }}>App store'da mavjud</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center",marginTop:60 }}>
          <a href="#aloqa" className="btn-primary" style={{ fontSize:16,padding:"17px 40px" }}>
            Loyihangizni muhokama qilish →
          </a>
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){ .proj-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:700px){ .proj-grid{grid-template-columns:1fr!important} .featured-card{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
