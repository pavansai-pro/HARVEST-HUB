import { useState } from 'react';
import { states } from '../../data/products';
import VoiceAssistant from '../../components/VoiceAssistant';
import { useApp } from '../../context/AppContext';

export default function AddProduct({ onNavigate }) {
  const { tr, user, addNewProduct } = useApp();
  const [form, setForm] = useState({ name:'', cat:'Vegetables', price:'', stock:100, season:'Kharif' });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const categoryMapping = {
    'Vegetables': 'veg',
    'Fruits': 'fruit',
    'Rice & Millets': 'rice',
    'Pulses': 'pulse',
    'Spices': 'spice',
    'Oilseeds': 'oil',
    'Seeds': 'seed'
  };

  const submit = () => {
    if (!form.name || !form.price) { alert('Please fill product name and price'); return; }
    
    // Convert to global product schema
    const newProduct = {
      name: form.name,
      emoji: '🌾', // Default emoji since we don't have an AI emoji generator yet
      cat: categoryMapping[form.cat] || 'veg',
      type: categoryMapping[form.cat] === 'fruit' || categoryMapping[form.cat] === 'veg' ? categoryMapping[form.cat] : 'grain',
      price: Number(form.price),
      unit: 'kg',
      farmer: user?.name ? `${user.name} Farms, Telangana` : 'Ramu Farms, Medak',
      farmerShort: user?.name ? `${user.name} Farms` : 'Ramu Farms',
      season: form.season,
      qty: 1,
      minQty: 0.5,
      maxQty: form.stock,
      step: 0.5
    };
    
    addNewProduct(newProduct);
    
    setSaved(true);
    setTimeout(() => { setSaved(false); onNavigate('farmer-home'); }, 1400);
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate('farmer-home')}>←</button>
        <div className="topbar-title">Add Product</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:20, paddingBottom:100 }}>
        <VoiceAssistant onNavigate={(d)=>d==='farmer-home'&&onNavigate('farmer-home')} />

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:6, display:'block' }}>Product Name *</label>
          <input className="input" placeholder="e.g. Tomatoes, Alphonso Mango, Basmati Rice" value={form.name} onChange={e=>set('name',e.target.value)} />
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:6, display:'block' }}>Category</label>
          <select className="input" value={form.cat} onChange={e=>set('cat',e.target.value)}>
            {['Vegetables','Fruits','Rice & Millets','Pulses','Spices','Oilseeds','Seeds'].map(c=><option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:6, display:'block' }}>Price per kg (₹) *</label>
          <input className="input" type="number" placeholder="28" min="1" value={form.price} onChange={e=>set('price',e.target.value)} />
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:6, display:'block' }}>Available Stock: {form.stock} kg</label>
          <input type="range" min="1" max="1000" step="1" value={form.stock} onChange={e=>set('stock',+e.target.value)} style={{ width:'100%', accentColor:'var(--green)' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text3)', marginTop:4 }}><span>1 kg</span><span>1000 kg</span></div>
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:8, display:'block' }}>Season</label>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {['Kharif','Rabi','Summer','Year-round'].map(s=>(
              <div key={s} onClick={()=>set('season',s)} style={{ padding:'8px 16px', borderRadius:100, border:`1.5px solid ${form.season===s?'var(--green)':'var(--border)'}`, background:form.season===s?'var(--green-light)':'var(--bg2)', color:form.season===s?'var(--green-dark)':'var(--text2)', fontSize:12, fontWeight:600, cursor:'pointer' }}>{s}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:13, fontWeight:600, color:'var(--text2)', marginBottom:8, display:'block' }}>Product Photo</label>
          <div onClick={()=>alert('Camera/gallery would open here')} style={{ border:'2px dashed var(--border)', borderRadius:'var(--radius)', padding:'32px 20px', textAlign:'center', cursor:'pointer', background:'var(--bg2)' }}>
            <div style={{ fontSize:40, marginBottom:8 }}>📷</div>
            <div style={{ fontSize:13, color:'var(--text2)', fontWeight:500 }}>Tap to take photo or upload from gallery</div>
            <div style={{ fontSize:11, color:'var(--text3)', marginTop:4 }}>Camera permission required</div>
          </div>
        </div>

        {saved ? (
          <div style={{ textAlign:'center', padding:16, background:'var(--green-light)', borderRadius:'var(--radius)', color:'var(--green-dark)', fontWeight:700, fontSize:15 }}>✅ Product listed successfully!</div>
        ) : (
          <button className="btn btn-primary" onClick={submit}>List Product →</button>
        )}
      </div>
    </div>
  );
}
