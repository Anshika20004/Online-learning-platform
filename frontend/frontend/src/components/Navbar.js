import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';
import { BatteryLow, BatteryMedium, Flame } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { mood, setIsMoodModalOpen } = useMood();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const getMoodIcon = () => {
    switch (mood) {
      case 'low_energy': return <BatteryLow size={20} />;
      case 'high_focus': return <Flame size={20} />;
      default: return <BatteryMedium size={20} />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'low_energy': return '#10b981';
      case 'high_focus': return '#f97316';
      default: return '#3b82f6';
    }
  };

  const getMoodLabel = () => {
    switch (mood) {
      case 'low_energy': return 'Low Energy';
      case 'high_focus': return 'High Focus';
      default: return 'Normal Mode';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#1f2937',
            fontSize: '24px',
            fontWeight: '700'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#6c5ce7',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            color: '#fff',
            fontSize: '18px'
          }}>
            📚
          </div>
          <span style={{ color: '#6c5ce7' }}>EduLearn</span>
          <span style={{ color: '#1f2937' }}>Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px'
        }} className="desktop-nav">
          <Link 
            to="/" 
            style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#6c5ce7'}
            onMouseOut={(e) => e.target.style.color = '#374151'}
          >
            🏠 Home
          </Link>
          <Link 
            to="/courses" 
            style={{
              textDecoration: 'none',
              color: '#374151',
              fontWeight: '500',
              fontSize: '16px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.color = '#6c5ce7'}
            onMouseOut={(e) => e.target.style.color = '#374151'}
          >
            📖 Courses
          </Link>

          {/* Mood Change Button */}
          <button
            onClick={() => setIsMoodModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: `${getMoodColor()}15`,
              border: `1px solid ${getMoodColor()}40`,
              color: getMoodColor(),
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
              marginLeft: '8px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${getMoodColor()}25`;
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = `${getMoodColor()}15`;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {getMoodIcon()}
            <span>{getMoodLabel()}</span>
          </button>
          
          {/* Auth Section */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <img 
                  src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop'} 
                  alt="Profile"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <span style={{
                  color: '#374151',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  {user?.name}
                </span>
                <span style={{
                  color: '#9ca3af',
                  fontSize: '12px'
                }}>
                  ▼
                </span>
              </button>
              
              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 10
                    }}
                    onClick={() => setIsProfileOpen(false)}
                  />
                  
                  {/* Menu */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                    zIndex: 20,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '12px 16px',
                      backgroundColor: '#f9fafb',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>{user?.name}</p>
                      <p style={{
                        margin: 0,
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>{user?.email}</p>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '10px',
                        fontWeight: '500',
                        backgroundColor: user?.role === 'instructor' ? '#fbbf24' : '#34d399',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        marginTop: '4px'
                      }}>
                        {user?.role === 'instructor' ? '👨‍🏫 Instructor' : '👨‍🎓 Student'}
                      </span>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        color: '#374151',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>📊</span>
                      Dashboard
                    </Link>
                    
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        color: '#374151',
                        fontSize: '14px',
                        transition: 'background-color 0.2s',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>⚙️</span>
                      Profile
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <span>🚪</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Link
                to="/login"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #6c5ce7',
                  color: '#6c5ce7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#6c5ce7';
                  e.target.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#6c5ce7';
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#6c5ce7',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5b52d6'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6c5ce7'}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            color: '#374151'
          }}
          className="mobile-menu-btn"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #e5e7eb',
          padding: '20px'
        }} className="mobile-menu">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#374151',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              🏠 Home
            </Link>
            <Link 
              to="/courses"
              onClick={() => setIsMenuOpen(false)}
              style={{
                textDecoration: 'none',
                color: '#374151',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              📖 Courses
            </Link>

            {/* Mobile Mood Button */}
            <button
              onClick={() => {
                setIsMoodModalOpen(true);
                setIsMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: `${getMoodColor()}15`,
                border: `1px solid ${getMoodColor()}40`,
                color: getMoodColor(),
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                textAlign: 'left',
                width: '100%'
              }}
            >
              {getMoodIcon()}
              <span>Current Mood: {getMoodLabel()}</span>
            </button>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  📊 Dashboard
                </Link>
                <Link 
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  ⚙️ Profile
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  🔑 Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  📝 Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;