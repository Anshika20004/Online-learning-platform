import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Users, Clock, Star, Play, BookOpen, Award, Check, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock course data - Replace with API call
    const mockCourse = {
      _id: id,
      title: 'Complete Web Development Bootcamp',
      description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more with hands-on projects. This comprehensive course will take you from beginner to advanced level in web development.',
      longDescription: `This comprehensive web development course covers everything you need to know to become a professional web developer. You'll start with the basics of HTML and CSS, then move on to JavaScript programming, modern frameworks like React, and backend development with Node.js.

The course is project-based, meaning you'll build real-world applications as you learn. By the end of this course, you'll have a portfolio of projects to show potential employers and the skills to build modern web applications from scratch.`,
      instructor: { 
        name: 'John Smith', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        bio: 'Senior Full Stack Developer with 8+ years of experience at top tech companies.',
        students: 15000,
        courses: 12,
        rating: 4.8
      },
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=400&fit=crop',
      level: 'Beginner',
      category: 'Web Development',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      price: 99,
      originalPrice: 149,
      rating: 4.7,
      reviewsCount: 324,
      studentsEnrolled: 1250,
      duration: '40h 30m',
      lastUpdated: 'August 2025',
      language: 'English',
      features: [
        '40.5 hours on-demand video',
        '15 articles',
        '12 downloadable resources',
        'Full lifetime access',
        'Access on mobile and TV',
        'Certificate of completion'
      ],
      learningObjectives: [
        'Build modern websites with HTML5, CSS3, and JavaScript',
        'Master React.js for building interactive user interfaces',
        'Create backend APIs with Node.js and Express',
        'Work with databases using MongoDB',
        'Deploy applications to production',
        'Build a complete full-stack application'
      ],
      curriculum: [
        {
          id: 1,
          title: 'Introduction to Web Development',
          lessons: [
            { id: 1, title: 'Welcome to the Course', duration: '5:30', free: true },
            { id: 2, title: 'Setting Up Your Development Environment', duration: '12:45', free: true },
            { id: 3, title: 'Overview of Web Technologies', duration: '8:20', free: false }
          ]
        },
        {
          id: 2,
          title: 'HTML Fundamentals',
          lessons: [
            { id: 4, title: 'HTML Structure and Syntax', duration: '15:30', free: false },
            { id: 5, title: 'Working with Text and Lists', duration: '18:45', free: false },
            { id: 6, title: 'Links and Images', duration: '12:20', free: false },
            { id: 7, title: 'Forms and Input Elements', duration: '22:15', free: false }
          ]
        },
        {
          id: 3,
          title: 'CSS Styling',
          lessons: [
            { id: 8, title: 'CSS Basics and Selectors', duration: '16:30', free: false },
            { id: 9, title: 'Box Model and Layout', duration: '25:45', free: false },
            { id: 10, title: 'Flexbox and Grid', duration: '28:20', free: false },
            { id: 11, title: 'Responsive Design', duration: '19:15', free: false }
          ]
        },
        {
          id: 4,
          title: 'JavaScript Programming',
          lessons: [
            { id: 12, title: 'Variables and Data Types', duration: '20:30', free: false },
            { id: 13, title: 'Functions and Scope', duration: '24:45', free: false },
            { id: 14, title: 'DOM Manipulation', duration: '32:20', free: false },
            { id: 15, title: 'Event Handling', duration: '18:15', free: false }
          ]
        }
      ],
      reviews: [
        {
          id: 1,
          user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop' },
          rating: 5,
          comment: 'Excellent course! Very comprehensive and well-explained. The projects are practical and helped me build a strong portfolio.',
          date: '2 weeks ago'
        },
        {
          id: 2,
          user: { name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop' },
          rating: 4,
          comment: 'Great course for beginners. The instructor explains concepts clearly and the pacing is perfect.',
          date: '1 month ago'
        }
      ]
    };

    setCourse(mockCourse);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          background: 'rgba(255,255,255,0.1)',
          padding: '60px 40px',
          borderRadius: '30px',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '6px solid rgba(255,255,255,0.3)',
            borderTop: '6px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 30px'
          }} />
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Loading Course Details...</h2>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          background: 'rgba(255,255,255,0.1)',
          padding: '60px 40px',
          borderRadius: '30px',
          backdropFilter: 'blur(20px)',
          maxWidth: '500px'
        }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Course Not Found</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>The course you're looking for doesn't exist.</p>
          <Link to="/courses" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 36px',
            background: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: '700',
            fontSize: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '40px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(102,126,234,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(118,75,162,0.06) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        
        {/* Course Header */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(30px)',
          borderRadius: '30px',
          padding: '50px',
          boxShadow: '0 35px 80px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          marginBottom: '50px',
          display: 'grid',
          gridTemplateColumns: '1fr 450px',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Course Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '30px',
              color: '#64748b',
              fontSize: '16px'
            }}>
              <Link to="/courses" style={{
                color: '#667eea',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ChevronLeft size={18} /> Courses
              </Link>
              <span>/ {course.category}</span>
            </div>

            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #1e293b, #334155)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '25px',
              lineHeight: '1.2'
            }}>
              {course.title}
            </h1>

            <p style={{
              fontSize: '20px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '40px',
              maxWidth: '800px'
            }}>
              {course.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '40px',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(16,185,129,0.1)',
                padding: '15px 25px',
                borderRadius: '25px',
                color: '#059669'
              }}>
                <Star size={20} fill="#10b981" />
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{course.rating}</span>
                <span style={{ fontSize: '16px' }}>({course.reviewsCount} reviews)</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(59,130,246,0.1)',
                padding: '15px 25px',
                borderRadius: '25px',
                color: '#1e40af'
              }}>
                <Users size={20} />
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{course.studentsEnrolled.toLocaleString()}</span>
                <span>students</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(245,158,11,0.1)',
                padding: '15px 25px',
                borderRadius: '25px',
                color: '#d97706'
              }}>
                <Clock size={20} />
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{course.duration}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(139,92,246,0.1)',
                padding: '15px 25px',
                borderRadius: '25px',
                color: '#7c3aed'
              }}>
                <BookOpen size={20} />
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{course.level}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '25px',
              marginBottom: '30px',
              padding: '25px',
              background: 'rgba(248,250,252,0.5)',
              borderRadius: '20px',
              borderRight: '5px solid #667eea'
            }}>
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              />
              <div>
                <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '5px' }}>Created by</div>
                <Link to={`/instructor/${course.instructor.name}`} style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#1e293b',
                  textDecoration: 'none'
                }}>
                  {course.instructor.name}
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  marginBottom: '25px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
              />
              <button style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
                e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              >
                <Play size={24} color="#667eea" />
              </button>
              <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Preview Course</div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #10b981, #34d399)',
              color: 'white',
              padding: '40px',
              borderRadius: '25px',
              boxShadow: '0 25px 50px rgba(16,185,129,0.3)',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '42px',
                fontWeight: '900',
                marginBottom: '15px',
                textShadow: '0 5px 20px rgba(0,0,0,0.3)'
              }}>
                ${course.price}
              </div>
              {course.originalPrice && (
                <div style={{
                  fontSize: '18px',
                  textDecoration: 'line-through',
                  opacity: 0.8,
                  marginBottom: '30px'
                }}>
                  ${course.originalPrice}
                </div>
              )}
              <button style={{
                width: '100%',
                padding: '20px',
                background: 'white',
                color: '#059669',
                border: 'none',
                borderRadius: '20px',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 20px 45px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
              }}
              >
                <ShoppingCart size={20} style={{ display: 'inline', marginRight: '10px' }} />
                Enroll Now - Secure Your Spot
              </button>
              <button style={{
                width: '100%',
                padding: '15px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                ❤️ Add to Wishlist
              </button>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '35px',
              borderRadius: '25px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <h3 style={{ 
                fontSize: '22px', 
                fontWeight: '800', 
                color: '#1e293b', 
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Check size={24} color="#10b981" />
                This course includes:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {course.features.map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px 0',
                    borderBottom: index < course.features.length - 1 ? '1px solid #f1f5f9' : 'none',
                    color: '#475569'
                  }}>
                    <Check size={20} color="#10b981" />
                    <span style={{ fontSize: '16px' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(30px)',
          borderRadius: '30px',
          padding: '10px 40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.3)',
          marginBottom: '50px'
        }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            padding: '10px 0'
          }}>
            {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
              <button
                key={tab}
                style={{
                  padding: '18px 32px',
                  background: activeTab === tab ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                  color: activeTab === tab ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: activeTab === tab ? '800' : '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                  boxShadow: activeTab === tab ? '0 10px 30px rgba(102,126,234,0.3)' : 'none'
                }}
                onClick={() => setActiveTab(tab)}
                onMouseOver={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = 'rgba(102,126,234,0.1)';
                    e.target.style.color = '#667eea';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#64748b';
                  }
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(30px)',
          borderRadius: '30px',
          padding: '60px',
          boxShadow: '0 35px 80px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1e293b', marginBottom: '25px' }}>
                  About This Course
                </h2>
                <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.8', maxWidth: '900px' }}>
                  {course.longDescription}
                </p>
              </div>

              <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1e293b', marginBottom: '30px' }}>
                  What You'll Learn
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px' }}>
                  {course.learningObjectives.map((objective, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '20px',
                      padding: '25px',
                      background: 'rgba(248,250,252,0.7)',
                      borderRadius: '20px',
                      borderLeft: '5px solid #667eea'
                    }}>
                      <Check size={24} color="#667eea" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.6' }}>{objective}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1e293b', marginBottom: '25px' }}>
                  Requirements
                </h2>
                <ul style={{
                  fontSize: '18px',
                  color: '#475569',
                  lineHeight: '1.8',
                  maxWidth: '700px',
                  paddingLeft: '30px'
                }}>
                  <li style={{ marginBottom: '15px' }}>No prior programming experience required</li>
                  <li style={{ marginBottom: '15px' }}>A computer with internet connection</li>
                  <li style={{ marginBottom: '15px' }}>Willingness to learn and practice</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '40px',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                  Course Curriculum
                </h2>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <span>{course.curriculum.length} sections</span>
                  <span>•</span>
                  <span>{course.curriculum.reduce((total, section) => total + section.lessons.length, 0)} lectures</span>
                  <span>•</span>
                  <span>{course.duration} total length</span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '30px' }}>
                {course.curriculum.map((section) => (
                  <div key={section.id} style={{
                    background: 'rgba(255,255,255,1)',
                    borderRadius: '25px',
                    padding: '40px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '30px',
                      paddingBottom: '25px',
                      borderBottom: '2px solid #f1f5f9'
                    }}>
                      <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: '800', 
                        color: '#1e293b', 
                        margin: 0 
                      }}>
                        {section.title}
                      </h3>
                      <span style={{ 
                        background: 'rgba(102,126,234,0.1)', 
                        color: '#667eea', 
                        padding: '8px 20px', 
                        borderRadius: '20px', 
                        fontSize: '15px',
                        fontWeight: '700'
                      }}>
                        {section.lessons.length} lessons
                      </span>
                    </div>
                    <div style={{ display: 'grid', gap: '15px' }}>
                      {section.lessons.map((lesson) => (
                        <div key={lesson.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px 25px',
                          background: lesson.free ? 'rgba(16,185,129,0.1)' : 'rgba(248,250,252,0.5)',
                          borderRadius: '20px',
                          borderLeft: lesson.free ? '4px solid #10b981' : '4px solid #e2e8f0'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <Play size={18} color="#64748b" />
                            <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                              {lesson.title}
                            </span>
                            {lesson.free && (
                              <span style={{
                                background: '#10b981',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '700'
                              }}>
                                FREE
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add other tabs (instructor, reviews) similarly with premium styling */}
          {activeTab === 'instructor' && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h2>Instructor Tab Content</h2>
              <p>Premium instructor profile coming soon...</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <h2>Reviews Tab Content</h2>
              <p>Premium reviews section coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default CourseDetailPage;
