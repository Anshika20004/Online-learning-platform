import React from 'react';
import { useMood } from '../context/MoodContext';
import { BatteryLow, BatteryMedium, Flame, X } from 'lucide-react';

const MoodModal = () => {
  const { isMoodModalOpen, setIsMoodModalOpen, changeMood, mood } = useMood();

  if (!isMoodModalOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '30px',
        padding: '40px',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <button 
          onClick={() => setIsMoodModalOpen(false)}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
        >
          <X size={20} color="#64748b" />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>
            Aaj tum kaisa feel kar rahe ho?
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Choose your mood, and we'll adapt the course for you.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <button onClick={() => changeMood('low_energy')} style={{
            background: mood === 'low_energy' ? 'linear-gradient(135deg, #10b981, #059669)' : 'white',
            color: mood === 'low_energy' ? 'white' : '#1e293b',
            border: mood === 'low_energy' ? 'none' : '2px solid rgba(16, 185, 129, 0.3)',
            padding: '20px', borderRadius: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s ease',
            boxShadow: mood === 'low_energy' ? '0 10px 25px rgba(16, 185, 129, 0.4)' : 'none'
          }}>
            <div style={{ background: mood === 'low_energy' ? 'rgba(255,255,255,0.2)' : 'rgba(16,185,129,0.1)', padding: '12px', borderRadius: '15px' }}>
              <BatteryLow size={28} color={mood === 'low_energy' ? 'white' : '#10b981'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>😴 Low Energy</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Short 5-min videos, easy summaries.</div>
            </div>
          </button>

          <button onClick={() => changeMood('normal')} style={{
            background: mood === 'normal' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'white',
            color: mood === 'normal' ? 'white' : '#1e293b',
            border: mood === 'normal' ? 'none' : '2px solid rgba(59, 130, 246, 0.3)',
            padding: '20px', borderRadius: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s ease',
            boxShadow: mood === 'normal' ? '0 10px 25px rgba(59, 130, 246, 0.4)' : 'none'
          }}>
            <div style={{ background: mood === 'normal' ? 'rgba(255,255,255,0.2)' : 'rgba(59,130,246,0.1)', padding: '12px', borderRadius: '15px' }}>
              <BatteryMedium size={28} color={mood === 'normal' ? 'white' : '#3b82f6'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>😊 Normal Mode</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Regular lessons and balanced pacing.</div>
            </div>
          </button>

          <button onClick={() => changeMood('high_focus')} style={{
            background: mood === 'high_focus' ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'white',
            color: mood === 'high_focus' ? 'white' : '#1e293b',
            border: mood === 'high_focus' ? 'none' : '2px solid rgba(249, 115, 22, 0.3)',
            padding: '20px', borderRadius: '20px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s ease',
            boxShadow: mood === 'high_focus' ? '0 10px 25px rgba(249, 115, 22, 0.4)' : 'none'
          }}>
            <div style={{ background: mood === 'high_focus' ? 'rgba(255,255,255,0.2)' : 'rgba(249,115,22,0.1)', padding: '12px', borderRadius: '15px' }}>
              <Flame size={28} color={mood === 'high_focus' ? 'white' : '#f97316'} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '18px', fontWeight: '800' }}>🔥 Full Focus</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>Deep learning challenges, distraction-free.</div>
            </div>
          </button>

        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
};

export default MoodModal;
