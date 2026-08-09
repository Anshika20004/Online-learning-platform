import React from 'react';
import { useMood } from '../context/MoodContext';
import { Rocket, X, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BoostEntryModal = () => {
  const { showBoostEntry, setShowBoostEntry, setIsBoostMode } = useMood();
  const navigate = useNavigate();

  if (!showBoostEntry) return null;

  const handleStartBoost = () => {
    setIsBoostMode(true);
    setShowBoostEntry(false);
    navigate('/courses'); // Taking them somewhere they can learn!
  };

  const handleSkip = () => {
    setShowBoostEntry(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.8)',
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
          width: '80px', height: '80px', background: 'rgba(59,130,246,0.1)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', border: '2px solid rgba(59,130,246,0.2)'
        }}>
          <Coffee size={40} color="#3b82f6" />
        </div>

        <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'white', marginBottom: '15px' }}>
          Hey 👋 Lagta hai aaj thoda low feel kar rahe ho 😴
        </h2>
        
        <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '35px' }}>
          It's okay! We don't need to do a full marathon today. <br/>
          <strong>Chalo bas 5 min try karte hain?</strong> Only the fun stuff.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={handleStartBoost} style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white', border: 'none', padding: '18px', borderRadius: '15px', 
            fontSize: '18px', fontWeight: '800', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)', transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Rocket size={22} /> Start 5-min Boost 🚀
          </button>
          
          <button onClick={handleSkip} style={{
            background: 'transparent', color: '#64748b', border: 'none', padding: '15px',
            fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'color 0.2s',
            textDecoration: 'underline'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#cbd5e1'}
          onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
          >
            Skip for today
          </button>
        </div>

      </div>
    </div>
  );
};

export default BoostEntryModal;
