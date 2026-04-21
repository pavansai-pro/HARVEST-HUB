import { useApp } from '../../context/AppContext';

const statusStyle = { transit:{bg:'var(--blue-light)',color:'var(--blue)',label:'In Transit'}, preparing:{bg:'var(--amber-light)',color:'var(--amber)',label:'Preparing'}, delivered:{bg:'var(--green-light)',color:'var(--green-dark)',label:'Delivered'}, placed:{bg:'#F5F5F5',color:'#555',label:'Placed'} };

export default function Cart({ onNavigate }) {
  const { cart, removeFromCart, clearCart, cartTotal, deliveryFee, orderTotal, tr } = useApp();

  if (cart.length === 0) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar"><button className="back-btn" onClick={()=>onNavigate('customer-home')}>←</button><div className="topbar-title">My Cart</div></div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:40, textAlign:'center' }}>
        <div style={{ fontSize:72, marginBottom:16 }}>🛒</div>
        <div style={{ fontSize:18, fontWeight:700, color:'var(--text2)' }}>Cart is empty</div>
        <div style={{ fontSize:13, color:'var(--text3)', marginTop:8, marginBottom:24 }}>Add some fresh produce from farmers!</div>
        <button className="btn btn-primary" onClick={()=>onNavigate('customer-home')} style={{ width:'auto', padding:'12px 28px' }}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg2)', display:'flex', flexDirection:'column' }}>
      <div className="topbar">
        <button className="back-btn" onClick={()=>onNavigate('customer-home')}>←</button>
        <div className="topbar-title">My Cart ({cart.length})</div>
        <span style={{ fontSize:13, color:'var(--red)', cursor:'pointer', fontWeight:600 }} onClick={clearCart}>Clear</span>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:16, paddingBottom:160 }}>
        {cart.map(item => (
          <div key={item.id} style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:14, display:'flex', gap:14, alignItems:'center', marginBottom:10, boxShadow:'var(--shadow)' }}>
            <div style={{ fontSize:36, width:50, height:50, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--green-light)', flexShrink:0 }}>{item.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)' }}>{item.name}</div>
              <div style={{ fontSize:12, color:'var(--text3)' }}>{item.qty} {item.unit} × ₹{item.price}</div>
              <div style={{ fontSize:12, color:'var(--text3)' }}>{item.farmerShort}</div>
            </div>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:'var(--green-dark)' }}>₹{(item.price * item.qty).toFixed(0)}</div>
              <div style={{ fontSize:18, color:'var(--text3)', cursor:'pointer', textAlign:'right', marginTop:4 }} onClick={()=>removeFromCart(item.id)}>✕</div>
            </div>
          </div>
        ))}

        <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:16, marginTop:8 }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text1)', marginBottom:12 }}>Order Summary</div>
          {cart.map(i => (
            <div key={i.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:6 }}>
              <span>{i.name} {i.qty}{i.unit}</span><span>₹{(i.price*i.qty).toFixed(0)}</span>
            </div>
          ))}
          <div style={{ height:1, background:'var(--border)', margin:'12px 0' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:6 }}>
            <span>Subtotal</span><span>₹{cartTotal.toFixed(0)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
            <span style={{ color:'var(--text2)' }}>Delivery</span>
            <span style={{ fontWeight:700, color:deliveryFee===0?'var(--green-dark)':'var(--red)' }}>{deliveryFee===0?'FREE':'₹'+deliveryFee}</span>
          </div>
          {deliveryFee === 0 ? (
            <div style={{ fontSize:11, color:'var(--green-dark)', marginBottom:8 }}>🎉 You qualify for free delivery!</div>
          ) : (
            <div style={{ fontSize:11, color:'var(--text3)', marginBottom:8 }}>Add ₹{(199-cartTotal).toFixed(0)} more for free delivery!</div>
          )}
          <div style={{ height:1, background:'var(--border)', margin:'8px 0 12px' }} />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, fontWeight:800 }}>
            <span>Total</span><span style={{ color:'var(--green-dark)' }}>₹{orderTotal.toFixed(0)}</span>
          </div>
          <div style={{ fontSize:11, color:'var(--text3)', marginTop:8 }}>No GST • No platform fees • Direct from farmer</div>
        </div>
      </div>
      <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:430, padding:16, background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
        <button className="btn btn-primary" onClick={()=>onNavigate('checkout')}>Proceed to Checkout → ₹{orderTotal.toFixed(0)}</button>
      </div>
    </div>
  );
}
