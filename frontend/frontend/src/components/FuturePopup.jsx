import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FuturePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only show once per session for high emotional impact without annoyance
    const hasSeenPopup = sessionStorage.getItem('hasSeenFuturePopup');
    if (!hasSeenPopup) {
      // Delay showing it so the dash loads first
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('hasSeenFuturePopup', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      maxWidth: '380px',
      animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.8); }
          100% { box-shadow: 0 0 15px rgba(139, 92, 246, 0.4); }
        }
      `}</style>
      
      <div style={{
        background: 'linear-gradient(145deg, #0f172a, #1e1b4b)',
        borderRadius: '24px',
        padding: '25px',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        position: 'relative',
        animation: 'pulseGlow 4s infinite ease-in-out'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none',
            color: '#94a3b8', cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
          {/* Holographic Avatar Mock */}
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 15px rgba(139,92,246,0.5)',
            position: 'relative', overflow: 'hidden'
          }}>
            <Sparkles size={24} color="white" />
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                opacity: 0.5
            }} />
          </div>

          <div>
            <h4 style={{ color: '#c4b5fd', margin: '0 0 6px', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Message from 2027
            </h4>
            
            <p style={{ color: '#f8fafc', margin: 0, fontSize: '15px', lineHeight: '1.5', fontWeight: '500' }}>
              “Hey 👋 Main tumhara 6 months future version hoon. Agar tum aaj consistent rahi, to tum React confidently bana logi aur internship crack kar logi 🚀”
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button 
            onClick={() => {
              setIsVisible(false);
              navigate('/future-roadmap');
            }}
            style={{
              flex: 1, background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: 'white', border: 'none', padding: '12px', borderRadius: '12px',
              fontSize: '14px', fontWeight: '700', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            See Our Future <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default FuturePopup;
