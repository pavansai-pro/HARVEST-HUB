import { useState } from 'react';
import { useApp } from '../../context/AppContext';

function PermRow({ icon, label, sub, permKey }) {
  const { permissions, setPermissions } = useApp();
  const on = permissions[permKey];
  const toggle = () => setPermissions(p => ({ ...p, [permKey]: !p[permKey] }));
  return (
    <div onClick={toggle} style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid var(--border)', cursor:'pointer' }}>
      <div style={{ fontSize:24, width:40, textAlign:'center' }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:14, fontWeight:500, color:'var(--text1)' }}>{label}</div>
        <div style={{ fontSize:12, color:'var(--text3)' }}>{sub}</div>
      </div>
      <div className={`toggle${on?' on':''}`} />
    </div>
  );
}

export default function Permissions({ onNavigate }) {
  const { tr, setPermissions } = useApp();
  const allowAll = () => {
    setPermissions({ location:true, notif:true, camera:true, mic:true });
    onNavigate('tutorial');
  };
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1, padding:'60px 24px 40px', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{ fontSize:72, marginBottom:20 }}>📍</div>
        <div style={{ fontSize:24, fontWeight:800, color:'var(--text1)', textAlign:'center', marginBottom:12 }}>Allow Permissions</div>
        <div style={{ fontSize:14, color:'var(--text2)', textAlign:'center', lineHeight:1.7, marginBottom:32, maxWidth:300 }}>
          Harvest Hub needs a few permissions to give you the best experience
        </div>
        <div style={{ width:'100%' }}>
          <PermRow icon="📍" label="Location" sub="Nearby farmers & weather data" permKey="location" />
          <PermRow icon="🔔" label="Notifications" sub="Order updates & seasonal alerts" permKey="notif" />
          <PermRow icon="📷" label="Camera" sub="Upload crop/product photos" permKey="camera" />
          <PermRow icon="🎙️" label="Microphone" sub="Voice assistant commands" permKey="mic" />
        </div>
      </div>
      <div style={{ padding:'0 24px 40px', display:'flex', flexDirection:'column', gap:10 }}>
        <button className="btn btn-primary" onClick={allowAll}>Allow All & Continue</button>
        <button className="btn btn-secondary" onClick={()=>onNavigate('tutorial')}>Skip for now</button>
      </div>
    </div>
  );
}
