import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';
import { BatteryLow, Flame, BatteryMedium, PlayCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const { mood } = useMood();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [studentLevel, setStudentLevel] = useState(''); // ✅ NEW: Student Level

  useEffect(() => {
    // Mock data for demo
    const mockEnrolledCourses = [
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
        instructor: 'John Smith',
        progress: 65,
        totalLessons: 85,
        completedLessons: 55,
        level: 'Medium', // ✅ NEW
        lastAccessed: '2 hours ago',
        nextLesson: 'React Components Deep Dive'
      },
      {
        id: 2,
        title: 'Python Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop',
        instructor: 'Dr. Mike Chen',
        progress: 34,
        totalLessons: 68,
        completedLessons: 23,
        level: 'Low', // ✅ NEW
        lastAccessed: '1 day ago',
        nextLesson: 'Data Visualization with Matplotlib'
      },
      {
        id: 3,
        title: 'UI/UX Design Fundamentals',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        instructor: 'Emma Wilson',
        progress: 12,
        totalLessons: 32,
        completedLessons: 4,
        level: 'High', // ✅ NEW
        lastAccessed: '3 days ago',
        nextLesson: 'User Research Methods'
      }
    ];

    // ✅ NEW: Load student level from localStorage (AI test se aaya hoga)
    const savedLevel = localStorage.getItem('studentLevel');
    if (savedLevel) {
      const levelData = JSON.parse(savedLevel);
      setStudentLevel(levelData.level || '');
    }

    const mockStats = user?.role === 'student' ? {
      coursesEnrolled: 3,
      coursesCompleted: 1,
      totalWatchTime: 47,
      certificatesEarned: 1,
      currentStreak: 5
    } : {
      totalCourses: 8,
      totalStudents: 2450,
      totalEarnings: 18750,
      avgRating: 4.8,
      totalReviews: 234
    };

    const mockActivity = [
      {
        id: 1,
        type: 'lesson_completed',
        title: 'Completed: JavaScript Async/Await',
        course: 'Web Development Bootcamp',
        time: '2 hours ago',
        icon: '✅'
      },
      {
        id: 2,
        type: 'quiz_passed',
        title: 'Passed React Quiz with 95%',
        course: 'Web Development Bootcamp', 
        time: '1 day ago',
        icon: '🎯'
      },
      {
        id: 3,
        type: 'course_started',
        title: 'Started Python Data Science',
        course: 'Python Data Science',
        time: '2 days ago',
        icon: '🚀'
      },
      {
        id: 4,
        type: 'certificate_earned',
        title: 'Earned HTML/CSS Certificate',
        course: 'Web Fundamentals',
        time: '1 week ago',
        icon: '🏆'
      },
      // ✅ NEW: AI Assessment Activity
      {
        id: 5,
        type: 'ai_assessment',
        title: `AI Assessment: ${studentLevel || 'Not Completed'}`,
        course: 'Complete Web Development Bootcamp',
        time: 'Just now',
        icon: '🧠'
      }
    ];

    setEnrolledCourses(mockEnrolledCourses);
    setStats(mockStats);
    setRecentActivity(mockActivity);
  }, [user, studentLevel]);

  const formatProgress = (progress) => {
    return Math.round(progress);
  };

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'low': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'high': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPerfectSyllabus = () => {
    if (mood === 'low_energy') {
      return [
        { id: '1a', title: 'HTML Elements & Syntax Review', course: 'Complete Web Development Bootcamp', duration: '5 min summary', type: 'Basic' },
        { id: '2a', title: 'What is Python Data Science?', course: 'Python Data Science', duration: '3 min short video', type: 'Basic' },
        { id: '3a', title: 'Design Thinking: Empathy', course: 'UI/UX Design Fundamentals', duration: '4 min easy read', type: 'Basic' }
      ];
    } else if (mood === 'high_focus') {
      return [
        { id: '1c', title: 'Building a Complex React Redux Application', course: 'Complete Web Development Bootcamp', duration: '50 min lab', type: 'Advanced' },
        { id: '2c', title: 'Training Convolutional Neural Networks', course: 'Python Data Science', duration: '1.5 hrs challenge', type: 'Advanced' },
        { id: '3c', title: 'Creating Scalable Design Systems in Figma', course: 'UI/UX Design Fundamentals', duration: '45 min practice', type: 'Advanced' }
      ];
    } else {
      return [
        { id: '1b', title: 'React Array Methods & Filtering', course: 'Complete Web Development Bootcamp', duration: '20 min lesson', type: 'Normal' },
        { id: '2b', title: 'Pandas DataFrames Manipulation', course: 'Python Data Science', duration: '25 min lesson', type: 'Normal' },
        { id: '3b', title: 'Interactive Prototyping Basics', course: 'UI/UX Design Fundamentals', duration: '30 min task', type: 'Normal' }
      ];
    }
  };

  const currentSyllabus = getPerfectSyllabus();

  const getMoodColors = () => {
    if (mood === 'low_energy') return { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981', icon: <BatteryLow size={26} /> };
    if (mood === 'high_focus') return { bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', text: '#f97316', icon: <Flame size={26} /> };
    return { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#3b82f6', icon: <BatteryMedium size={26} /> };
  };
  const moodStyle = getMoodColors();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 0'
    }}>
      <div className="container">
        {/* Welcome Header - ✅ LEVEL BADGE ADDED */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          padding: '30px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'} 
              alt="Profile"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #6c5ce7'
              }}
            />
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                Welcome back, {user?.name}! 👋
              </h1>
              {/* ✅ NEW: Student Level Badge */}
              {studentLevel && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: getLevelColor(studentLevel)
                  }} />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: getLevelColor(studentLevel)
                  }}>
                    AI Level: {studentLevel}
                  </span>
                  <Link to="/roadmap" style={{ fontSize: '14px', color: '#6c5ce7' }}>
                    View Roadmap →
                  </Link>
                </div>
              )}
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                margin: 0
              }}>
                {user?.role === 'student' ? 
                  "Ready to continue your learning journey?" : 
                  "Let's check on your teaching progress"}
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <Link 
              to="/future-roadmap"
              style={{
                padding: '12px 24px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                color: '#8b5cf6',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#8b5cf6';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.1)';
                e.target.style.color = '#8b5cf6';
              }}
            >
              🔮 Future Roadmap
            </Link>
            
            <Link 
              to="/courses"
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c5ce7',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5b52d6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6c5ce7'}
            >
              📚 Browse Courses
            </Link>
            <Link 
              to="/profile"
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#6c5ce7',
                textDecoration: 'none',
                borderRadius: '8px',
                border: '2px solid #6c5ce7',
                fontWeight: '600',
                transition: 'all 0.2s ease'
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
              ⚙️ Edit Profile
            </Link>
          </div>
        </div>

        {/* Stats Grid - SAME */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {user?.role === 'student' ? (
            <>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>📚</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {stats.coursesEnrolled}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Courses Enrolled</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>🏆</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {stats.coursesCompleted}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Courses Completed</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>⏱️</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {stats.totalWatchTime}h
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Total Learning</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>🔥</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {stats.currentStreak}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Day Streak</p>
              </div>
            </>
          ) : (
            // Instructor Stats - SAME
            <>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📖</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>{stats.totalCourses}</h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Total Courses</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>{stats.totalStudents?.toLocaleString()}</h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Total Students</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>💰</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>${stats.totalEarnings?.toLocaleString()}</h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Total Earnings</p>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>⭐</div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>{stats.avgRating}</h3>
                <p style={{ color: '#6b7280', fontSize: '16px' }}>Average Rating</p>
              </div>
            </>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '32px'
        }}>
          <div>
            {/* ✨ NEW: Perfect Mood Plan Syllabus */}
            {user?.role === 'student' && (
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                marginBottom: '32px',
                border: `2px solid ${moodStyle.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '15px',
                    background: moodStyle.bg, color: moodStyle.text, display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {moodStyle.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                      ✨ Your Perfect Mood Plan
                    </h2>
                    <p style={{ color: '#6b7280', margin: '4px 0 0', fontSize: '15px' }}>
                      Hand-picked syllabus topics matching your current <strong style={{color: moodStyle.text}}>{mood === 'low_energy' ? 'Low Energy' : mood === 'high_focus' ? 'High Focus' : 'Normal'}</strong> state.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {currentSyllabus.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '18px 24px', borderRadius: '15px', background: '#f8fafc',
                      borderLeft: `4px solid ${moodStyle.text}`, transition: 'all 0.2s ease',
                      border: '1px solid #f1f5f9'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', background: moodStyle.text, color: 'white', padding: '4px 10px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {item.type}
                          </span>
                          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{item.course}</span>
                        </div>
                        <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{item.title}</h4>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600', padding: '6px 14px', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>⏱️ {item.duration}</span>
                        <Link to={`/course/1/lesson/1`} style={{
                          background: moodStyle.bg, color: moodStyle.text, padding: '12px',
                          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s', textDecoration: 'none'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <PlayCircle size={22} fill="currentColor" color="white" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Continue Learning / My Courses - ✅ LEVEL SHOW */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                {user?.role === 'student' ? '📖 Continue Learning' : '📚 My Courses'}
              </h2>
              <Link 
                to="/courses"
                style={{
                  color: '#6c5ce7',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                View All →
              </Link>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {enrolledCourses.map(course => (
                <div 
                  key={course.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <img 
                    src={course.thumbnail}
                    alt={course.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {course.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      marginBottom: '4px'
                    }}>
                      By {course.instructor}
                    </p>
                    {/* ✅ NEW: Course Level Badge */}
                    {course.level && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#f0f9ff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        marginBottom: '8px',
                        fontSize: '12px'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: getLevelColor(course.level)
                        }} />
                        <span style={{ fontWeight: '600', color: getLevelColor(course.level) }}>
                          Level: {course.level}
                        </span>
                      </div>
                    )}
                    
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${course.progress}%`,
                          height: '100%',
                          backgroundColor: '#6c5ce7',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {formatProgress(course.progress)}% • {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                      <Link
                        to={`/course/${course.id}/lesson/1`}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#6c5ce7',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* Recent Activity - SAME */}
          <div style={{
            backgroundColor: '#fff',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              🕒 Recent Activity
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {recentActivity.map(activity => (
                <div key={activity.id} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    {activity.icon}
                  </div>
                  <div>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '2px'
                    }}>
                      {activity.title}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginBottom: '2px'
                    }}>
                      {activity.course}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
