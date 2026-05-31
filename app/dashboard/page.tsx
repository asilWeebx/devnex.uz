"use client";
import { useEffect, useState, useCallback } from "react";

const API_BASE   = process.env.NEXT_PUBLIC_API_URL ?? "http://devnex.pythonanywhere.com/api";
const PASS_KEY   = "devnex-dash-auth";
const VALID_PASS = "devnex2026";
const API_KEY    = "devnex-dashboard-2026-secret";

interface Submission {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  is_read: boolean;
  note: string;
  created_at: string;
}

interface Stats { total: number; new: number; unread: number; }

const SERVICE_LABELS: Record<string, string> = {
  crm:"CRM", erp:"ERP", mobile:"Mobile", web:"Web", backend:"Backend", devops:"DevOps", other:"Boshqa", "":"—",
};
const STATUS_LABELS: Record<string, string> = {
  new:"Yangi", in_progress:"Jarayonda", closed:"Yopildi",
};
const STATUS_COLORS: Record<string, string> = {
  new:"#1B45D4", in_progress:"#D97706", closed:"#6E7681",
};
const SERVICE_COLORS: Record<string, string> = {
  crm:"#1B45D4",erp:"#7C3AED",mobile:"#0891B2",web:"#059669",backend:"#DC2626",devops:"#D97706",other:"#6E7681","":"#6E7681",
};

// ─── Login screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === VALID_PASS) {
      localStorage.setItem(PASS_KEY, "1");
      onLogin();
    } else {
      setErr(true);
      setTimeout(() => setErr(false), 2000);
    }
  };

  return (
    <div style={{ minHeight:"100vh",background:"#0D1117",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',-apple-system,sans-serif",padding:"20px 16px" }}>
      <div style={{ background:"#161B22",border:"1px solid #30363D",borderRadius:20,padding:"clamp(32px,6vw,48px) clamp(24px,6vw,44px)",width:"100%",maxWidth:380,boxShadow:"0 24px 72px rgba(0,0,0,0.4)" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ fontSize:"clamp(22px,6vw,28px)",fontWeight:900,letterSpacing:"0.05em",color:"#E6EDF3" }}>DE▽NEX</div>
          <div style={{ fontSize:13,color:"#6E7681",marginTop:4 }}>Dashboard · Kirish</div>
        </div>

        <form onSubmit={submit} style={{ display:"flex",flexDirection:"column",gap:14 }}>
          <div>
            <label style={{ fontSize:12,fontWeight:600,color:"#8B949E",letterSpacing:".08em",textTransform:"uppercase",display:"block",marginBottom:6 }}>Parol</label>
            <input
              type="password"
              placeholder="••••••••••"
              value={pw}
              onChange={e=>setPw(e.target.value)}
              autoFocus
              style={{
                width:"100%",padding:"13px 16px",borderRadius:12,boxSizing:"border-box",
                border:`1.5px solid ${err?"#F85149":"#30363D"}`,
                background:"#0D1117",color:"#E6EDF3",fontSize:15,
                fontFamily:"inherit",outline:"none",transition:"border-color .2s",
              }}
              onFocus={e=>{ if(!err) e.target.style.borderColor="#1B45D4"; }}
              onBlur={e=>{ if(!err) e.target.style.borderColor="#30363D"; }}
            />
            {err && <p style={{ fontSize:12,color:"#F85149",marginTop:6 }}>Noto'g'ri parol</p>}
          </div>
          <button type="submit" style={{
            background:"#1B45D4",color:"#fff",padding:"14px",borderRadius:12,
            fontWeight:700,fontSize:15,fontFamily:"inherit",cursor:"pointer",
            border:"none",transition:"background .2s",marginTop:4,
          }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="#1338B2"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="#1B45D4"}
          >Kirish →</button>
        </form>
      </div>
    </div>
  );
}

// ─── Main dashboard ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [authed,       setAuthed]       = useState(false);
  const [submissions,  setSubmissions]  = useState<Submission[]>([]);
  const [stats,        setStats]        = useState<Stats|null>(null);
  const [loading,      setLoading]      = useState(false);
  const [selected,     setSelected]     = useState<Submission|null>(null);
  const [filterSvc,    setFilterSvc]    = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);
  const [note,         setNote]         = useState("");
  const [saving,       setSaving]       = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);

  useEffect(() => {
    if (localStorage.getItem(PASS_KEY) === "1") setAuthed(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterSvc)    params.set("service", filterSvc);
      if (filterStatus) params.set("status",  filterStatus);
      if (filterUnread) params.set("unread",  "1");

      const res = await fetch(`${API_BASE}/dashboard/submissions/?${params}`, {
        headers: { "X-API-Key": API_KEY },
      });
      const data = await res.json();
      setSubmissions(data.results ?? []);
      setStats(data.stats ?? null);
    } catch {
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  }, [filterSvc, filterStatus, filterUnread]);

  useEffect(() => { if (authed) fetchData(); }, [authed, fetchData]);

  const patch = async (id: number, payload: Partial<Submission>) => {
    setSaving(true);
    await fetch(`${API_BASE}/dashboard/submissions/${id}/`, {
      method:"PATCH",
      headers:{ "Content-Type":"application/json","X-API-Key":API_KEY },
      body:JSON.stringify(payload),
    });
    setSaving(false);
    fetchData();
    if (selected?.id === id) setSelected(s => s ? { ...s, ...payload } : s);
  };

  const del = async (id: number) => {
    if (!confirm("Zayafkani o'chirishni tasdiqlaysizmi?")) return;
    await fetch(`${API_BASE}/dashboard/submissions/${id}/`, {
      method:"DELETE", headers:{ "X-API-Key":API_KEY },
    });
    setSelected(null);
    fetchData();
  };

  const markAllRead = async () => {
    await fetch(`${API_BASE}/dashboard/mark-all-read/`, {
      method:"POST", headers:{ "X-API-Key":API_KEY },
    });
    fetchData();
  };

  const openDetail = (sub: Submission) => {
    setSelected(sub);
    setNote(sub.note);
    if (isMobile) {
      // Prevent body scroll when overlay is open
      document.body.style.overflow = "hidden";
    }
  };

  const closeDetail = () => {
    setSelected(null);
    document.body.style.overflow = "";
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const unread = submissions.filter(s=>!s.is_read).length;

  return (
    <div style={{ minHeight:"100vh",background:"#0D1117",color:"#E6EDF3",fontFamily:"'Inter',-apple-system,sans-serif",display:"flex",flexDirection:"column" }}>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{ background:"#161B22",borderBottom:"1px solid #30363D",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,flexShrink:0,gap:8 }}>
        {/* Left */}
        <div style={{ display:"flex",alignItems:"center",gap:10,minWidth:0 }}>
          <span style={{ fontSize:"clamp(15px,4vw,18px)",fontWeight:900,letterSpacing:"0.05em",color:"#E6EDF3",flexShrink:0 }}>DE▽NEX</span>
          {!isMobile && (
            <>
              <span style={{ fontSize:12,color:"#30363D" }}>|</span>
              <span style={{ fontSize:13,color:"#8B949E",fontWeight:500,whiteSpace:"nowrap" }}>Zayafkalar</span>
            </>
          )}
          {unread > 0 && (
            <span style={{ background:"#1B45D4",color:"#fff",fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:20,flexShrink:0 }}>{unread}</span>
          )}
        </div>

        {/* Right */}
        <div style={{ display:"flex",gap:6,alignItems:"center",flexShrink:0 }}>
          {!isMobile && (
            <button onClick={markAllRead} style={{ ...btnStyle,color:"#8B949E" }}>
              O'qildi
            </button>
          )}
          <button onClick={fetchData} style={{ ...btnStyle,background:"#1B45D4",borderColor:"#1B45D4",color:"#fff" }}>
            {isMobile ? "↻" : "↻ Yangilash"}
          </button>
          {isMobile && (
            <button onClick={markAllRead} style={{ ...btnStyle,color:"#8B949E",padding:"6px 10px" }}>
              ✓ Barchasi
            </button>
          )}
          <button onClick={() => { localStorage.removeItem(PASS_KEY); setAuthed(false); }} style={{ ...btnStyle,color:"#F85149" }}>
            {isMobile ? "↩" : "Chiqish"}
          </button>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div style={{ display:"flex",flex:1,overflow:"hidden",position:"relative" }}>

        {/* ── Left panel: list ─────────────────────────────── */}
        <div style={{
          width: isMobile ? "100%" : (selected ? "400px" : "100%"),
          flexShrink:0,
          display:"flex",
          flexDirection:"column",
          borderRight: isMobile ? "none" : "1px solid #30363D",
          overflow:"hidden",
          transition:"width .2s",
        }}>

          {/* Stats */}
          {stats && (
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,padding:"12px 12px 0" }}>
              {[
                { label:"Jami",       val:stats.total,  color:"#E6EDF3" },
                { label:"Yangi",      val:stats.new,    color:"#1B45D4" },
                { label:"O'qilmagan",val:stats.unread, color:"#F59E0B" },
              ].map(s=>(
                <div key={s.label} style={{ background:"#161B22",border:"1px solid #30363D",borderRadius:10,padding:"10px 8px",textAlign:"center" }}>
                  <div style={{ fontSize:"clamp(20px,5vw,28px)",fontWeight:900,color:s.color,letterSpacing:-1 }}>{s.val}</div>
                  <div style={{ fontSize:"clamp(9px,2.5vw,11px)",color:"#6E7681",fontWeight:600,marginTop:2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Filters */}
          <div style={{ display:"flex",gap:6,padding:"10px 12px",flexWrap:"wrap",alignItems:"center" }}>
            <select value={filterSvc} onChange={e=>setFilterSvc(e.target.value)} style={{ ...selStyle,flex:"1 1 120px",minWidth:0 }}>
              <option value="">Barcha xizmatlar</option>
              {Object.entries(SERVICE_LABELS).filter(([k])=>k).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{ ...selStyle,flex:"1 1 110px",minWidth:0 }}>
              <option value="">Barcha holatlar</option>
              {Object.entries(STATUS_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
            <label style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#8B949E",cursor:"pointer",whiteSpace:"nowrap" }}>
              <input type="checkbox" checked={filterUnread} onChange={e=>setFilterUnread(e.target.checked)} style={{ accentColor:"#1B45D4",width:14,height:14 }}/>
              Yangi
            </label>
            <button onClick={fetchData} style={{ ...btnStyle,fontSize:12,padding:"5px 12px" }}>
              Filter
            </button>
          </div>

          {/* List */}
          <div style={{ flex:1,overflowY:"auto" }}>
            {loading ? (
              <div style={{ padding:40,textAlign:"center",color:"#6E7681" }}>Yuklanmoqda...</div>
            ) : submissions.length === 0 ? (
              <div style={{ padding:40,textAlign:"center" }}>
                <div style={{ fontSize:36,marginBottom:12 }}>📭</div>
                <div style={{ color:"#6E7681",fontSize:15 }}>Zayafkalar yo'q</div>
                <div style={{ color:"#30363D",fontSize:13,marginTop:4 }}>Backend ishlamayotgan bo'lishi mumkin</div>
              </div>
            ) : submissions.map(sub => (
              <div
                key={sub.id}
                onClick={() => openDetail(sub)}
                style={{
                  padding:"14px 12px",
                  borderBottom:"1px solid #21262D",
                  cursor:"pointer",
                  background: selected?.id===sub.id ? "#1C2128" : "transparent",
                  transition:"background .15s",
                  display:"flex",gap:10,alignItems:"flex-start",
                  WebkitTapHighlightColor:"transparent",
                }}
                onMouseEnter={e=>{ if(selected?.id!==sub.id)(e.currentTarget as HTMLElement).style.background="#161B22"; }}
                onMouseLeave={e=>{ if(selected?.id!==sub.id)(e.currentTarget as HTMLElement).style.background="transparent"; }}
              >
                {/* Unread dot */}
                <div style={{ width:8,height:8,borderRadius:"50%",background:sub.is_read?"transparent":"#1B45D4",flexShrink:0,marginTop:6 }}/>

                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4 }}>
                    <span style={{ fontWeight:700,fontSize:"clamp(13px,3.5vw,14px)",color:"#E6EDF3",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{sub.name}</span>
                    {sub.company && <span style={{ fontSize:11,color:"#6E7681",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{sub.company}</span>}
                  </div>
                  <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                    <span style={{ fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:`${SERVICE_COLORS[sub.service]}18`,color:SERVICE_COLORS[sub.service] }}>
                      {SERVICE_LABELS[sub.service]}
                    </span>
                    <span style={{ fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:`${STATUS_COLORS[sub.status]}18`,color:STATUS_COLORS[sub.status] }}>
                      {STATUS_LABELS[sub.status]}
                    </span>
                    {sub.budget && <span style={{ fontSize:10,color:"#6E7681" }}>{sub.budget}</span>}
                  </div>
                </div>

                <div style={{ fontSize:11,color:"#6E7681",whiteSpace:"nowrap",flexShrink:0 }}>
                  {new Date(sub.created_at).toLocaleDateString("uz-UZ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel / Mobile overlay: detail ─────────── */}
        {selected && (
          <div style={isMobile ? {
            // Mobile: full-screen fixed overlay
            position:"fixed",
            inset:0,
            top:56, // below topbar
            background:"#0D1117",
            zIndex:50,
            overflowY:"auto",
            padding:"0 0 80px",
          } : {
            // Desktop: right panel
            flex:1,
            overflowY:"auto",
            minWidth:0,
          }}>

            {/* Header */}
            <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"20px 16px 0",gap:12 }}>
              <div style={{ minWidth:0 }}>
                {isMobile && (
                  <button onClick={closeDetail} style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#8B949E",background:"none",border:"none",cursor:"pointer",padding:"0 0 12px",fontFamily:"inherit" }}>
                    ← Orqaga
                  </button>
                )}
                <h2 style={{ fontSize:"clamp(18px,5vw,22px)",fontWeight:900,color:"#E6EDF3",marginBottom:4,wordBreak:"break-word" }}>{selected.name}</h2>
                <p style={{ fontSize:13,color:"#8B949E",wordBreak:"break-all" }}>{selected.email}{selected.phone && ` · ${selected.phone}`}</p>
                {selected.company && <p style={{ fontSize:13,color:"#8B949E" }}>{selected.company}</p>}
              </div>
              {!isMobile && (
                <button onClick={closeDetail} style={{ fontSize:20,color:"#6E7681",background:"none",border:"none",cursor:"pointer",flexShrink:0,lineHeight:1 }}>✕</button>
              )}
            </div>

            <div style={{ padding:"16px" }}>

              {/* Badges */}
              <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:20 }}>
                <span style={{ fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,background:`${SERVICE_COLORS[selected.service]}18`,color:SERVICE_COLORS[selected.service],border:`1px solid ${SERVICE_COLORS[selected.service]}30` }}>
                  {SERVICE_LABELS[selected.service]}
                </span>
                {selected.budget && (
                  <span style={{ fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,background:"#21262D",color:"#8B949E",border:"1px solid #30363D" }}>
                    {selected.budget}
                  </span>
                )}
                <span style={{ fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,background:`${STATUS_COLORS[selected.status]}18`,color:STATUS_COLORS[selected.status],border:`1px solid ${STATUS_COLORS[selected.status]}30` }}>
                  {STATUS_LABELS[selected.status]}
                </span>
                <span style={{ fontSize:11,color:"#6E7681",padding:"4px 10px",background:"#161B22",borderRadius:20,border:"1px solid #30363D" }}>
                  {new Date(selected.created_at).toLocaleString("uz-UZ")}
                </span>
              </div>

              {/* Message */}
              {selected.message && (
                <div style={{ background:"#161B22",border:"1px solid #30363D",borderRadius:14,padding:"16px",marginBottom:16 }}>
                  <div style={{ fontSize:11,fontWeight:700,color:"#6E7681",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10 }}>Xabar</div>
                  <p style={{ fontSize:14,color:"#C9D1D9",lineHeight:1.75,wordBreak:"break-word" }}>{selected.message}</p>
                </div>
              )}

              {/* Status actions */}
              <div style={{ background:"#161B22",border:"1px solid #30363D",borderRadius:14,padding:"16px",marginBottom:16 }}>
                <div style={{ fontSize:11,fontWeight:700,color:"#6E7681",letterSpacing:".08em",textTransform:"uppercase",marginBottom:12 }}>Holat</div>
                <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:14 }}>
                  {(["new","in_progress","closed"] as const).map(s=>(
                    <button key={s} onClick={()=>patch(selected.id,{status:s})} style={{
                      padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",
                      background:selected.status===s?`${STATUS_COLORS[s]}22`:"#21262D",
                      color:selected.status===s?STATUS_COLORS[s]:"#8B949E",
                      border:`1.5px solid ${selected.status===s?STATUS_COLORS[s]:"#30363D"}`,
                      transition:"all .15s",fontFamily:"inherit",
                    }}>{STATUS_LABELS[s]}</button>
                  ))}
                  <button onClick={()=>patch(selected.id,{is_read:!selected.is_read})} style={{
                    padding:"8px 14px",borderRadius:10,fontSize:12,fontWeight:700,
                    cursor:"pointer",background:"#21262D",fontFamily:"inherit",
                    color:selected.is_read?"#6E7681":"#1B45D4",
                    border:`1.5px solid ${selected.is_read?"#30363D":"#1B45D4"}`,
                  }}>{selected.is_read?"✓ O'qildi":"O'qilmagan"}</button>
                </div>

                {/* Note */}
                <div>
                  <label style={{ fontSize:11,fontWeight:700,color:"#6E7681",letterSpacing:".08em",textTransform:"uppercase",display:"block",marginBottom:8 }}>Admin eslatmasi</label>
                  <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3}
                    placeholder="Bu yerga eslatma yozing..."
                    style={{ width:"100%",padding:"12px 14px",borderRadius:10,background:"#0D1117",border:"1px solid #30363D",color:"#C9D1D9",fontSize:13,fontFamily:"inherit",resize:"vertical",outline:"none",boxSizing:"border-box" }}
                    onFocus={e=>e.target.style.borderColor="#1B45D4"}
                    onBlur={e=>e.target.style.borderColor="#30363D"}
                  />
                  <button onClick={()=>patch(selected.id,{note})} disabled={saving} style={{
                    marginTop:8,padding:"9px 18px",borderRadius:8,fontSize:13,fontWeight:700,
                    background:"#1B45D4",color:"#fff",border:"none",cursor:"pointer",
                    opacity:saving?0.7:1,fontFamily:"inherit",
                  }}>{saving?"Saqlanmoqda...":"Saqlash"}</button>
                </div>
              </div>

              {/* Contact links */}
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:16 }}>
                <a href={`mailto:${selected.email}`}
                  style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,background:"#161B22",border:"1px solid #30363D",color:"#C9D1D9",fontSize:13,fontWeight:600,textDecoration:"none" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor="#1B45D4"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor="#30363D"}
                >✉ Email</a>
                {selected.phone && (
                  <a href={`tel:${selected.phone}`}
                    style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,background:"#161B22",border:"1px solid #30363D",color:"#C9D1D9",fontSize:13,fontWeight:600,textDecoration:"none" }}
                  >📞 Qo'ng'iroq</a>
                )}
                {selected.phone && (
                  <a href={`https://t.me/${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                    style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,background:"#161B22",border:"1px solid #30363D",color:"#229ED9",fontSize:13,fontWeight:600,textDecoration:"none" }}
                  >✈ Telegram</a>
                )}
              </div>

              {/* Delete */}
              <button onClick={()=>del(selected.id)} style={{
                width:"100%",padding:"12px",borderRadius:10,background:"transparent",
                border:"1px solid #F85149",color:"#F85149",fontSize:13,fontWeight:600,
                cursor:"pointer",fontFamily:"inherit",transition:"background .15s",
              }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(248,81,73,0.08)"}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="transparent"}
              >🗑 Zayafkani o'chirish</button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const selStyle: React.CSSProperties = {
  padding:"6px 10px",borderRadius:8,background:"#21262D",
  border:"1px solid #30363D",color:"#C9D1D9",fontSize:12,
  fontFamily:"inherit",cursor:"pointer",outline:"none",
};

const btnStyle: React.CSSProperties = {
  fontSize:13,fontWeight:600,padding:"6px 12px",borderRadius:8,
  background:"#21262D",border:"1px solid #30363D",
  cursor:"pointer",fontFamily:"inherit",color:"#C9D1D9",
  whiteSpace:"nowrap",
};
