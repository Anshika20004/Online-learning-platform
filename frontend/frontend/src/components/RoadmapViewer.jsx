import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoadmapViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [roadmapData, setRoadmapData] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [progress, setProgress] = useState(0);

  const { courseId, courseName, level } = location.state || {};

  useEffect(() => {
    if (!courseId || !courseName || !level) {
      navigate('/courses');
      return;
    }

    // Mock AI-generated roadmap (real mein backend se aayega)
    const mockRoadmap = generateMockRoadmap(courseName, level);
    setRoadmapData(mockRoadmap);
    setProgress(15); // Demo progress
  }, [courseId, courseName, level, navigate]);

  const generateMockRoadmap = (courseName, level) => {
    const weeks = 12;
    const roadmap = {
      courseName,
      level,
      totalWeeks: weeks,
      currentWeek: 1,
      progress: 15,
      weeks: Array.from({ length: weeks }, (_, i) => ({
        week: i + 1,
        title: `Week ${i + 1}: ${getWeekTitle(courseName, level, i)}`,
        topics: getWeekTopics(courseName, i),
        resources: [
          `📚 Lesson ${i + 1}`,
          `🎥 Video Tutorial ${i + 1}`,
          `📝 Practice Exercise ${i + 1}`,
          `✅ Quiz ${i + 1}`
        ],
        completed: i < 2, // First 2 weeks completed
        duration: `${3 + Math.floor(Math.random() * 3)}h`
      }))
    };
    return roadmap;
  };

  const getWeekTitle = (courseName, level, weekIndex) => {
    const titles = {
      'Complete Web Development Bootcamp': [
        'HTML & CSS Fundamentals', 'Advanced CSS & Flexbox', 'JavaScript Basics',
        'DOM Manipulation', 'ES6+ Features', 'React Introduction', 'React Hooks',
        'React Router', 'State Management', 'Node.js Basics', 'Express API',
        'Database Integration', 'Deployment'
      ],
      'React for Beginners': [
        'React Setup & JSX', 'Components & Props', 'State & Events', 'Conditional Rendering',
        'Lists & Keys', 'Forms Handling', 'useEffect Hook', 'Custom Hooks',
        'Context API', 'Routing', 'Performance', 'Testing'
      ],
      'Python Data Science': [
        'Python Basics', 'NumPy Arrays', 'Pandas DataFrames', 'Data Visualization',
        'Data Cleaning', 'Statistics Basics', 'Linear Regression', 'Logistic Regression',
        'Decision Trees', 'Clustering', 'Neural Networks', 'Deployment'
      ]
    };
    return titles[courseName]?.[weekIndex] || `Week ${weekIndex + 1} Content`;
  };

  const getWeekTopics = (courseName, weekIndex) => {
    const allTopics = {
      'Complete Web Development Bootcamp': [
        ['HTML5 Semantic Tags', 'CSS Selectors & Properties', 'Box Model', 'Responsive Design Basics'],
        ['Flexbox Layouts', 'CSS Grid', 'Transitions & Animations', 'SASS/SCSS Basics'],
        ['Variables & Data Types', 'Functions & Scope', 'Arrays & Objects', 'Loops & Conditionals'],
        ['Selecting Elements', 'Event Listeners', 'Modifying Styles', 'Creating Elements Dynamically'],
        ['Arrow Functions', 'Destructuring', 'Spread & Rest Operators', 'Promises & Async/Await'],
        ['What is React?', 'JSX Syntax', 'Virtual DOM', 'Setting up Vite/CRA'],
        ['useState Hook', 'useEffect Hook', 'useRef Hook', 'Custom Hooks Concept'],
        ['React Router DOM', 'Route Parameters', 'Nested Routes', 'Programmatic Navigation'],
        ['Context API', 'Redux Basics', 'Redux Toolkit', 'Global State vs Local State'],
        ['Intro to Node.js', 'NPM & Modules', 'File System Operations', 'Basic HTTP Server'],
        ['Express Routing', 'Middleware', 'Request/Response Cycle', 'Error Handling'],
        ['MongoDB Basics', 'Mongoose Models', 'CRUD Operations', 'Relationships'],
        ['Environment Variables', 'Hosting on Vercel/Heroku', 'CI/CD Basics', 'Production Build']
      ],
      'React for Beginners': [
        ['Node.js & NPM Installation', 'Vite vs CRA', 'JSX Syntax & Rules', 'First React Component'],
        ['Functional Components', 'Passing Properties (Props)', 'Children Props', 'Destructuring Props'],
        ['Managing State (useState)', 'Handling User Clicks', 'Form Inputs State', 'State Lifting'],
        ['If/Else Rendering', 'Ternary Operators', 'Logical && Operator', 'Hiding/Showing Elements'],
        ['Mapping over Arrays', 'List Rendering', 'Why Keys are Important', 'Filtering Lists'],
        ['Controlled Components', 'Handling Submissions', 'Multiple Inputs state', 'Form Validation'],
        ['Component Lifecycle', 'Fetching API Data', 'Cleanup Functions', 'Dependency Array'],
        ['Why Custom Hooks?', 'Extracting Logic', 'useLocalStorage Hook', 'useFetch Hook'],
        ['Prop Drilling Problem', 'Creating Context', 'Context Provider & Consumer', 'useContext Hook'],
        ['Installing React Router', 'Defining Routes', 'Links & NavLinks', 'Handling 404 Pages'],
        ['React.memo', 'useMemo Hook', 'useCallback Hook', 'Code Splitting (Suspense)'],
        ['Vitest / Jest Setup', 'Testing Components', 'Mocking Functions', 'Testing User Interactions']
      ],
      'Python Data Science': [
        ['Python Syntax', 'Lists & Dictionaries', 'Functions & Lambdas', 'List Comprehensions'],
        ['Creating ndarrays', 'Array Operations', 'Indexing & Slicing', 'Mathematical Functions'],
        ['Series vs DataFrames', 'Reading CSV/Excel', 'Filtering Data', 'Grouping & Aggregation'],
        ['Matplotlib Basics', 'Seaborn Integration', 'Line & Bar Charts', 'Histograms & Scatter Plots'],
        ['Handling Missing Values', 'Removing Duplicates', 'Data Type Conversion', 'Outlier Detection'],
        ['Mean, Median, Mode', 'Variance & Standard Deviation', 'Probability Basics', 'Hypothesis Testing'],
        ['Simple Linear Regression', 'Multiple Regression', 'Model Evaluation (R-squared)', 'Train/Test Split'],
        ['Classification Concept', 'Sigmoid Function', 'Confusion Matrix', 'ROC Curve'],
        ['Tree Architecture', 'Entropy & Info Gain', 'Random Forests', 'Hyperparameter Tuning'],
        ['K-Means Algorithm', 'Selecting K (Elbow Method)', 'Hierarchical Clustering', 'PCA for visualizing'],
        ['Perceptrons', 'Activation Functions', 'TensorFlow/Keras Intro', 'Building a Simple ANN'],
        ['Pickling Models', 'Flask/FastAPI Basics', 'Creating API Endpoints', 'Deploying to Streamlit']
      ]
    };
    
    return allTopics[courseName]?.[weekIndex] || [
      `Key concept introduction for Week ${weekIndex + 1}`,
      `Practical hands-on lab exercises`,
      `Real-world implementation rules`
    ];
  };

  const handleWeekClick = (weekIndex) => {
    setCurrentWeek(weekIndex);
  };

  const handleStartWeek = () => {
    // Mark current week as started
    alert(`🚀 Starting Week ${currentWeek + 1}! Check your dashboard.`);
    navigate('/dashboard');
  };

  if (!roadmapData) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid #f3f4f6',
          borderTop: '6px solid #6c5ce7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 0',
      overflowX: 'auto'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{
            fontSize: '52px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #fff 0%, #f0f9ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px'
          }}>
            🎯 Your Personalized Roadmap
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ color: '#fff', fontSize: '18px', fontWeight: '600' }}>
                {roadmapData.courseName}
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '12px 24px',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ 
                color: '#fff', 
                fontSize: '18px', 
                fontWeight: '700',
                padding: '6px 16px',
                background: level === 'Low' ? '#ef4444' : level === 'Medium' ? '#f59e0b' : '#10b981',
                borderRadius: '20px'
              }}>
                {level} Level
              </span>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '20px 40px',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#fff' }}>
                  {roadmapData.currentWeek}/{roadmapData.totalWeeks}
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '14px' }}>Current Week</div>
              </div>
              <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: '#fff' }}>
                  {progress}%
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '14px' }}>Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            padding: '4px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '20px',
              background: 'linear-gradient(90deg, #10b981, #34d399)',
              borderRadius: '16px',
              transition: 'width 0.8s ease',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {progress}%
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'start' }}>
          {/* Weeks Timeline */}
          <div style={{ flex: '0 0 280px' }}>
            <h3 style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: '700',
              marginBottom: '24px'
            }}>
              📅 12-Week Journey
            </h3>
            <div style={{
              maxHeight: '600px',
              overflowY: 'auto',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              padding: '20px'
            }}>
              {roadmapData.weeks.map((week, index) => (
                <div
                  key={week.week}
                  onClick={() => handleWeekClick(index)}
                  style={{
                    marginBottom: '16px',
                    padding: '20px',
                    borderRadius: '16px',
                    background: currentWeek === index 
                      ? 'rgba(255,255,255,0.3)' 
                      : week.completed 
                      ? 'rgba(16,185,129,0.3)' 
                      : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: currentWeek === index ? '2px solid rgba(255,255,255,0.5)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (currentWeek !== index) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (currentWeek !== index) {
                      e.currentTarget.style.background = week.completed 
                        ? 'rgba(16,185,129,0.3)' 
                        : 'rgba(255,255,255,0.1)';
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: week.completed ? '#10b981' : currentWeek === index ? '#fff' : '#6c5ce7',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '14px'
                    }}>
                      {week.completed ? '✅' : currentWeek === index ? '🎯' : week.week}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', color: '#fff', fontSize: '16px' }}>
                        {week.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                        {week.duration}
                      </div>
                    </div>
                  </div>
                  {week.completed && (
                    <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '600' }}>
                      Completed ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Week Details */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '24px'
              }}>
                Week {currentWeek + 1}: {roadmapData.weeks[currentWeek]?.title}
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginBottom: '32px'
              }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>
                    📋 Topics Covered
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {roadmapData.weeks[currentWeek]?.topics.map((topic, i) => (
                      <div key={i} style={{
                        padding: '12px 16px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        borderLeft: '4px solid #6c5ce7',
                        color: '#374151',
                        fontWeight: '600'
                      }}>
                        • {topic}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#374151', marginBottom: '12px' }}>
                    📚 Learning Resources
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {roadmapData.weeks[currentWeek]?.resources.map((resource, i) => (
                      <div key={i} style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, #6c5ce7, #764ba2)',
                        color: '#fff',
                        borderRadius: '12px',
                        textAlign: 'center',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 15px 30px rgba(108, 92, 231, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        {resource}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Week Button */}
              <button
                onClick={handleStartWeek}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: 'linear-gradient(135deg, #10b981, #34d399)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                }}
              >
                🚀 Start Week {currentWeek + 1} Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapViewer;
