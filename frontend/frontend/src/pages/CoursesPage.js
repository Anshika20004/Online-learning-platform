import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    price: '',
    search: ''
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate(); // ✅ NEW: Navigation ke liye

  useEffect(() => {
    // Get initial filters from URL
    setFilters({
      category: searchParams.get('category') || '',
      level: searchParams.get('level') || '',
      price: searchParams.get('price') || '',
      search: searchParams.get('search') || ''
    });
    
    // Mock courses data
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: 'Complete Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more with hands-on projects.',
          thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
          instructor: {
            name: 'John Smith',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop'
          },
          category: 'Web Development',
          level: 'Beginner',
          price: 99,
          originalPrice: 149,
          rating: 4.7,
          reviewsCount: 324,
          studentsEnrolled: 1250,
          duration: '40h 30m',
          lessons: 85,
          lastUpdated: 'August 2025'
        },
        {
          id: 2,
          title: 'React for Beginners',
          description: 'Master React.js with hands-on projects and modern development practices.',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
          instructor: {
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop'
          },
          category: 'Web Development',
          level: 'Intermediate',
          price: 79,
          originalPrice: null,
          rating: 4.8,
          reviewsCount: 267,
          studentsEnrolled: 890,
          duration: '25h 15m',
          lessons: 42,
          lastUpdated: 'July 2025'
        },
        // ... baaki courses same rahenge
        {
          id: 3,
          title: 'Python Data Science',
          description: 'Data analysis and machine learning with Python, pandas, and scikit-learn.',
          thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop',
          instructor: {
            name: 'Dr. Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop'
          },
          category: 'Data Science',
          level: 'Intermediate',
          price: 119,
          originalPrice: 159,
          rating: 4.6,
          reviewsCount: 189,
          studentsEnrolled: 567,
          duration: '35h 20m',
          lessons: 68,
          lastUpdated: 'August 2025'
        },
        {
          id: 4,
          title: 'UI/UX Design Fundamentals',
          description: 'Create beautiful user interfaces and exceptional user experiences.',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop',
          instructor: {
            name: 'Emma Wilson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
          },
          category: 'Design',
          level: 'Beginner',
          price: 0,
          originalPrice: null,
          rating: 4.5,
          reviewsCount: 412,
          studentsEnrolled: 2100,
          duration: '20h 45m',
          lessons: 32,
          lastUpdated: 'June 2025'
        },
        {
          id: 5,
          title: 'Mobile App Development with Flutter',
          description: 'Build beautiful native apps for iOS and Android using Flutter.',
          thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
          instructor: {
            name: 'Alex Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
          },
          category: 'Mobile Development',
          level: 'Advanced',
          price: 149,
          originalPrice: 199,
          rating: 4.9,
          reviewsCount: 156,
          studentsEnrolled: 342,
          duration: '45h 30m',
          lessons: 78,
          lastUpdated: 'August 2025'
        },
        {
          id: 6,
          title: 'Digital Marketing Mastery',
          description: 'Learn SEO, social media marketing, email marketing, and PPC advertising.',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
          instructor: {
            name: 'Lisa Park',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop'
          },
          category: 'Marketing',
          level: 'Beginner',
          price: 89,
          originalPrice: 129,
          rating: 4.4,
          reviewsCount: 298,
          studentsEnrolled: 876,
          duration: '30h 15m',
          lessons: 56,
          lastUpdated: 'July 2025'
        }
      ];
      
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  // ✅ NEW: Purchase handler with assessment test redirect
  const handlePurchase = (course) => {
    // Simulate purchase (real mein Razorpay/Stripe integrate hoga)
    console.log('Purchasing course:', course.title);
    
    // LocalStorage mein course save karo (demo ke liye)
    const purchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
    if (!purchasedCourses.find(c => c.id === course.id)) {
      purchasedCourses.push(course);
      localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
    }
    
    // 🎯 ASSESSMENT TEST PE REDIRECT
    navigate('/assessment-test', { 
      state: { 
        courseId: course.id, 
        courseName: course.title,
        coursePrice: course.price,
        courseCategory: course.category
      } 
    });
    
    alert(`✅ ${course.title} purchased successfully!\n🎯 Redirecting to Assessment Test...`);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) newParams.set(key, val);
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      price: '',
      search: ''
    });
    setSearchParams({});
  };

  const filteredCourses = courses.filter(course => {
    if (filters.category && course.category !== filters.category) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.price === 'free' && course.price !== 0) return false;
    if (filters.price === 'paid' && course.price === 0) return false;
    if (filters.search && !course.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #6c5ce7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 0'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            📚 Explore Courses
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover thousands of courses taught by expert instructors
          </p>
        </div>

        {/* Filters - same as before */}
        <div style={{
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            alignItems: 'end'
          }}>
            {/* Search, Category, Level, Price, Clear Filters - same code */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                🔍 Search Courses
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by title..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c5ce7'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                📂 Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Categories</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                📊 Level
              </label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                💰 Price
              </label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange('price', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <button
                onClick={clearFilters}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.color = '#374151';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.color = '#6b7280';
                }}
              >
                🗑️ Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '24px' }}>
          <p style={{
            fontSize: '16px',
            color: '#6b7280'
          }}>
            Showing {filteredCourses.length} of {courses.length} courses
            {(filters.category || filters.level || filters.price || filters.search) && (
              <span> (filtered)</span>
            )}
          </p>
        </div>

        {/* Courses Grid - MAIN CHANGE YAHAN */}
        {filteredCourses.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              No courses found
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              marginBottom: '24px'
            }}>
              Try adjusting your filters to find more courses
            </p>
            <button
              onClick={clearFilters}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c5ce7',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredCourses.map(course => (
              <div
                key={course.id}
                style={{
                  backgroundColor: '#fff',
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
                {/* Course Image */}
                <div style={{ position: 'relative' }}>
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  {/* Level Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {course.level}
                  </div>
                  {/* Free Badge */}
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
                
                {/* Course Content */}
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
                    lineHeight: '1.5',
                    marginBottom: '16px'
                  }}>
                    {course.description}
                  </p>
                 
                  {/* Instructor */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <img 
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {course.instructor.name}
                    </span>
                  </div>
                 
                  {/* Course Meta */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>⭐</span>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{course.rating}</span>
                      <span>({course.reviewsCount})</span>
                    </div>
                    <div>
                      👥 {course.studentsEnrolled.toLocaleString()}
                    </div>
                    <div>
                      ⏱️ {course.duration}
                    </div>
                  </div>
                 
                  {/* Price & Purchase Button - MAIN CHANGE */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px'
                  }}>
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
                        fontSize: '24px',
                        fontWeight: '700',
                        color: course.price === 0 ? '#10b981' : '#1f2937'
                      }}>
                        {course.price === 0 ? 'FREE' : `$${course.price}`}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>
                      {course.lessons} lessons
                    </div>
                  </div>

                  {/* ✅ NEW PURCHASE BUTTON */}
                  <button
                    onClick={() => handlePurchase(course)}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    {course.price === 0 ? '🎯 Start Free Course' : '🛒 Purchase & Start Test'}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s'
                    }} />
                  </button>
                  
                  {/* Course Details Link */}
                  <Link
                    to={`/course/${course.id}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      marginTop: '12px',
                      color: '#6c5ce7',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    👁️ View Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
