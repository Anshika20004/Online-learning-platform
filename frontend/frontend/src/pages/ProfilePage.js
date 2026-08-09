import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Save, Edit, User, Mail, Phone, MapPin, Globe, Award, BookOpen, Users } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', 
    bio: '', 
    phone: '', 
    location: '', 
    website: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setEditing(false);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || ''
      });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '40px 0',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, rgba(120,119,198,0.1) 0%, transparent 50%)
        `,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        
        {/* Profile Header */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(30px)',
          borderRadius: '30px',
          padding: '50px',
          boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.3)',
          marginBottom: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {/* Avatar Section */}
          <div style={{
            position: 'relative',
            flexShrink: 0
          }}>
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              border: '6px solid rgba(255,255,255,0.5)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              background: 'linear-gradient(135deg, #667eea, #764ba2)'
            }}>
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop'} 
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <button style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-10px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 15px 35px rgba(254,202,87,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.boxShadow = '0 20px 45px rgba(254,202,87,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 15px 35px rgba(254,202,87,0.4)';
            }}
            title="Change Avatar"
            >
              <Camera size={20} color="white" />
            </button>
          </div>

          {/* Profile Info */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #333, #666)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              marginBottom: '15px',
              letterSpacing: '-0.03em'
            }}>
              {user?.name || 'Your Name'}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <span style={{
                background: user?.role === 'student' ? 
                  'linear-gradient(135deg, #667eea, #764ba2)' : 
                  'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                padding: '10px 25px',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: '700',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                {user?.role || 'Student'}
              </span>
              {user?.role === 'student' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(16,185,129,0.2)',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#059669'
                }}>
                  <Award size={16} />
                  Level: {JSON.parse(localStorage.getItem('studentLevel') || '{}').level || 'Not Assessed'}
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#4b5563',
                fontSize: '18px'
              }}>
                <Mail size={20} />
                <span>{user?.email || 'email@example.com'}</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#4b5563',
                fontSize: '18px'
              }}>
                <MapPin size={20} />
                <span>{user?.location || 'Your Location'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              {!editing ? (
                <button 
                  onClick={() => setEditing(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 15px 35px rgba(102,126,234,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 20px 45px rgba(102,126,234,0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 15px 35px rgba(102,126,234,0.4)';
                  }}
                >
                  <Edit size={20} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={handleCancel}
                    style={{
                      padding: '16px 32px',
                      background: 'transparent',
                      color: '#6b7280',
                      border: '2px solid #d1d5db',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = '#f3f4f6';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 32px',
                      background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981, #34d399)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: loading ? 'none' : '0 15px 35px rgba(16,185,129,0.4)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loading ? '...' : <Save size={20} />}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {editing ? (
          <div style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(30px)',
            borderRadius: '30px',
            padding: '60px',
            boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Edit Profile Information
            </h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '30px',
                marginBottom: '40px'
              }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '10px'
                  }}>
                    <User size={20} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '20px 25px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255,255,255,0.8)'
                    }}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '10px'
                  }}>
                    <Phone size={20} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '20px 25px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255,255,255,0.8)'
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '10px'
                  }}>
                    <MapPin size={20} />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '20px 25px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255,255,255,0.8)'
                    }}
                    placeholder="Enter your location"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '10px'
                  }}>
                    <Globe size={20} />
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '20px 25px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255,255,255,0.8)'
                    }}
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  About Me
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '20px 25px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '20px',
                    fontSize: '16px',
                    resize: 'vertical',
                    transition: 'all 0.3s ease',
                    background: 'rgba(255,255,255,0.8)',
                    fontFamily: 'inherit'
                  }}
                  placeholder="Tell us about yourself, your interests, and your learning goals..."
                />
              </div>
            </form>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Profile Details */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '30px',
              padding: '60px',
              boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '40px'
              }}>
                Profile Information
              </h2>
              <div style={{ display: 'grid', gap: '25px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '25px',
                  background: 'rgba(248,250,252,0.5)',
                  borderRadius: '20px',
                  borderRight: '5px solid #667eea'
                }}>
                  <User size={24} color="#667eea" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Name</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                      {user?.name || 'Not provided'}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '25px',
                  background: 'rgba(248,250,252,0.5)',
                  borderRadius: '20px',
                  borderRight: '5px solid #10b981'
                }}>
                  <Mail size={24} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Email</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '25px',
                  background: 'rgba(248,250,252,0.5)',
                  borderRadius: '20px',
                  borderRight: '5px solid #f59e0b'
                }}>
                  <Phone size={24} color="#f59e0b" />
                  <div>
                    <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Phone</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>
                      {user?.phone || 'Not provided'}
                    </div>
                  </div>
                </div>

                {user?.website && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '25px',
                    background: 'rgba(248,250,252,0.5)',
                    borderRadius: '20px',
                    borderRight: '5px solid #ef4444'
                  }}>
                    <Globe size={24} color="#ef4444" />
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Website</div>
                      <a 
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#667eea',
                          textDecoration: 'none'
                        }}
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                )}

                <div style={{
                  padding: '30px',
                  background: 'rgba(248,250,252,0.5)',
                  borderRadius: '20px',
                  borderRight: '5px solid #8b5cf6'
                }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    fontWeight: '600', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    About Me
                  </div>
                  <p style={{
                    fontSize: '18px',
                    color: '#1f2937',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {user?.bio || 'No bio provided yet. Click "Edit Profile" to add your bio.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            {user?.role === 'student' && (
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(30px)',
                borderRadius: '30px',
                padding: '60px',
                boxShadow: '0 35px 80px rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#1f2937',
                  marginBottom: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <BookOpen size={32} color="#667eea" />
                  Learning Statistics
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '30px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))',
                    borderRadius: '25px',
                    border: '2px solid rgba(102,126,234,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#667eea', marginBottom: '15px' }}>12</div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '700' }}>Courses Enrolled</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.1))',
                    borderRadius: '25px',
                    border: '2px solid rgba(16,185,129,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#10b981', marginBottom: '15px' }}>4</div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '700' }}>Completed</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(251,191,36,0.1))',
                    borderRadius: '25px',
                    border: '2px solid rgba(245,158,11,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#f59e0b', marginBottom: '15px' }}>127h</div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '700' }}>Total Learning</div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(168,85,247,0.1))',
                    borderRadius: '25px',
                    border: '2px solid rgba(139,92,246,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', fontWeight: '900', color: '#8b5cf6', marginBottom: '15px' }}>8</div>
                    <div style={{ fontSize: '16px', color: '#374151', fontWeight: '700' }}>Certificates</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
