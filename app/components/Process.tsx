"use client";

const steps = [
  { num:"01", title:"Konsultatsiya", desc:"G'oyangizni tinglaymiz, biznes maqsadlarini aniqlaymiz va eng mos texnologiyalarni tavsiya etamiz.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, color:"#1B45D4" },
  { num:"02", title:"Dizayn & Prototip", desc:"Figma'da UI/UX dizayn va interaktiv prototip. Siz tasdiqlaguningizcha iteratsiya qilamiz.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>, color:"#7C3AED" },
  { num:"03", title:"Ishlab chiqish", desc:"Agile sprintlar bilan tez ishlab chiqamiz. Har 2 haftada siz bilan progress ko'rib chiqamiz.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, color:"#0891B2" },
  { num:"04", title:"Test & QA", desc:"Unit, integration va E2E testlar. CI/CD pipeline, Sentry monitoring va avtomatik alert.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>, color:"#059669" },
  { num:"05", title:"Deploy & Launch", desc:"Production'ga chiqarish. SSL, CDN, auto-scaling sozlanadi. Zero-downtime deployment.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>, color:"#D97706" },
  { num:"06", title:"Qo'llab-quvvatlash", desc:"6 oylik bepul texnik qo'llab-quvvatlash. Keyingi bosqichlar uchun roadmap tuzamiz.", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, color:"#DC2626" },
];

export default function Process() {
  return (
    <section style={{ padding:"120px 0",background:"var(--clr-bg)" }}>
      <div className="container">
        <div style={{ textAlign:"center",marginBottom:72 }}>
          <div className="label-tag">jarayon</div>
          <h2 className="section-title">Biz qanday ishlaymiz</h2>
          <p className="section-subtitle" style={{ margin:"0 auto" }}>
            Har bir loyiha 6 bosqichdan iborat tizimli jarayon orqali amalga oshiriladi.
          </p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }} className="process-grid">
          {steps.map((step,i) => (
            <div key={step.num} style={{
              position:"relative",
              background:"var(--clr-surface)",
              border:"1px solid var(--clr-border)",
              borderRadius:20,
              padding:"32px 28px",
              display:"flex",flexDirection:"column",gap:16,
              transition:"transform .22s ease, box-shadow .22s ease",
              overflow:"hidden",
            }}
              onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-5px)"; el.style.boxShadow="0 20px 60px rgba(0,0,0,.09)"; }}
              onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow="none"; }}
            >
              {/* Background step number */}
              <div style={{ position:"absolute",top:-12,right:16,fontSize:80,fontWeight:900,color:"var(--clr-border-2)",lineHeight:1,userSelect:"none",letterSpacing:-4 }}>{step.num}</div>

              <div style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:50,height:50,borderRadius:14,background:`${step.color}12`,border:`1.5px solid ${step.color}22`,display:"flex",alignItems:"center",justifyContent:"center",color:step.color,flexShrink:0 }}>
                  {step.icon}
                </div>
                <span style={{ fontSize:11,fontWeight:700,color:step.color,background:`${step.color}10`,border:`1px solid ${step.color}20`,padding:"4px 10px",borderRadius:20,letterSpacing:".06em" }}>
                  {i+1}-bosqich
                </span>
              </div>

              <div>
                <h3 style={{ fontSize:18,fontWeight:800,color:"var(--clr-text)",marginBottom:8,letterSpacing:-0.2 }}>{step.title}</h3>
                <p style={{ fontSize:14,color:"var(--clr-text-2)",lineHeight:1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){ .process-grid{grid-template-columns:repeat(2,1fr)!important} }
        @media(max-width:580px){ .process-grid{grid-template-columns:1fr!important} }
      `}</style>
    </section>
  );
}
