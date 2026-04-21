import { useApp } from '../context/AppContext';
import { languages } from '../i18n/translations';

function Row({ icon, label, sub, right }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', borderBottom:'1px solid var(--border)' }}>
      <div><div style={{ fontSize:14, fontWeight:500, color:'var(--text1)' }}>{icon} {label}</div>{sub&&<div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>{sub}</div>}</div>
      {right}
    </div>
  );
}

export default function Settings({ onNavigate }) {
  const { lang, setLang, theme, toggleTheme, permissions, setPermissions, user, role, logout, tr } = useApp();

  const togglePerm = (key) => setPermissions(p => ({ ...p, [key]: !p[key] }));

  const doLogout = () => { logout(); onNavigate('onboarding'); };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate(role==='farmer'?'farmer-home':'customer-home')}>←</button>
        <div className="topbar-title">Settings</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:20, paddingBottom:40 }}>
        {/* Profile card */}
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:16, background:'var(--green-light)', borderRadius:'var(--radius)', marginBottom:24, border:'1px solid var(--green-border)' }}>
          <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:20, fontWeight:800, flexShrink:0 }}>{(user?.name||'U').slice(0,2).toUpperCase()}</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:'var(--text1)' }}>{user?.name || 'Guest User'}</div>
            <div style={{ fontSize:13, color:'var(--green-dark)' }}>+91 {user?.phone || '98765 43210'}</div>
            <div style={{ fontSize:12, color:'var(--text3)' }}>{role === 'farmer' ? '👨‍🌾 Farmer' : '🛒 Customer'}</div>
          </div>
        </div>

        {/* Language */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Language</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {languages.map(l => (
              <div key={l.code} onClick={()=>setLang(l.code)}
                style={{ border:`2px solid ${lang===l.code?'var(--green)':'var(--border)'}`, borderRadius:'var(--radius-sm)', padding:'12px 10px', textAlign:'center', cursor:'pointer', background:lang===l.code?'var(--green-light)':'var(--bg2)', transition:'all 0.2s' }}>
                <div style={{ fontSize:16, fontWeight:700, color:'var(--text1)' }}>{l.native}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{l.en}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Appearance</div>
          <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'0 16px' }}>
            <Row icon="🌙" label="Dark Theme" sub="Default is light mode"
              right={<div className={`toggle${theme==='dark'?' on':''}`} onClick={toggleTheme} />} />
          </div>
        </div>

        {/* Permissions */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Permissions</div>
          <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'0 16px' }}>
            {[['📍','Location','Nearby farmers & weather','location'],['🔔','Notifications','Order updates & offers','notif'],['📷','Camera','Upload crop/product photos','camera'],['🎙️','Microphone','Voice assistant','mic']].map(([ic,la,su,k])=>(
              <Row key={k} icon={ic} label={la} sub={su} right={<div className={`toggle${permissions[k]?' on':''}`} onClick={()=>togglePerm(k)} />} />
            ))}
          </div>
        </div>

        {/* Tutorial */}
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Tutorial</div>
          <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16 }}>
            <div style={{ fontSize:13, color:'var(--text2)', marginBottom:12 }}>Watch how Harvest Hub works</div>
            <div style={{ display:'flex', gap:10 }}>
              <button className="btn btn-secondary" onClick={()=>onNavigate('tutorial')} style={{ flex:1, fontSize:12, padding:10 }}>🛒 Customer Guide</button>
              <button className="btn btn-secondary" onClick={()=>onNavigate('tutorial')} style={{ flex:1, fontSize:12, padding:10 }}>👨‍🌾 Farmer Guide</button>
            </div>
          </div>
        </div>

        {/* Account */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:12 }}>Account</div>
          <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'0 16px' }}>
            <Row icon="💬" label="Help & Support" sub="Chat with us" right={<span style={{ color:'var(--text3)' }}>→</span>} />
            <Row icon="ℹ️" label="About Harvest Hub" sub="Version 1.0.0" right={<span style={{ color:'var(--text3)' }}>→</span>} />
            <div onClick={doLogout} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 0', cursor:'pointer' }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--red)' }}>🚪 Logout</div>
              <span style={{ color:'var(--red)' }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
