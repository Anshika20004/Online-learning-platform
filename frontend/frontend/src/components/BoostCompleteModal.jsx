import React from 'react';
import { useMood } from '../context/MoodContext';
import { useAuth } from '../context/AuthContext';
import { Flame, CheckCircle, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

const BoostCompleteModal = () => {
  const { showBoostComplete, setShowBoostComplete, setIsBoostMode, changeMood } = useMood();
  const { addXp } = useAuth(); // If we need to read state

  React.useEffect(() => {
    if (showBoostComplete) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [showBoostComplete]);

  if (!showBoostComplete) return null;

  const handleContinue = () => {
    setShowBoostComplete(false);
    setIsBoostMode(false);
    changeMood('normal'); // Escalate their mood to normal!
  };

  const handleStop = () => {
    setShowBoostComplete(false);
    setIsBoostMode(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(15px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        width: '90%',
        maxWidth: '450px',
        borderRadius: '30px',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        animation: 'slideUp 0.4s ease-out'
      }}>
        
        <div style={{ 
          width: '80px', height: '80px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)'
        }}>
          <CheckCircle size={40} color="white" />
        </div>

        <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'white', marginBottom: '10px' }}>
          🎉 Nice! You showed up today!
        </h2>
        
        <div style={{ 
          margin: '20px 0', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
          padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px'
        }}>
           <Target size={24} color="#10b981"/>
           <span style={{color: '#10b981', fontWeight: '800', fontSize: '18px'}}>Energy recovered: 30% → 60%</span>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '17px', lineHeight: '1.6', marginBottom: '35px' }}>
          You've built up some momentum! <br/>
          <strong style={{color: 'white'}}>🔥 Continue for 10 more min?</strong>
        </p>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={handleContinue} style={{
            flex: 1, background: 'linear-gradient(135deg, #f97316, #ea580c)',
            color: 'white', border: 'none', padding: '16px', borderRadius: '15px', 
            fontSize: '16px', fontWeight: '800', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)', transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Flame size={20} /> Yes 🔥
          </button>
          
          <button onClick={handleStop} style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)', 
            padding: '16px', borderRadius: '15px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            Stop here 👍
          </button>
        </div>

      </div>
    </div>
  );
};

export default BoostCompleteModal;
