import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import VoiceAssistant from '../../components/VoiceAssistant';

export default function CustomerHome({ onNavigate }) {
  const { tr, user, cart, lang, globalProducts } = useApp();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = globalProducts.filter(p => {
    const matchCat = activeCat === 'all' || p.cat === activeCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleVoiceNav = (dest) => {
    if (dest === 'cart') onNavigate('cart');
    else if (dest === 'tracking') onNavigate('tracking');
    else if (dest === 'settings') onNavigate('settings');
    else if (dest === 'home') { setSearch(''); setActiveCat('all'); }
  };

  const handleVoiceFilter = (cmd) => {
    if (cmd.startsWith('search:')) { setSearch(cmd.slice(7)); setActiveCat('all'); }
    else { setActiveCat(cmd); setSearch(''); }
  };

  const cartCount = cart.length;
  const name = user?.name?.split(' ')[0] || 'there';

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg2)', display:'flex', flexDirection:'column' }}>
      {/* Topbar */}
      <div style={{ display:'flex',alignItems:'center',gap:12,padding:'14px 20px',background:'var(--bg)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:50 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:12, color:'var(--text3)' }}>Good morning 🌞</div>
          <div style={{ fontSize:16, fontWeight:700, color:'var(--text1)' }}>{name}</div>
        </div>
        <div onClick={()=>onNavigate('settings')} style={{ fontSize:11,padding:'5px 10px',background:'var(--green-light)',color:'var(--green-dark)',borderRadius:100,cursor:'pointer',fontWeight:700 }}>🌐</div>
        <div style={{ position:'relative', cursor:'pointer' }} onClick={()=>onNavigate('cart')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          {cartCount > 0 && <div style={{ position:'absolute',top:-6,right:-6,background:'var(--red)',color:'#fff',borderRadius:'50%',width:18,height:18,fontSize:10,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center' }}>{cartCount}</div>}
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', paddingBottom:80 }}>
        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,var(--green),#2DD4BF)', padding:'20px 20px', margin:16, borderRadius:16, color:'#fff', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:-20, top:-20, fontSize:100, opacity:0.15 }}>🌾</div>
          <div style={{ fontSize:13, opacity:0.85 }}>April Harvest Season</div>
          <div style={{ fontSize:18, fontWeight:800, marginTop:4, lineHeight:1.3 }}>Fresh produce from farms near you!</div>
          <div style={{ fontSize:12, opacity:0.75, marginTop:6 }}>No middlemen • No GST • No platform fees</div>
        </div>

        {/* Voice */}
        <div style={{ padding:'0 16px' }}>
          <VoiceAssistant onNavigate={handleVoiceNav} onFilter={handleVoiceFilter} />
        </div>

        {/* Search */}
        <div style={{ margin:'0 16px 16px', position:'relative' }}>
          <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', fontSize:18, color:'var(--text3)' }}>🔍</div>
          <input style={{ width:'100%', padding:'13px 16px 13px 44px', borderRadius:'var(--radius)', border:'1.5px solid var(--border)', background:'var(--bg)', color:'var(--text1)', fontFamily:'var(--font)', fontSize:14, outline:'none', boxShadow:'var(--shadow)' }}
            type="text" placeholder="Explore products — rice, vegetables, fruits, pulses..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>

        {/* Categories */}
        <div style={{ display:'flex', gap:8, padding:'0 16px', overflowX:'auto', marginBottom:16, scrollbarWidth:'none' }}>
          {categories.map(c => (
            <div key={c.id} onClick={()=>{ setActiveCat(c.id); setSearch(''); }}
              style={{ flexShrink:0, padding:'8px 14px', borderRadius:100, fontSize:12, fontWeight:600, cursor:'pointer', border:`1.5px solid ${activeCat===c.id?'var(--green)':'var(--border)'}`, background:activeCat===c.id?'var(--green)':'var(--bg)', color:activeCat===c.id?'#fff':'var(--text2)', transition:'all 0.2s' }}>
              {c.emoji} {c.label}
            </div>
          ))}
        </div>

        {/* Delivery banner */}
        <div style={{ margin:'0 16px 20px', background:'var(--green-light)', border:'1px solid var(--green-border)', borderRadius:'var(--radius-sm)', padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:12, color:'var(--green-dark)', fontWeight:600 }}>Delivery Charges</div>
            <div style={{ fontSize:11, color:'var(--text3)' }}>Order ₹199 or above</div>
          </div>
          <div style={{ fontSize:13, fontWeight:700, color:'var(--green-dark)' }}>🎉 Free Delivery</div>
        </div>

        {/* Products */}
        <div style={{ padding:'0 16px', marginBottom:8 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:12 }}>
            {search ? `Results for "${search}"` : activeCat === 'all' ? 'In Season — April 🌞' : categories.find(c=>c.id===activeCat)?.label}
            <span style={{ marginLeft:8, color:'var(--green)', fontWeight:600 }}>({filtered.length})</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 20px' }}>
            <div style={{ fontSize:56, marginBottom:12 }}>🌾</div>
            <div style={{ fontSize:16, fontWeight:700, color:'var(--text2)' }}>No products found</div>
            <div style={{ fontSize:13, color:'var(--text3)', marginTop:6 }}>Try a different search term</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, padding:'0 16px' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} onNavigate={onNavigate} />)}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Home</span>
        </div>
        <div className="nav-item" onClick={()=>onNavigate('cart')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
        </div>
        <div className="nav-item" onClick={()=>onNavigate('tracking')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Track Order</span>
        </div>
        <div className="nav-item" onClick={()=>onNavigate('settings')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
