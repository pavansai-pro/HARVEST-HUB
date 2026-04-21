import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const statusPill = { transit:{bg:'var(--blue-light)',c:'var(--blue)',t:'In Transit'}, preparing:{bg:'var(--amber-light)',c:'var(--amber)',t:'Preparing'}, delivered:{bg:'var(--green-light)',c:'var(--green-dark)',t:'Delivered'} };

export default function FarmerOrders({ onNavigate }) {
  const { globalOrders } = useApp();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? globalOrders : globalOrders.filter(o => filter === 'pending' ? o.status !== 'delivered' : o.status === 'delivered');

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg2)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate('farmer-home')}>←</button>
        <div className="topbar-title">Orders</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:16, paddingBottom:90 }}>
        <div style={{ display:'flex', gap:8, marginBottom:16, overflowX:'auto', scrollbarWidth:'none' }}>
          {[['all','All ('+globalOrders.length+')'],['pending','Pending ('+globalOrders.filter(o=>o.status!=='delivered').length+')'],['delivered','Delivered ('+globalOrders.filter(o=>o.status==='delivered').length+')']].map(([v,l])=>(
            <div key={v} onClick={()=>setFilter(v)} style={{ flexShrink:0, padding:'8px 16px', borderRadius:100, border:`1.5px solid ${filter===v?'var(--green)':'var(--border)'}`, background:filter===v?'var(--green)':'var(--bg)', color:filter===v?'#fff':'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer' }}>{l}</div>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {filtered.map(o => {
            const s = statusPill[o.status];
            return (
              <div key={o.id} onClick={()=>onNavigate('tracking')} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:14, cursor:'pointer', boxShadow:'var(--shadow)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                  <span style={{ fontSize:14, fontWeight:800, color:'var(--text1)' }}>#{o.id}</span>
                  <span style={{ padding:'4px 12px', borderRadius:100, background:s.bg, color:s.c, fontSize:11, fontWeight:700 }}>{s.t}</span>
                </div>
                <div style={{ fontSize:13, color:'var(--text2)', marginBottom:4 }}>{o.customer} — {o.items}</div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:11, color:'var(--text3)' }}>{o.time}</span>
                  <span style={{ fontSize:16, fontWeight:800, color:'var(--green-dark)' }}>₹{o.amount}</span>
                </div>
                {o.status !== 'delivered' && (
                  <div style={{ marginTop:10, display:'flex', gap:8 }}>
                    <button onClick={e=>{e.stopPropagation();alert('Order accepted!');}} style={{ flex:1, padding:'8px', borderRadius:'var(--radius-sm)', background:'var(--green)', color:'#fff', border:'none', fontSize:12, fontWeight:700, cursor:'pointer' }}>✓ Accept</button>
                    <button onClick={e=>{e.stopPropagation();onNavigate('tracking');}} style={{ flex:1, padding:'8px', borderRadius:'var(--radius-sm)', background:'var(--blue-light)', color:'var(--blue)', border:'none', fontSize:12, fontWeight:700, cursor:'pointer' }}>📍 Track</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom-nav">
        <div className="nav-item" onClick={()=>onNavigate('farmer-home')}><svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Home</span></div>
        <div className="nav-item" onClick={()=>onNavigate('farmer-add')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg><span>Add Product</span></div>
        <div className="nav-item active"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Orders</span></div>
        <div className="nav-item" onClick={()=>onNavigate('settings')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg><span>Settings</span></div>
      </div>
    </div>
  );
}
