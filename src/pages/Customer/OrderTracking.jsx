import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';

const steps = ['Placed','Packed','Picked Up','In Transit','Delivered'];
const currentStep = 2;

export default function OrderTracking({ onNavigate }) {
  const { tr } = useApp();
  const [truckPos, setTruckPos] = useState(38);

  useEffect(() => {
    const timer = setInterval(() => {
      setTruckPos(p => { const n = p + 0.15; return n > 75 ? 22 : n; });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate('customer-home')}>←</button>
        <div className="topbar-title">Order Tracking</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:16, paddingBottom:32 }}>
        {/* Order ID card */}
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'14px 16px', marginBottom:16, display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'var(--shadow)' }}>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:'var(--text1)' }}>#HH-20481</div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:2 }}>3.2kg Tomatoes + 1kg Moong Dal</div>
          </div>
          <span style={{ padding:'4px 12px', borderRadius:100, background:'var(--blue-light)', color:'var(--blue)', fontSize:11, fontWeight:700 }}>In Transit</span>
        </div>

        {/* Step tracker */}
        <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:16 }}>🔴 Live Tracking</div>
        <div style={{ position:'relative', display:'flex', justifyContent:'space-between', marginBottom:28 }}>
          <div style={{ position:'absolute', top:16, left:0, right:0, height:3, background:'var(--border)', zIndex:0 }} />
          <div style={{ position:'absolute', top:16, left:0, height:3, background:'var(--green)', zIndex:1, transition:'width 1s', width:`${(currentStep/(steps.length-1))*100}%` }} />
          {steps.map((s,i) => (
            <div key={s} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, zIndex:2, flex:1 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', border:`3px solid ${i<currentStep?'var(--green)':i===currentStep?'var(--blue)':'var(--border)'}`, background:i<currentStep?'var(--green)':i===currentStep?'var(--blue-light)':'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:i<currentStep?'#fff':i===currentStep?'var(--blue)':'var(--text3)', transition:'all 0.5s' }}>
                {i < currentStep ? '✓' : i === currentStep ? '🚚' : i+1}
              </div>
              <div style={{ fontSize:9, fontWeight:600, color:i<=currentStep?'var(--text1)':'var(--text3)', textAlign:'center', lineHeight:1.2 }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div style={{ height:200, borderRadius:'var(--radius)', border:'1px solid var(--border)', background:'linear-gradient(145deg,#C8E6C9,#A5D6A7)', position:'relative', overflow:'hidden', marginBottom:16 }}>
          {/* Roads */}
          <div style={{ position:'absolute', top:'50%', left:0, right:0, height:5, background:'rgba(255,255,255,0.6)', transform:'translateY(-50%)' }} />
          <div style={{ position:'absolute', left:'30%', top:0, bottom:0, width:3, background:'rgba(255,255,255,0.4)' }} />
          <div style={{ position:'absolute', left:'70%', top:0, bottom:0, width:3, background:'rgba(255,255,255,0.4)' }} />
          {/* Origin */}
          <div style={{ position:'absolute', left:'8%', top:'50%', transform:'translateY(-50%)' }}>
            <div style={{ width:14, height:14, borderRadius:'50%', background:'var(--green)', border:'3px solid #fff', boxShadow:'0 2px 6px rgba(0,0,0,0.2)' }} />
            <div style={{ fontSize:9, fontWeight:700, color:'#0D5C3A', whiteSpace:'nowrap', marginTop:4 }}>Medak Farm</div>
          </div>
          {/* Truck (animated) */}
          <div style={{ position:'absolute', top:'50%', left:`${truckPos}%`, transform:'translateY(-60%)', fontSize:22, zIndex:5, filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.3))', transition:'left 0.1s linear' }}>🚚</div>
          {/* Destination */}
          <div style={{ position:'absolute', right:'8%', top:'50%', transform:'translateY(-50%)' }}>
            <div style={{ width:14, height:14, borderRadius:'50%', background:'var(--red)', border:'3px solid #fff', boxShadow:'0 2px 6px rgba(0,0,0,0.2)' }} />
            <div style={{ fontSize:9, fontWeight:700, color:'var(--red)', whiteSpace:'nowrap', marginTop:4 }}>Hyderabad</div>
          </div>
          {/* Live badge */}
          <div style={{ position:'absolute', top:8, right:10, background:'var(--blue-light)', color:'var(--blue)', fontSize:10, padding:'3px 8px', borderRadius:100, fontWeight:700 }}>🔴 LIVE</div>
          <div style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', fontSize:9, color:'#0D5C3A', fontWeight:700 }}>Sangareddy (Current)</div>
        </div>

        {/* ETA */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--blue-light)', borderRadius:'var(--radius-sm)', padding:'12px 16px', marginBottom:16 }}>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--blue)' }}>📍 Currently in Sangareddy</div>
            <div style={{ fontSize:11, color:'var(--blue)', opacity:0.75, marginTop:2 }}>Departed farm at 7:45 AM</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:11, color:'var(--blue)' }}>ETA</div>
            <div style={{ fontSize:18, fontWeight:800, color:'var(--blue)' }}>45–90 min</div>
          </div>
        </div>

        {/* Order details */}
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, boxShadow:'var(--shadow)' }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:12 }}>🧾 Order Summary</div>
          {[['3.2 kg Tomatoes','₹90'],['1 kg Moong Dal','₹95']].map(([l,v])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:6 }}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div style={{ height:1, background:'var(--border)', margin:'10px 0' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:4 }}>
            <span>Delivery</span><span style={{ color:'var(--red)', fontWeight:700 }}>₹30</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, fontWeight:800 }}>
            <span>Total</span><span style={{ color:'var(--green-dark)' }}>₹215</span>
          </div>
          <div style={{ fontSize:11, color:'var(--text3)', marginTop:8 }}>No GST • No platform fees • Paid via UPI</div>
        </div>
      </div>
    </div>
  );
}
