import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Checkout({ onNavigate }) {
  const { cart, cartTotal, deliveryFee, orderTotal, placeNewOrder, user } = useApp();
  const [payMethod, setPayMethod] = useState('upi');
  const [placed, setPlaced] = useState(false);

  const placeOrder = () => {
    setPlaced(true);
    setTimeout(() => { placeNewOrder(); onNavigate('tracking'); }, 1500);
  };

  const payOptions = [
    { id:'upi', icon:'📱', label:'UPI', sub:'Google Pay, PhonePe, Paytm, BHIM' },
    { id:'card', icon:'💳', label:'Debit / Credit Card', sub:'Via Razorpay — secure payment' },
    { id:'cod', icon:'💰', label:'Cash on Delivery', sub:'Pay cash when order arrives' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg2)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate('cart')}>←</button>
        <div className="topbar-title">Checkout</div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:16, paddingBottom:100 }}>
        {/* Address */}
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:12 }}>📍 Delivery Address</div>
          <div style={{ fontSize:13, color:'var(--text2)' }}>{user?.address || 'Jubilee Hills, Hyderabad, Telangana - 500033'}</div>
          <div style={{ fontSize:12, color:'var(--green-dark)', marginTop:8, cursor:'pointer', fontWeight:600 }}>+ Change Address</div>
        </div>

        {/* Payment */}
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:14 }}>💳 Payment Method</div>
          {payOptions.map(o => (
            <div key={o.id} onClick={()=>setPayMethod(o.id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:o.id!=='cod'?'1px solid var(--border)':'none', cursor:'pointer' }}>
              <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${payMethod===o.id?'var(--green)':'var(--border)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {payMethod===o.id && <div style={{ width:10, height:10, borderRadius:'50%', background:'var(--green)' }} />}
              </div>
              <div style={{ fontSize:22 }}>{o.icon}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text1)' }}>{o.label}</div>
                <div style={{ fontSize:11, color:'var(--text3)' }}>{o.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, marginBottom:16 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:12 }}>🧾 Order Summary</div>
          {cart.map(i => (
            <div key={i.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:6 }}>
              <span>{i.emoji} {i.name} {i.qty}{i.unit}</span><span>₹{(i.price*i.qty).toFixed(0)}</span>
            </div>
          ))}
          <div style={{ height:1, background:'var(--border)', margin:'10px 0' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:6 }}>
            <span>Subtotal</span><span>₹{cartTotal.toFixed(0)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
            <span style={{ color:'var(--text2)' }}>Delivery</span>
            <span style={{ fontWeight:700, color:deliveryFee===0?'var(--green-dark)':'var(--red)' }}>{deliveryFee===0?'FREE':'₹'+deliveryFee}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, fontWeight:800, marginTop:10 }}>
            <span>Total</span><span style={{ color:'var(--green-dark)' }}>₹{orderTotal.toFixed(0)}</span>
          </div>
          <div style={{ fontSize:11, color:'var(--text3)', marginTop:8 }}>✅ No GST • No platform fees • No hidden charges</div>
        </div>
      </div>
      <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, padding:16, background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
        {placed ? (
          <div style={{ textAlign:'center', padding:14, background:'var(--green-light)', borderRadius:'var(--radius)', color:'var(--green-dark)', fontWeight:700, fontSize:15 }}>
            ✅ Order Placed! Redirecting to tracking...
          </div>
        ) : (
          <>
            <button className="btn btn-primary" onClick={placeOrder}>Place Order 🛒 — ₹{orderTotal.toFixed(0)}</button>
            <div style={{ textAlign:'center', fontSize:11, color:'var(--text3)', marginTop:8 }}>No GST • No platform fees • Direct from farmer</div>
          </>
        )}
      </div>
    </div>
  );
}
