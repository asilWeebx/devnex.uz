"use client";
import { useLang } from "../context/LangContext";
import DevnexLogo from "./DevnexLogo";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { label: t.nav.services, href: "#xizmatlar" },
    { label: t.nav.projects, href: "#loyihalar" },
    { label: t.nav.contact, href: "#aloqa" },
  ];

  const projects = [
    { label: "Level Up Students", href: "#" },
    { label: "PartnersPharm", href: "https://partnerspharm.com" },
    { label: "Assembly.uz", href: "https://assembly.uz" },
    { label: "Level Up Karshi", href: "https://level-up-karshi.uz" },
    { label: "ProRabbob", href: "https://prorabbob.uz" },
  ];

  const services = ["CRM Tizimlari","ERP Yechimlar","Mobile Ilovalar","Web Platformalar","DevOps & Cloud","Backend & API"];

  const linkStyle: React.CSSProperties = { fontSize:14,color:"#6E7681",transition:"color .18s" };

  return (
    <footer style={{ background:"#0D1117",color:"#6E7681",padding:"64px 0 32px",borderTop:"1px solid #21262D" }}>
      <div className="container">
        <div style={{ display:"grid",gridTemplateColumns:"1.6fr 1fr 1fr 1fr",gap:48,marginBottom:52,paddingBottom:40,borderBottom:"1px solid #21262D" }} className="footer-grid">

          {/* Brand */}
          <div>
            <a href="#" style={{ display:"flex",alignItems:"center",marginBottom:18 }}>
              <DevnexLogo height={22} forceColor="#E6EDF3" />
            </a>
            <p style={{ fontSize:14,lineHeight:1.75,maxWidth:260,marginBottom:20 }}>{t.footer.tagline}</p>

            {/* Socials */}
            <div style={{ display:"flex",gap:8 }}>
              {[
                { href:"#", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
                { href:"#", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href:"#", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { href:"#", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg> },
              ].map((s,i)=>(
                <a key={i} href={s.href} style={{ width:34,height:34,borderRadius:8,background:"#21262D",border:"1px solid #30363D",display:"flex",alignItems:"center",justifyContent:"center",color:"#6E7681",transition:"all .2s" }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="#1B45D4"; el.style.color="#fff"; el.style.borderColor="#1B45D4"; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="#21262D"; el.style.color="#6E7681"; el.style.borderColor="#30363D"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ color:"#E6EDF3",fontSize:13,fontWeight:700,marginBottom:16,letterSpacing:".04em",textTransform:"uppercase" as const }}>Sahifalar</h4>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {links.map(l=>(
                <a key={l.href} href={l.href} style={linkStyle}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color="#E6EDF3"}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color="#6E7681"}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color:"#E6EDF3",fontSize:13,fontWeight:700,marginBottom:16,letterSpacing:".04em",textTransform:"uppercase" as const }}>Xizmatlar</h4>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {services.map(s=>(
                <a key={s} href="#xizmatlar" style={linkStyle}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color="#E6EDF3"}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color="#6E7681"}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 style={{ color:"#E6EDF3",fontSize:13,fontWeight:700,marginBottom:16,letterSpacing:".04em",textTransform:"uppercase" as const }}>Loyihalar</h4>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {projects.map(p=>(
                <a key={p.label} href={p.href} target={p.href.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e=>(e.target as HTMLElement).style.color="#E6EDF3"}
                  onMouseLeave={e=>(e.target as HTMLElement).style.color="#6E7681"}
                >{p.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
          <p style={{ fontSize:13 }}>© {year} Devnex. {t.footer.rights}</p>
          <div style={{ display:"flex",gap:20 }}>
            {["Maxfiylik siyosati","Foydalanish shartlari"].map(item=>(
              <a key={item} href="#" style={{ fontSize:13,color:"#6E7681",transition:"color .18s" }}
                onMouseEnter={e=>(e.target as HTMLElement).style.color="#E6EDF3"}
                onMouseLeave={e=>(e.target as HTMLElement).style.color="#6E7681"}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important}.footer-grid>div:first-child{grid-column:span 2}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}.footer-grid>div:first-child{grid-column:span 1}}
      `}</style>
    </footer>
  );
}
