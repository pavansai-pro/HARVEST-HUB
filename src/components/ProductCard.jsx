import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products as allProducts, categories } from '../data/products';

export default function ProductCard({ product: p, onNavigate }) {
  const { addToCart, tr } = useApp();
  const [qty, setQty] = useState(p.minQty || 0.25);
  const [added, setAdded] = useState(false);

  const decr = () => setQty(q => Math.max(p.minQty, parseFloat((q - p.step).toFixed(2))));
  const incr = () => setQty(q => Math.min(p.maxQty, parseFloat((q + p.step).toFixed(2))));

  const handleAdd = () => {
    addToCart({ ...p, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const colors = { veg:'linear-gradient(135deg,#EAF3DE,#D4EDBD)', fruit:'linear-gradient(135deg,#FFF0D9,#FFE0B2)', grain:'linear-gradient(135deg,#FFF3E0,#FFE082)', spice:'linear-gradient(135deg,#FCE4EC,#F48FB1)', oil:'linear-gradient(135deg,#F3E5F5,#CE93D8)' };

  return (
    <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden',boxShadow:'var(--shadow)',transition:'transform 0.2s,box-shadow 0.2s'}}>
      <div style={{height:110,display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,position:'relative',background:colors[p.type]||colors.grain}}>
        {p.emoji}
        <div style={{position:'absolute',bottom:6,left:6,background:'rgba(0,0,0,0.45)',color:'#fff',borderRadius:100,fontSize:9,padding:'2px 7px',backdropFilter:'blur(4px)'}}>👨‍🌾 {p.farmerShort}</div>
        <div style={{position:'absolute',top:6,right:6,background:'rgba(255,255,255,0.9)',borderRadius:100,fontSize:10,padding:'2px 6px',fontWeight:600,color:'#854F0B'}}>⭐ {p.rating}</div>
      </div>
      <div style={{padding:'10px 12px'}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--text1)'}}>{p.name}</div>
        <div style={{fontSize:13,fontWeight:700,color:'var(--green-dark)',marginTop:2}}>₹{p.price}/{p.unit}</div>
        <div style={{fontSize:10,color:'var(--text3)',marginTop:1}}>{p.reviews} reviews • {p.season}</div>
        <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8}}>
          <button onClick={decr} style={{width:26,height:26,borderRadius:6,border:'1.5px solid var(--border)',background:'var(--bg2)',fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'var(--text1)'}}>−</button>
          <span style={{fontSize:12,fontWeight:600,color:'var(--text1)',minWidth:40,textAlign:'center'}}>{qty} {p.unit}</span>
          <button onClick={incr} style={{width:26,height:26,borderRadius:6,border:'1.5px solid var(--border)',background:'var(--bg2)',fontSize:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'var(--text1)'}}>+</button>
          <button onClick={handleAdd} style={{marginLeft:'auto',background:added?'var(--green-dark)':'var(--green)',color:'#fff',border:'none',borderRadius:6,padding:'5px 12px',fontSize:11,fontWeight:700,cursor:'pointer',transition:'background 0.2s'}}>
            {added ? '✓ Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
