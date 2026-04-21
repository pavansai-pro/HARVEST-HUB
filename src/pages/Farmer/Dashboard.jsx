import { useApp } from '../../context/AppContext';
import { weatherData, marketPrices } from '../../data/products';
import VoiceAssistant from '../../components/VoiceAssistant';

const statusPill = { transit:{bg:'var(--blue-light)',c:'var(--blue)',t:'In Transit'}, preparing:{bg:'var(--amber-light)',c:'var(--amber)',t:'Preparing'}, delivered:{bg:'var(--green-light)',c:'var(--green-dark)',t:'Delivered'} };

export default function FarmerHome({ onNavigate }) {
  const { user, tr, globalOrders } = useApp();

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg2)', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex',alignItems:'center',gap:12,padding:'14px 20px',background:'var(--bg)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:50 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, color:'var(--text3)' }}>Farmer Dashboard</div>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--text1)' }}>{user?.name || 'Ramu Naik'} 👨‍🌾</div>
        </div>
        <div onClick={()=>onNavigate('settings')} style={{ fontSize:11,padding:'5px 10px',background:'var(--green-light)',color:'var(--green-dark)',borderRadius:100,cursor:'pointer',fontWeight:700 }}>🌐</div>
        <div style={{ position:'relative',cursor:'pointer' }} onClick={()=>onNavigate('farmer-orders')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          <div style={{ position:'absolute',top:-6,right:-6,background:'var(--red)',color:'#fff',borderRadius:'50%',width:18,height:18,fontSize:10,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>3</div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:16, paddingBottom:90 }}>
        <VoiceAssistant onNavigate={(dest)=>{
          if(dest==='cart') onNavigate('cart');
          else if(dest==='tracking') onNavigate('tracking');
          else if(dest==='farmer-add') onNavigate('farmer-add');
          else if(dest==='farmer-orders') onNavigate('farmer-orders');
          else if(dest==='settings') onNavigate('settings');
        }} />

        {/* Metrics */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
          {[
            { label:'Land', val:'12 ac', sub:'Medak, Telangana', color:'var(--text1)' },
            { label:'This Month', val:'₹18,420', sub:'+12% vs last month', color:'var(--green-dark)' },
            { label:'Total Orders', val:'47', sub:'3 pending today', color:'var(--text1)' },
            { label:'Rating', val:'4.8 ★', sub:'98 customer reviews', color:'var(--amber)' },
          ].map(m => (
            <div key={m.label} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:14, boxShadow:'var(--shadow)' }}>
              <div style={{ fontSize:11, color:'var(--text3)', marginBottom:4 }}>{m.label}</div>
              <div style={{ fontSize:22, fontWeight:800, color:m.color }}>{m.val}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Weather */}
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:10 }}>🌦️ 5-Day Weather — Medak</div>
        <div style={{ display:'flex', gap:10, overflowX:'auto', marginBottom:12, scrollbarWidth:'none', paddingBottom:4 }}>
          {weatherData.map(w => (
            <div key={w.day} style={{ flexShrink:0, background:w.isToday?'var(--green-light)':'var(--bg)', border:`1px solid ${w.isToday?'var(--green-border)':'var(--border)'}`, borderRadius:'var(--radius-sm)', padding:'12px 14px', textAlign:'center', minWidth:72, boxShadow:'var(--shadow)' }}>
              <div style={{ fontSize:11, color:'var(--text3)', marginBottom:4 }}>{w.day}</div>
              <div style={{ fontSize:26, marginBottom:4 }}>{w.icon}</div>
              <div style={{ fontSize:14, fontWeight:800, color:'var(--text1)' }}>{w.temp}°C</div>
              <div style={{ fontSize:10, color:'var(--blue)', marginTop:2 }}>💧 {w.rain}mm</div>
            </div>
          ))}
        </div>
        <div style={{ background:'var(--amber-light)', borderRadius:'var(--radius-sm)', padding:'10px 14px', marginBottom:16, fontSize:12, color:'var(--amber)', fontWeight:500 }}>
          ⚠️ Heavy rain expected Wednesday. Consider early harvest for tomatoes & green chillies.
        </div>

        {/* Market Prices */}
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:10 }}>📊 Market Prices Today</div>
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, marginBottom:16, boxShadow:'var(--shadow)' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>{['Crop','Season','Mandi Price','Trend'].map(h=><th key={h} style={{ fontSize:10, fontWeight:700, color:'var(--text3)', textAlign:'left', padding:'0 6px 10px', textTransform:'uppercase', letterSpacing:'0.04em', borderBottom:'1px solid var(--border)' }}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {marketPrices.map(p => (
                <tr key={p.crop}>
                  <td style={{ padding:'10px 6px', fontSize:13, color:'var(--text1)', borderBottom:'1px solid var(--border)' }}>{p.crop}</td>
                  <td style={{ padding:'10px 6px', borderBottom:'1px solid var(--border)' }}><span style={{ padding:'2px 8px', borderRadius:100, background:p.season==='Kharif'?'var(--green-light)':'var(--amber-light)', color:p.season==='Kharif'?'var(--green-dark)':'var(--amber)', fontSize:10, fontWeight:600 }}>{p.season}</span></td>
                  <td style={{ padding:'10px 6px', fontSize:12, color:'var(--text1)', fontWeight:600, borderBottom:'1px solid var(--border)' }}>{p.price}</td>
                  <td style={{ padding:'10px 6px', fontSize:12, fontWeight:700, color:p.up?'var(--green-dark)':'var(--red)', borderBottom:'1px solid var(--border)' }}>{p.up?'↑':'↓'} {p.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:10 }}>📦 Recent Orders</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {globalOrders.slice(0,3).map(o => {
            const s = statusPill[o.status] || statusPill.placed;
            return (
              <div key={o.id} onClick={()=>onNavigate('farmer-orders')} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'12px 14px', cursor:'pointer', boxShadow:'var(--shadow)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:'var(--text1)' }}>#{o.id}</span>
                  <span style={{ padding:'3px 10px', borderRadius:100, background:s.bg, color:s.c, fontSize:11, fontWeight:700 }}>{s.t}</span>
                </div>
                <div style={{ fontSize:12, color:'var(--text2)' }}>{o.customer} — {o.items}</div>
                <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
                  <span style={{ fontSize:11, color:'var(--text3)' }}>{o.time}</span>
                  <span style={{ fontSize:14, fontWeight:800, color:'var(--green-dark)' }}>₹{o.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bottom-nav">
        <div className="nav-item active"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Home</span></div>
        <div className="nav-item" onClick={()=>onNavigate('farmer-add')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg><span>Add Product</span></div>
        <div className="nav-item" onClick={()=>onNavigate('farmer-orders')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Orders</span></div>
        <div className="nav-item" onClick={()=>onNavigate('settings')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg><span>Settings</span></div>
      </div>
    </div>
  );
}
