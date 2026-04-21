import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const steps = {
  customer: [
    { n:1, t:'Browse Products', d:'Search and explore fresh produce by category, season & location.' },
    { n:2, t:'Select Weight', d:'Choose quantity from 0.25 kg to 10 kg in precise steps.' },
    { n:3, t:'Pay & Confirm', d:'UPI, Card or Cash on Delivery. No GST, no fees.' },
    { n:4, t:'Track Live', d:'Real-time delivery tracking on map. ETA: 45 min–1.5 hrs.' },
  ],
  farmer: [
    { n:1, t:'Register Your Farm', d:'Add land details, crop types, and location.' },
    { n:2, t:'List Your Produce', d:'Use voice or camera to add products with pricing.' },
    { n:3, t:'Accept Orders', d:'Get instant notifications when customers order.' },
    { n:4, t:'Track Earnings', d:'See weather, market prices, and business analytics.' },
  ],
};

export default function Tutorial({ onNavigate }) {
  const { role } = useApp();
  const [tab, setTab] = useState(role === 'farmer' ? 'farmer' : 'customer');
  const list = steps[tab];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button onClick={()=>onNavigate('permissions')} className="back-btn">←</button>
        <div className="topbar-title">How It Works</div>
      </div>
      <div style={{ flex:1, padding:'24px 24px 40px', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', gap:8, marginBottom:24 }}>
          {['customer','farmer'].map(t=> (
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1, padding:10, borderRadius:'var(--radius-sm)', border:`2px solid ${tab===t?'var(--green)':'var(--border)'}`, background:tab===t?'var(--green-light)':'var(--bg2)', fontSize:13, fontWeight:700, color:tab===t?'var(--green-dark)':'var(--text2)', cursor:'pointer', textTransform:'capitalize' }}>
              {t === 'customer' ? '🛒 For Customers' : '👨‍🌾 For Farmers'}
            </button>
          ))}
        </div>
        <div style={{ borderRadius:'var(--radius)', overflow:'hidden', background:tab==='customer'?'linear-gradient(145deg,#0D5C3A,#1D9E75)':'linear-gradient(145deg,#2D5016,#4CAF50)', height:200, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, marginBottom:24, color:'#fff', cursor:'pointer' }} onClick={()=>alert('Tutorial video would play here')}>
          <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28 }}>▶</div>
          <div style={{ fontSize:15, fontWeight:700 }}>{tab === 'customer' ? 'Customer' : 'Farmer'} Guide Video</div>
          <div style={{ fontSize:12, opacity:0.8 }}>Tap to watch</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16, flex:1 }}>
          {list.map(s => (
            <div key={s.n} style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--green)', color:'#fff', fontSize:13, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)' }}>{s.t}</div>
                <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={()=>onNavigate('login')} style={{ marginTop:24 }}>Get Started →</button>
      </div>
    </div>
  );
}
