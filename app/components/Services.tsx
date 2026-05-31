"use client";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

const cfgs = {
  crm: {
    color:"#1B45D4", lightBg:"#EFF6FF", darkBg:"rgba(27,69,212,0.08)", border:"rgba(27,69,212,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    tags:["Salesforce","Custom CRM","Automation","Analytics"],
  },
  erp: {
    color:"#7C3AED", lightBg:"#F5F3FF", darkBg:"rgba(124,58,237,0.08)", border:"rgba(124,58,237,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    tags:["SAP","Custom ERP","BI","Reporting"],
  },
  mobile: {
    color:"#0891B2", lightBg:"#ECFEFF", darkBg:"rgba(8,145,178,0.08)", border:"rgba(8,145,178,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/></svg>,
    tags:["Flutter","Swift","Kotlin","React Native"],
  },
  web: {
    color:"#059669", lightBg:"#ECFDF5", darkBg:"rgba(5,150,105,0.08)", border:"rgba(5,150,105,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    tags:["Next.js","React","SEO","CMS"],
  },
  backend: {
    color:"#DC2626", lightBg:"#FFF1F2", darkBg:"rgba(220,38,38,0.08)", border:"rgba(220,38,38,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    tags:["Node.js","Python","FastAPI","PostgreSQL","Redis"],
  },
  devops: {
    color:"#D97706", lightBg:"#FFFBEB", darkBg:"rgba(217,119,6,0.08)", border:"rgba(217,119,6,0.2)",
    icon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>,
    tags:["AWS","Docker","K8s","Terraform","CI/CD"],
  },
};

interface CardProps { id: keyof typeof cfgs; title: string; desc: string; featured?: boolean; isDark: boolean; }

function ServiceCard({ id, title, desc, featured, isDark }: CardProps) {
  const c = cfgs[id];
  const iconBg = isDark ? c.darkBg : c.lightBg;

  return (
    <div className="card" style={{ padding:featured?36:28, display:"flex", flexDirection:"column", gap:20, position:"relative", overflow:"hidden", height:"100%" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${c.color},${c.color}60)`,borderRadius:"20px 20px 0 0" }}/>

      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12 }}>
        <div style={{ width:52,height:52,borderRadius:16,background:iconBg,border:`1.5px solid ${c.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:c.color,flexShrink:0 }}>
          {c.icon}
        </div>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--clr-text-3)" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </div>

      <div>
        <h3 style={{ fontSize:featured?22:17,fontWeight:800,color:"var(--clr-text)",marginBottom:8,letterSpacing:-0.3 }}>{title}</h3>
        <p style={{ fontSize:14,color:"var(--clr-text-2)",lineHeight:1.7 }}>{desc}</p>
      </div>

      <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginTop:"auto" }}>
        {c.tags.slice(0, featured?4:2).map(tag=>(
          <span key={tag} style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,background:`${c.color}10`,color:c.color,border:`1px solid ${c.color}20` }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useLang();
  const { isDark } = useTheme();
  const s = t.services;

  return (
    <section id="xizmatlar" style={{ padding:"120px 0",background:"var(--clr-surface)" }}>
      <div className="container">
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:56,gap:24,flexWrap:"wrap" }}>
          <div>
            <div className="label-tag">{s.label}</div>
            <h2 className="section-title">{s.title}</h2>
            <p className="section-subtitle">{s.subtitle}</p>
          </div>
          <a href="#aloqa" className="btn-primary" style={{ flexShrink:0 }}>Maslahat olish →</a>
        </div>

        {/* Bento grid */}
        <div style={{ display:"grid",gridTemplateColumns:"1.15fr 1fr 1fr",gridTemplateRows:"auto auto",gap:16 }} className="bento-grid">
          <div style={{ gridRow:"1 / 3" }}><ServiceCard id="crm" title={s.crm.title} desc={s.crm.desc} featured isDark={isDark}/></div>
          <div><ServiceCard id="erp" title={s.erp.title} desc={s.erp.desc} isDark={isDark}/></div>
          <div><ServiceCard id="mobile" title={s.mobile.title} desc={s.mobile.desc} isDark={isDark}/></div>
          <div><ServiceCard id="web" title={s.web.title} desc={s.web.desc} isDark={isDark}/></div>
          <div><ServiceCard id="backend" title={s.backend.title} desc={s.backend.desc} isDark={isDark}/></div>
        </div>

        {/* Full-width DevOps */}
        <div style={{ marginTop:16 }}>
          <div style={{
            background: isDark ? "var(--clr-surface-2)" : "#0D1117",
            border:"1px solid var(--clr-border)",
            borderRadius:20,
            padding:"36px 40px",
            display:"grid",
            gridTemplateColumns:"auto 1fr auto",
            gap:32,
            alignItems:"center",
          }} className="devops-card">
            <div style={{ width:60,height:60,borderRadius:18,background:"rgba(217,119,6,0.15)",border:"1.5px solid rgba(217,119,6,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F59E0B",flexShrink:0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>
            </div>
            <div>
              <h3 style={{ fontSize:22,fontWeight:800,color:"#E6EDF3",marginBottom:6,letterSpacing:-0.3 }}>{s.devops.title}</h3>
              <p style={{ fontSize:14,color:"#64748B",lineHeight:1.7 }}>{s.devops.desc}</p>
              <div style={{ display:"flex",gap:8,marginTop:14,flexWrap:"wrap" }}>
                {["AWS","Docker","Kubernetes","Terraform","GitHub Actions"].map(tag=>(
                  <span key={tag} style={{ fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:20,background:"rgba(217,119,6,0.12)",color:"#F59E0B",border:"1px solid rgba(217,119,6,0.2)" }}>{tag}</span>
                ))}
              </div>
            </div>
            <a href="#aloqa" style={{
              display:"inline-flex",alignItems:"center",gap:8,
              background:"#F59E0B",color:"#0A0C10",
              padding:"14px 24px",borderRadius:50,
              fontSize:14,fontWeight:700,flexShrink:0,whiteSpace:"nowrap" as const,
              transition:"transform .2s,box-shadow .2s",
              boxShadow:"0 4px 20px rgba(245,158,11,.3)",
            }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="translateY(-2px)"}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="none"}
            >Boshlash →</a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){ .bento-grid{grid-template-columns:1fr 1fr!important} .bento-grid>div:first-child{grid-row:span 1!important} }
        @media(max-width:640px){ .bento-grid{grid-template-columns:1fr!important} .devops-card{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
