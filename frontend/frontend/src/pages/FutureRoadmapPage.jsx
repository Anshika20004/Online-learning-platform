import React, { useState } from 'react';
import { Target, Warning, TrendingUp, TrendingDown, BookOpen, Briefcase, Award, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FutureRoadmapPage = () => {
  const { user } = useAuth();
  
  // Basic personalized advice logic based on mock data
  const consistencyScore = 40; // In a real app derived from streak/activity
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a', /* Dark slate background */
      backgroundImage: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f172a 100%)',
      padding: '60px 20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            display: 'inline-flex', padding: '10px 20px', background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '30px', border: '1px solid rgba(139, 92, 246, 0.3)', marginBottom: '20px'
          }}>
            <span style={{ color: '#c4b5fd', fontWeight: '700', fontSize: '14px', letterSpacing: '1px' }}>🔮 THE FUTURE YOU AI MENTOR</span>
          </div>
          <h1 style={{ color: 'white', fontSize: '42px', fontWeight: '900', margin: '0 0 15px' }}>
            Two Paths. <span style={{ color: '#a78bfa' }}>One Choice.</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Every daily session compounds. See exactly where your current trajectory leads in 6 months.
          </p>
        </div>

        {/* Dynamic Advice Logic Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))',
          padding: '24px 30px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px',
          border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '40px', backdropFilter: 'blur(10px)'
        }}>
          <div style={{ backgroundColor: 'rgba(56,189,248,0.1)', padding: '15px', borderRadius: '15px' }}>
            <Zap size={30} color="#38bdf8" />
          </div>
          <div>
            <h3 style={{ color: '#e0f2fe', margin: '0 0 8px', fontSize: '20px', fontWeight: '800' }}>
              Mentor Synthesis
            </h3>
            <p style={{ color: '#bae6fd', margin: 0, fontSize: '16px' }}>
              You are currently <strong style={{ color: '#38bdf8' }}>{consistencyScore}% aligned</strong> with your optimal future self. Just <strong>20 minutes daily</strong> can decisively bridge this gap 🚀
            </p>
          </div>
        </div>

        {/* Feature 2: Dual Path View */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '60px' }}>
          
          {/* Positive Future */}
          <div style={{
            background: 'linear-gradient(145deg, #134e4a, #064e3b)', padding: '40px', borderRadius: '30px',
            border: '1px solid rgba(16, 185, 129, 0.3)', boxShadow: '0 20px 40px rgba(6, 78, 59, 0.4)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}><TrendingUp size={200} color="#34d399" /></div>
            
            <div style={{ background: 'rgba(16,185,129,0.2)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <TrendingUp size={30} color="#34d399" />
            </div>
            <h3 style={{ color: 'white', fontSize: '26px', fontWeight: '800', margin: '0 0 10px' }}>Positive Future</h3>
            <p style={{ color: '#a7f3d0', fontSize: '15px', margin: '0 0 25px' }}>If you maintain consistency today...</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#f8fafc', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#059669', borderRadius: '50%', padding: '4px' }}><Check size={14} color="white"/></div> Highly fluent in React Architecture</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#059669', borderRadius: '50%', padding: '4px' }}><Check size={14} color="white"/></div> 3 Production-ready Projects</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#059669', borderRadius: '50%', padding: '4px' }}><Check size={14} color="white"/></div> Supreme Confidence Level</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: '#059669', borderRadius: '50%', padding: '4px' }}><Check size={14} color="white"/></div> Cracking Paid Internships 🚀</li>
            </ul>
          </div>

          {/* Negative Future */}
          <div style={{
            background: 'linear-gradient(145deg, #451a03, #2e1065)', padding: '40px', borderRadius: '30px',
            border: '1px solid rgba(239, 68, 68, 0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            filter: 'grayscale(0.3)'
          }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
              <TrendingDown size={30} color="#f87171" />
            </div>
            <h3 style={{ color: 'white', fontSize: '26px', fontWeight: '800', margin: '0 0 10px' }}>Negative Future</h3>
            <p style={{ color: '#fca5a5', fontSize: '15px', margin: '0 0 25px' }}>If you skip tasks and lose momentum...</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>⚠️ Stuck on basic concepts</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>⚠️ Empty GitHub / No Projects</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>⚠️ Fear of Interviews</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>⚠️ Starting over repeatedly</li>
            </ul>
          </div>

        </div>

        {/* Feature 4: Future Roadmap UI */}
        <div style={{ background: '#1e293b', borderRadius: '30px', padding: '50px', border: '1px solid #334155' }}>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', margin: '0 0 10px', textAlign: 'center' }}>
            Your 6-Month Victory Map
          </h2>
          <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '50px' }}>Follow the path. Connect with your future self.</p>

          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: '40px', top: '20px', bottom: '20px', width: '2px', background: 'rgba(139, 92, 246, 0.3)' }} />

            {[
              { m: 1, title: 'HTML + CSS Foundations', desc: 'Syntax mapping & layouts.', icon: <BookOpen size={20} />, active: true },
              { m: 2, title: 'JavaScript Mastery', desc: 'DOM manipulation & logic flow.', icon: <BookOpen size={20} />, active: true },
              { m: 3, title: 'Deep Work Projects', desc: 'Applying JS to real logic.', icon: <Briefcase size={20} />, active: false },
              { m: 4, title: 'React Environment', desc: 'Architecting modern components.', icon: <BookOpen size={20} />, active: false },
              { m: 5, title: 'Advanced Portfolio', desc: 'Deploying robust systems.', icon: <Briefcase size={20} />, active: false },
              { m: 6, title: 'Internship Ready 🚀', desc: 'Cracking algorithms & interviews.', icon: <Award size={20} />, active: false },
            ].map((node, i) => (
              <div key={i} style={{ display: 'flex', gap: '30px', marginBottom: i === 5 ? 0 : '40px', position: 'relative' }}>
                <div style={{
                  width: '80px', flexShrink: 0, textAlign: 'right', paddingTop: '10px',
                  color: node.active ? '#a78bfa' : '#64748b', fontWeight: '700', fontSize: '18px'
                }}>
                  Month {node.m}
                </div>
                
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: node.active ? '#8b5cf6' : '#1e293b', border: `3px solid ${node.active ? '#c4b5fd' : '#475569'}`,
                  position: 'absolute', left: '26px', top: '10px', zIndex: 1,
                  boxShadow: node.active ? '0 0 15px rgba(139, 92, 246, 0.6)' : 'none'
                }} />

                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                  padding: '20px 25px', borderRadius: '15px', flex: 1, marginLeft: '60px',
                  opacity: node.active ? 1 : 0.6
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ color: node.active ? 'white' : '#cbd5e1', margin: '0 0 8px', fontSize: '18px', fontWeight: '700' }}>
                        {node.title}
                      </h4>
                      <p style={{ color: '#94a3b8', margin: 0 }}>{node.desc}</p>
                    </div>
                    {node.m === 3 && ( // Hardcoded "You are here" for emotional effect
                      <div style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                        📍 YOU ARE HERE
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper strictly internal component 
const Check = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default FutureRoadmapPage;
