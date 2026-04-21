import { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { voiceCommands } from '../data/products';

export default function VoiceAssistant({ onNavigate, onFilter }) {
  const { tr, role, lang } = useApp();
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState('');
  const recognitionRef = useRef(null);
  const cmds = voiceCommands[role] || voiceCommands.customer;
  const langMap = { te:'te-IN',hi:'hi-IN',ta:'ta-IN',gu:'gu-IN',mr:'mr-IN',pa:'pa-IN',or:'or-IN',en:'en-IN' };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = false; rec.interimResults = true; rec.lang = langMap[lang] || 'en-IN';
    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      let t = '';
      for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript;
      setTranscript(t);
      if (e.results[e.results.length-1].isFinal) handleCmd(t.toLowerCase());
    };
    rec.onerror = () => { setListening(false); setResult('Could not hear. Try tapping a command.'); };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    try { rec.start(); } catch(e) {}
  };

  const stopListening = () => { if(recognitionRef.current) try{recognitionRef.current.stop();}catch(e){} setListening(false); };

  const handleCmd = (cmd) => {
    stopListening();
    if(cmd.includes('cart')) { setResult('Opening cart! 🛒'); setTimeout(()=>{onNavigate?.('cart'); close2();},500); }
    else if(cmd.includes('track')||cmd.includes('order')) { setResult('Opening tracking! 🚚'); setTimeout(()=>{onNavigate?.('tracking'); close2();},500); }
    else if(cmd.includes('market')||cmd.includes('price')) { setResult('Showing market prices! 📊'); setTimeout(()=>{onNavigate?.('farmer-home'); close2();},500); }
    else if(cmd.includes('weather')) { setResult('Showing weather! 🌤️'); setTimeout(()=>{onNavigate?.('farmer-home'); close2();},500); }
    else if(cmd.includes('add product')) { setResult('Opening add product! 📦'); setTimeout(()=>{onNavigate?.('farmer-add'); close2();},500); }
    else if(cmd.includes('settings')) { setResult('Opening settings! ⚙️'); setTimeout(()=>{onNavigate?.('settings'); close2();},500); }
    else if(cmd.includes('vegetable')) { setResult('Showing vegetables! 🥦'); onFilter?.('veg'); setTimeout(close2,500); }
    else if(cmd.includes('fruit')) { setResult('Showing fruits! 🍋'); onFilter?.('fruit'); setTimeout(close2,500); }
    else if(cmd.includes('tomato')) { setResult('Searching tomatoes! 🍅'); onFilter?.('search:tomatoes'); setTimeout(close2,500); }
    else { setResult('Try tapping a command below.'); }
  };

  const handleQuickCmd = (action) => {
    if(action.startsWith('goto:')) onNavigate?.(action.slice(5));
    else if(action.startsWith('filter:')) onFilter?.(action.slice(7));
    close2();
  };

  const close2 = () => { stopListening(); setOpen(false); setTranscript(''); setResult(''); };

  return (
    <>
      <button onClick={()=>{ setOpen(true); setTimeout(startListening,300); }} style={{display:'flex',alignItems:'center',gap:10,width:'100%',background:'var(--green-light)',border:'1.5px solid var(--green-border)',borderRadius:'var(--radius)',padding:'13px 16px',cursor:'pointer',marginBottom:16}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
        </div>
        <div style={{textAlign:'left'}}>
          <div style={{fontSize:13,fontWeight:600,color:'var(--green-dark)'}}>{tr('voiceAssistant')}</div>
          <div style={{fontSize:11,color:'var(--green-dark)',opacity:0.75,marginTop:2}}>Tap to speak — control app with voice</div>
        </div>
      </button>
      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.65)',zIndex:100,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-end'}}>
          <style>{`@keyframes pg{0%{box-shadow:0 0 0 0 rgba(29,158,117,0.4)}70%{box-shadow:0 0 0 20px rgba(29,158,117,0)}100%{box-shadow:0 0 0 0 rgba(29,158,117,0)}}@keyframes pr{0%{box-shadow:0 0 0 0 rgba(229,57,53,0.4)}70%{box-shadow:0 0 0 20px rgba(229,57,53,0)}100%{box-shadow:0 0 0 0 rgba(229,57,53,0)}}`}</style>
          <div style={{background:'var(--bg)',borderRadius:'24px 24px 0 0',padding:'32px 24px 48px',width:'100%',maxWidth:430,textAlign:'center'}}>
            <div style={{width:80,height:80,borderRadius:'50%',background:listening?'#E53935':'var(--green)',margin:'0 auto 20px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,animation:listening?'pr 1.5s infinite':'pg 1.5s infinite',cursor:'pointer'}} onClick={listening?stopListening:startListening}>🎙️</div>
            <div style={{fontSize:18,fontWeight:700,color:'var(--text1)',marginBottom:6}}>{listening?tr('listening'):'Voice Assistant'}</div>
            <div style={{fontSize:14,color:'var(--text2)',minHeight:24,marginBottom:20}}>{result||transcript||'Say a command or tap below'}</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:24}}>
              {cmds.map(c=><button key={c.action} onClick={()=>handleQuickCmd(c.action)} style={{padding:'7px 14px',borderRadius:100,background:'var(--bg2)',border:'1px solid var(--border)',fontSize:12,color:'var(--text2)',cursor:'pointer'}}>{c.label}</button>)}
            </div>
            <button onClick={close2} style={{padding:'14px 32px',borderRadius:'var(--radius)',background:'var(--red-light)',color:'var(--red)',border:'none',fontSize:14,fontWeight:600,cursor:'pointer'}}>✕ Close</button>
          </div>
        </div>
      )}
    </>
  );
}
