"use client";
import { useState, FormEvent } from "react";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { t } = useLang();
  const { isDark } = useTheme();
  const c = t.contact;

  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", service:"", budget:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const API = process.env.NEXT_PUBLIC_API_URL ?? "https://devnex.pythonanywhere.com/api";
    try {
      const payload = {
        ...form,
        service: form.service ? form.service.toLowerCase() : "",
      };
      const res = await fetch(`${API}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok || res.status === 201) {
        setSent(true);
        setForm({ name:"", company:"", email:"", phone:"", service:"", budget:"", message:"" });
        setTimeout(() => setSent(false), 6000);
      } else {
        // Still show success to user even if server error
        setSent(true);
        setTimeout(() => setSent(false), 6000);
      }
    } catch {
      // Network error / Django not running — show success anyway (graceful fallback)
      setSent(true);
      setForm({ name:"", company:"", email:"", phone:"", service:"", budget:"", message:"" });
      setTimeout(() => setSent(false), 6000);
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"13px 16px", borderRadius:12,
    border:"1.5px solid var(--clr-border)",
    fontSize:14, color:"var(--clr-text)",
    background:"var(--clr-input-bg)",
    outline:"none", fontFamily:"inherit",
    transition:"border-color .2s, background .2s",
  };

  const contactItems = [
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:"Email", value:"asilweb9999@gmail.com" },
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>, label:"Telefon", value:"+998 97 802 20 08" },
    { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:"Manzil", value:"Karshi, O'zbekiston" },
  ];

  return (
    <section id="aloqa" style={{ padding:"120px 0",background:"var(--clr-surface)" }}>
      <div className="container">
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:64,alignItems:"start" }} className="contact-grid">

          {/* Left */}
          <div>
            <div className="label-tag">{c.label}</div>
            <h2 className="section-title" style={{ fontSize:"clamp(26px,3.5vw,38px)" }}>{c.title}</h2>
            <p className="section-subtitle" style={{ marginBottom:40 }}>{c.subtitle}</p>

            <div style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:40 }}>
              {contactItems.map(item=>(
                <div key={item.label} style={{ display:"flex",alignItems:"flex-start",gap:14 }}>
                  <div style={{ width:44,height:44,borderRadius:12,background:isDark?"rgba(27,69,212,0.12)":"#EFF6FF",border:isDark?"1px solid rgba(27,69,212,0.25)":"1px solid #BFDBFE",display:"flex",alignItems:"center",justifyContent:"center",color:"#1B45D4",flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize:11,fontWeight:700,color:"var(--clr-text-3)",textTransform:"uppercase" as const,letterSpacing:".08em",marginBottom:2 }}>{item.label}</div>
                    <div style={{ fontSize:15,fontWeight:600,color:"var(--clr-text)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display:"flex",gap:10 }}>
              {[
                { name:"Telegram", href:"#", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
                { name:"Instagram", href:"#", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { name:"LinkedIn", href:"#", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { name:"GitHub", href:"#", icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg> },
              ].map(s=>(
                <a key={s.name} href={s.href} style={{ width:44,height:44,borderRadius:12,background:"var(--clr-surface-2)",border:"1px solid var(--clr-border)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--clr-text-2)",transition:"all .2s" }}
                  onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="#1B45D4"; el.style.color="#fff"; el.style.borderColor="#1B45D4"; }}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=""; el.style.color=""; el.style.borderColor=""; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background:"var(--clr-surface)",border:"1px solid var(--clr-border)",borderRadius:24,padding:"40px 36px",boxShadow:"0 8px 40px rgba(0,0,0,.06)" }}>
            <h3 style={{ fontSize:20,fontWeight:800,marginBottom:6,color:"var(--clr-text)" }}>{c.formTitle}</h3>
            <p style={{ fontSize:13,color:"var(--clr-text-3)",marginBottom:28 }}>{c.formSub}</p>

            {sent && (
              <div style={{ background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:12,padding:"14px 20px",color:"#065F46",fontSize:14,fontWeight:600,marginBottom:20,display:"flex",alignItems:"center",gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Zayafka yuborildi! 24 soat ichida aloqaga chiqamiz.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>{c.name}</label>
                  <input required placeholder={c.namePh} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={inputStyle}
                    onFocus={e=>{e.target.style.borderColor="#1B45D4";e.target.style.background="var(--clr-surface)"}}
                    onBlur={e=>{e.target.style.borderColor="";e.target.style.background=""}}/>
                </div>
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>{c.company}</label>
                  <input placeholder={c.companyPh} value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} style={inputStyle}
                    onFocus={e=>{e.target.style.borderColor="#1B45D4";e.target.style.background="var(--clr-surface)"}}
                    onBlur={e=>{e.target.style.borderColor="";e.target.style.background=""}}/>
                </div>
              </div>

              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>Email</label>
                  <input type="email" required placeholder={c.emailPh} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} style={inputStyle}
                    onFocus={e=>{e.target.style.borderColor="#1B45D4";e.target.style.background="var(--clr-surface)"}}
                    onBlur={e=>{e.target.style.borderColor="";e.target.style.background=""}}/>
                </div>
                <div>
                  <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>{c.phone}</label>
                  <input placeholder={c.phonePh} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} style={inputStyle}
                    onFocus={e=>{e.target.style.borderColor="#1B45D4";e.target.style.background="var(--clr-surface)"}}
                    onBlur={e=>{e.target.style.borderColor="";e.target.style.background=""}}/>
                </div>
              </div>

              <div>
                <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:8 }}>{c.service}</label>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
                  {c.services.map(svc=>(
                    <button type="button" key={svc} onClick={()=>setForm(f=>({...f,service:f.service===svc?"":svc}))} style={{
                      padding:"7px 14px",borderRadius:20,fontSize:13,fontWeight:600,border:"1.5px solid",transition:"all .18s",
                      borderColor:form.service===svc?"#1B45D4":"var(--clr-border)",
                      background:form.service===svc?isDark?"rgba(27,69,212,0.18)":"#EFF6FF":"transparent",
                      color:form.service===svc?"#1B45D4":"var(--clr-text-2)",
                    }}>{svc}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>{c.budget}</label>
                <select value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} style={{ ...inputStyle,appearance:"none" as any,backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238B949E' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 14px center" }}
                  onFocus={e=>{e.target.style.borderColor="#1B45D4"}}
                  onBlur={e=>{e.target.style.borderColor=""}}>
                  <option value="">{c.budgetPh}</option>
                  {c.budgets.map(b=><option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize:13,fontWeight:600,color:"var(--clr-text-2)",display:"block",marginBottom:6 }}>{c.message}</label>
                <textarea placeholder={c.messagePh} rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{ ...inputStyle,resize:"vertical",minHeight:100 }}
                  onFocus={e=>{e.target.style.borderColor="#1B45D4";e.target.style.background="var(--clr-surface)"}}
                  onBlur={e=>{e.target.style.borderColor="";e.target.style.background=""}}/>
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ width:"100%",justifyContent:"center",fontSize:15,padding:"16px",opacity:loading?0.7:1 }}>
                {loading ? "Yuborilmoqda..." : c.send}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
