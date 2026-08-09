import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ students: 0, courses: 0, instructors: 0 });

  useEffect(() => {
    // Mock data for demo
    setFeaturedCourses([
      {
        id: 1,
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React and more',
        image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
        price: 99,
        originalPrice: 149,
        rating: 4.7,
        students: 1250,
        instructor: 'John Smith'
      },
      {
        id: 2,
        title: 'Python Data Science',
        description: 'Master data analysis and machine learning',
        image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop',
        price: 119,
        originalPrice: 159,
        rating: 4.6,
        students: 567,
        instructor: 'Dr. Mike Chen'
      },
      {
        id: 3,
        title: 'UI/UX Design Fundamentals',
        description: 'Create beautiful user interfaces',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
        price: 0,
        originalPrice: null,
        rating: 4.5,
        students: 2100,
        instructor: 'Emma Wilson'
      }
    ]);

    setCategories([
      { name: 'Web Development', count: 45, icon: '💻', color: '#6c5ce7' },
      { name: 'Data Science', count: 28, icon: '📊', color: '#00b894' },
      { name: 'Design', count: 32, icon: '🎨', color: '#e84393' },
      { name: 'Mobile Development', count: 22, icon: '📱', color: '#0984e3' },
      { name: 'DevOps', count: 18, icon: '⚙️', color: '#fdcb6e' },
      { name: 'Marketing', count: 15, icon: '📈', color: '#e17055' }
    ]);

    setStats({ students: 25000, courses: 180, instructors: 95 });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #6c5ce7 0%, #a78bfa 100%)',
        color: '#fff',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Learn <span style={{ color: '#ffd32a' }}>Without</span> Limits 🚀
          </h1>
          <p style={{
            fontSize: '24px',
            marginBottom: '40px',
            opacity: 0.9,
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Join millions of learners worldwide. Master new skills with expert-led courses
            designed for real-world success.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '60px'
          }}>
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn btn-large"
                style={{
                  backgroundColor: '#fff',
                  color: '#6c5ce7',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
              >
                📊 Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-large"
                  style={{
                    backgroundColor: '#fff',
                    color: '#6c5ce7',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '18px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }}
                >
                  🎯 Start Learning Free
                </Link>
                <Link
                  to="/courses"
                  style={{
                    padding: '16px 32px',
                    borderRadius: '12px',
                    border: '2px solid #fff',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '18px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.color = '#6c5ce7';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#fff';
                  }}
                >
                  📚 Browse Courses
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                {stats.students.toLocaleString()}+
              </h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Students Learning</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                {stats.courses}+
              </h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>Expert Courses</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
                {stats.instructors}+
              </h3>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>World-Class Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              🌟 Featured Courses
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Hand-picked courses from our expert instructors
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {featuredCourses.map(course => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={course.image} 
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  {course.price === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#10b981',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      FREE
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {course.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    marginBottom: '16px',
                    lineHeight: '1.5'
                  }}>
                    {course.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#f59e0b' }}>⭐</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{course.rating}</span>
                      <span style={{ color: '#6b7280', fontSize: '14px' }}>
                        ({course.students.toLocaleString()})
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      By {course.instructor}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {course.originalPrice && (
                        <span style={{
                          color: '#9ca3af',
                          fontSize: '16px',
                          textDecoration: 'line-through'
                        }}>
                          ${course.originalPrice}
                        </span>
                      )}
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: course.price === 0 ? '#10b981' : '#1f2937'
                      }}>
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link
              to="/courses"
              className="btn btn-primary btn-large"
              style={{
                padding: '16px 32px',
                backgroundColor: '#6c5ce7',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5b52d6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6c5ce7'}
            >
              📚 View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '42px', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              🎯 Top Categories
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Explore courses in trending technology fields
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/courses?category=${category.name}`}
                style={{
                  background: '#fff',
                  padding: '32px 24px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: `2px solid ${category.color}20`
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = category.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = `${category.color}20`;
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  color: '#6b7280',
                  fontSize: '16px'
                }}>
                  {category.count} courses available
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '24px'
          }}>
            Ready to Start Learning? 🎓
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Join thousands of students already learning on EduLearn Pro.
            Start your journey today!
          </p>
          
          {!isAuthenticated && (
            <Link
              to="/register"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 36px',
                backgroundColor: '#6c5ce7',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#5b52d6';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#6c5ce7';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🚀 Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;