import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { states } from '../../data/products';

function OTPInput({ onVerify }) {
  const [vals, setVals] = useState(['','','','']);
  const set = (i, v) => {
    const n = [...vals]; n[i] = v.slice(-1); setVals(n);
    if (v && i < 3) document.getElementById(`otp${i+1}`)?.focus();
  };
  const filled = vals.every(v=>v!=='');
  return (
    <div>
      <div style={{ display:'flex', gap:12, justifyContent:'center', margin:'20px 0' }}>
        {vals.map((v,i) => (
          <input key={i} id={`otp${i}`} value={v} maxLength={1} type="tel"
            onChange={e => set(i, e.target.value)}
            style={{ width:52, height:56, borderRadius:'var(--radius-sm)', border:`2px solid ${v?'var(--green)':'var(--border)'}`, background:'var(--bg)', color:'var(--text1)', fontSize:22, fontWeight:700, textAlign:'center', fontFamily:'var(--font)', outline:'none' }}
          />
        ))}
      </div>
      <button className="btn btn-primary" disabled={!filled} onClick={onVerify} style={{ opacity:filled?1:0.5 }}>Verify & Login</button>
    </div>
  );
}

export default function Login({ onNavigate }) {
  const { tr, role, login } = useApp();
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [regMode, setRegMode] = useState(false);
  const [form, setForm] = useState({ name:'', addr:'', state:'Telangana', acres:'12', crop:'Vegetables' });
  const [farmerStep, setFarmerStep] = useState(false);

  const sendOtp = () => {
    if (phone.length < 10) { alert('Please enter a valid 10-digit number'); return; }
    setOtpSent(true);
  };

  const verify = () => {
    login({ name: form.name || 'Priya Sharma', phone, role, address: form.addr || 'Jubilee Hills, Hyderabad' });
    if (role === 'farmer' && regMode) { setFarmerStep(true); }
    else if (role === 'farmer') { onNavigate('farmer-home'); }
    else { onNavigate('customer-home'); }
  };

  const completeFarmer = () => onNavigate('farmer-home');

  if (farmerStep) return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div className="topbar"><div className="topbar-title">Farm Details</div></div>
      <div style={{ flex:1, overflowY:'auto', padding:'20px 24px 100px' }}>
        <div style={{ background:'var(--green-light)', borderRadius:'var(--radius-sm)', padding:14, marginBottom:20, fontSize:13, color:'var(--green-dark)' }}>👨‍🌾 Tell us about your farm so customers can trust your produce</div>
        {[['Farm/Village Name','name','Ramu Farms, Medak'],['Contact Name','farmName','Ramu Naik']].map(([l,k,ph])=>(
          <div key={k} style={{ marginBottom:16 }}>
            <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>{l}</label>
            <input className="input" placeholder={ph} value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />
          </div>
        ))}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>Land (Acres): {form.acres} ac</label>
          <input type="range" min="0.5" max="200" step="0.5" value={form.acres} onChange={e=>setForm(f=>({...f,acres:e.target.value}))} style={{ width:'100%', accentColor:'var(--green)' }} />
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>Primary Crop</label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
            {['🍅 Vegs','🍋 Fruits','🌾 Grains','🫘 Pulses','🌶️ Spices','🌻 Oilseeds'].map(c=>(
              <div key={c} onClick={()=>setForm(f=>({...f,crop:c}))} style={{ padding:'8px 6px', borderRadius:'var(--radius-sm)', border:`1.5px solid ${form.crop===c?'var(--green)':'var(--border)'}`, background:form.crop===c?'var(--green-light)':'var(--bg2)', textAlign:'center', fontSize:12, cursor:'pointer' }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>State</label>
          <select className="input" value={form.state} onChange={e=>setForm(f=>({...f,state:e.target.value}))}>
            {states.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>Farm Address</label>
          <textarea className="input" rows="2" placeholder="Village/District, PIN" style={{ resize:'none' }} value={form.addr} onChange={e=>setForm(f=>({...f,addr:e.target.value}))} />
        </div>
        <button className="btn btn-primary" onClick={completeFarmer}>Complete Registration & Go to Dashboard ✓</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', padding:'32px 24px 40px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:36 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🌾</div>
        <div style={{ fontSize:22, fontWeight:800, color:'var(--text1)' }}>Harvest Hub</div>
      </div>
      {!regMode ? (
        <>
          <div style={{ fontSize:26, fontWeight:800, color:'var(--text1)', marginBottom:6 }}>Login</div>
          <div style={{ fontSize:14, color:'var(--text2)', marginBottom:28 }}>Enter your mobile number to continue</div>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>Mobile Number</label>
            <div style={{ display:'flex', gap:8 }}>
              <div style={{ padding:'13px 12px', borderRadius:'var(--radius-sm)', border:'1.5px solid var(--border)', background:'var(--bg2)', color:'var(--text1)', fontSize:14, width:72, textAlign:'center' }}>+91</div>
              <input className="input" type="tel" placeholder="98765 43210" maxLength={10} value={phone} onChange={e=>setPhone(e.target.value)} style={{ flex:1 }} />
            </div>
          </div>
          {!otpSent && <button className="btn btn-primary" onClick={sendOtp}>Send OTP</button>}
          {otpSent && <OTPInput onVerify={verify} />}
          <div style={{ marginTop:24, textAlign:'center', fontSize:13, color:'var(--text3)' }}>
            New to Harvest Hub?{' '}
            <span style={{ color:'var(--green)', fontWeight:700, cursor:'pointer' }} onClick={()=>setRegMode(true)}>Register</span>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize:26, fontWeight:800, color:'var(--text1)', marginBottom:6 }}>Create Account</div>
          <div style={{ fontSize:14, color:'var(--text2)', marginBottom:24 }}>Join Harvest Hub — it's free!</div>
          {[['Full Name','name','Priya Sharma','text'],['Mobile Number','phone','98765 43210','tel']].map(([l,k,ph,type])=>(
            <div key={k} style={{ marginBottom:16 }}>
              <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:6, display:'block' }}>{l}</label>
              {k==='phone' ? (
                <div style={{ display:'flex', gap:8 }}>
                  <div style={{ padding:'13px 12px', borderRadius:'var(--radius-sm)', border:'1.5px solid var(--border)', background:'var(--bg2)', width:72, textAlign:'center', fontSize:14 }}>+91</div>
                  <input className="input" type={type} placeholder={ph} value={phone} onChange={e=>setPhone(e.target.value)} style={{ flex:1 }} />
                </div>
              ) : <input className="input" type={type} placeholder={ph} value={form[k]||''} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} />}
            </div>
          ))}
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:13, fontWeight:500, color:'var(--text2)', marginBottom:8, display:'block' }}>You are registering as:</label>
            <div style={{ background:'var(--green-light)', border:'1.5px solid var(--green-border)', borderRadius:'var(--radius-sm)', padding:'10px 14px', fontSize:13, fontWeight:600, color:'var(--green-dark)' }}>
              {role === 'farmer' ? '👨‍🌾 Farmer' : '🛒 Customer'}
            </div>
          </div>
          <button className="btn btn-primary" onClick={()=>{ if(!form.name||!phone){alert('Please fill all fields');return;} setOtpSent(true); }}>Register & Get OTP</button>
          {otpSent && <OTPInput onVerify={verify} />}
          <div style={{ marginTop:16, textAlign:'center', fontSize:13, color:'var(--text3)', cursor:'pointer' }} onClick={()=>setRegMode(false)}>← Back to Login</div>
        </>
      )}
      <div style={{ marginTop:16, textAlign:'center', fontSize:13, color:'var(--text3)', cursor:'pointer' }} onClick={()=>onNavigate('onboarding')}>🌐 Change Language / Role</div>
    </div>
  );
}
