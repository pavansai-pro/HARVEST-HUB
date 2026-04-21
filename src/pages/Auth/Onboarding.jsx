import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { languages } from '../../i18n/translations';

export default function Onboarding({ onNavigate }) {
  const { tr, role, setRole, lang, setLang } = useApp();
  const [step, setStep] = useState('splash');

  useEffect(() => {
    const t = setTimeout(() => setStep('role'), 3000);
    return () => clearTimeout(t);
  }, []);

  if (step === 'splash') return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(145deg,#0D5C3A,#1D9E75,#2DD4BF)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.06)', top:-100, right:-80 }} />
      <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)', bottom:-60, left:-60 }} />
      <div style={{ fontSize:90, animation:'pop 0.6s ease-out', zIndex:1 }}>🌾</div>
      <div style={{ fontSize:36, fontWeight:800, color:'#fff', letterSpacing:'-0.5px', animation:'fadeUp 0.8s ease-out 0.3s both', zIndex:1 }}>Harvest Hub</div>
      <div style={{ fontSize:15, color:'rgba(255,255,255,0.8)', animation:'fadeUp 0.8s ease-out 0.5s both', zIndex:1 }}>Farm to Table — Direct from Farmer</div>
      <div style={{ width:200, height:3, background:'rgba(255,255,255,0.2)', borderRadius:2, marginTop:24, overflow:'hidden', animation:'fadeUp 0.8s ease-out 0.7s both', zIndex:1 }}>
        <div style={{ height:'100%', background:'#fff', borderRadius:2, animation:'load 2.5s ease-in-out forwards', width:0 }} />
      </div>
      <style>{`@keyframes pop{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}@keyframes fadeUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes load{to{width:100%}}`}</style>
    </div>
  );

  if (step === 'lang') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar" style={{ padding:'14px 20px' }}>
        <button onClick={()=>setStep('role')} className="back-btn">←</button>
        <div className="topbar-title">Select Language</div>
      </div>
      <div style={{ padding:'16px 20px', fontSize:14, color:'var(--text2)', marginBottom:4 }}>Choose your preferred language. The app interface will change.</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, padding:'0 20px', flex:1 }}>
        {languages.map(l => (
          <div key={l.code} onClick={() => setLang(l.code)}
            style={{ border:`2px solid ${lang===l.code?'var(--green)':'var(--border)'}`, borderRadius:'var(--radius)', padding:16, textAlign:'center', cursor:'pointer', background:lang===l.code?'var(--green-light)':'var(--bg2)', transition:'all 0.2s' }}>
            <div style={{ fontSize:18, fontWeight:700, color:'var(--text1)' }}>{l.native}</div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>{l.en}</div>
          </div>
        ))}
      </div>
      <div style={{ padding:24 }}>
        <button className="btn btn-primary" onClick={()=>setStep('role')}>Apply Language ✓</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', padding:'40px 24px 32px' }}>
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🌾</div>
        <div style={{ fontSize:28, fontWeight:800, color:'var(--text1)', lineHeight:1.2, marginBottom:10, whiteSpace:'pre-line' }}>{tr('welcome')}</div>
        <div style={{ fontSize:15, color:'var(--text2)', lineHeight:1.6 }}>{tr('welcomeDesc')}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:32 }}>
        {[{r:'customer',e:'🛒',t:tr('imCustomer'),d:'Buy fresh produce directly from farmers'},{r:'farmer',e:'👨‍🌾',t:tr('imFarmer'),d:'Sell your harvest directly to customers'}].map(({r,e,t,d})=>(
          <div key={r} onClick={()=>setRole(r)} style={{ border:`2px solid ${role===r?'var(--green)':'var(--border)'}`, borderRadius:16, padding:'24px 16px', textAlign:'center', cursor:'pointer', background:role===r?'var(--green-light)':'var(--bg2)', transition:'all 0.25s' }}>
            <div style={{ fontSize:44, marginBottom:12 }}>{e}</div>
            <div style={{ fontSize:15, fontWeight:700, color:'var(--text1)' }}>{t}</div>
            <div style={{ fontSize:12, color:'var(--text2)', marginTop:4 }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'auto', display:'flex', flexDirection:'column', gap:10 }}>
        <button className="btn btn-primary" disabled={!role} onClick={()=>onNavigate('permissions')} style={{ opacity:role?1:0.45 }}>{tr('continue')}</button>
        <button className="btn btn-secondary" onClick={()=>setStep('lang')}>🌐 {tr('chooseLanguage')}</button>
      </div>
    </div>
  );
}
