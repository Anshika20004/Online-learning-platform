import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi there! I am your AI Course Assistant. What topic are you stuck on today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const generateMockResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('react') || q.includes('hook') || q.includes('component')) {
      return "React components are independent, reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML. React hooks like `useState` allow you to manage dynamic data inside these components!";
    } else if (q.includes('python') || q.includes('data') || q.includes('pandas')) {
      return "Python is incredibly powerful for data! Libraries like Pandas let you load massive datasets into 'DataFrames' which act like highly programmable Excel spreadsheets. Would you like a small code example of sorting data?";
    } else if (q.includes('thank') || q.includes('ok') || q.includes('understand')) {
      return "You're very welcome! Keep pushing forward – you're doing a fantastic job. Let me know if anything else trips you up.";
    } else {
      return "That's a great question! In the context of this specific course topic, you can think of it as building a house – you need the architectural foundation before you paint the walls. Review the previous 2 minutes of the video, it covers this exact theory beautifully!";
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const aiResponse = { role: 'ai', text: generateMockResponse(userMessage.text) };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 10000,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '0',
          width: '350px',
          height: '450px',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px', borderRadius: '50%' }}>
                <Sparkles size={20} color="white" />
              </div>
              <h3 style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: '700' }}>AI Tutor</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {/* Message List */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}>
                {msg.role === 'ai' && (
                  <div style={{ background: 'rgba(56,189,248,0.1)', padding: '8px', borderRadius: '50%', color: '#38bdf8', flexShrink: 0 }}>
                    <Bot size={16} />
                  </div>
                )}
                
                <div style={{
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'rgba(255,255,255,0.05)',
                  color: msg.role === 'user' ? 'white' : '#e2e8f0',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  border: msg.role === 'ai' ? '1px solid rgba(255,255,255,0.1)' : 'none'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: 0.7 }}>
                <div style={{ background: 'rgba(56,189,248,0.1)', padding: '8px', borderRadius: '50%', color: '#38bdf8' }}><Bot size={16} /></div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '15px 15px 15px 0', color: '#94a3b8', fontSize: '13px' }}>
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '10px'
          }}>
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about this topic..."
              style={{
                flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 15px', borderRadius: '12px', color: 'white', outline: 'none', fontSize: '14px'
              }}
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim()}
              style={{
                background: inputText.trim() ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                color: inputText.trim() ? 'white' : 'rgba(255,255,255,0.3)',
                border: 'none', width: '45px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'default',
                transition: 'all 0.2s'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px', height: '60px', borderRadius: '30px',
          background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
          border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(14, 165, 233, 0.5)', cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AIChatbox;
