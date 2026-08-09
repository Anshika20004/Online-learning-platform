import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMood } from '../context/MoodContext';
import AIChatbox from '../components/AIChatbox';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  SkipBack, 
  SkipForward,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Home,
  FileText,
  FileEdit,
  X
} from 'lucide-react';

const VideoPlayerPage = () => {
  const { courseId, lessonId } = useParams();
  const { mood, isBoostMode, setShowBoostComplete } = useMood();
  const { user, addXp } = useAuth();
  
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  // Default hide sidebar for high_focus or boost mode
  const [showSidebar, setShowSidebar] = useState(mood !== 'high_focus' && !isBoostMode);
  const [openMaterial, setOpenMaterial] = useState(null); // 'syllabus' | 'notes' | null

  // Boost States
  const [boostTimeLeft, setBoostTimeLeft] = useState(300); // 5 mins
  const [boostQuizSubmitted, setBoostQuizSubmitted] = useState(false);
  const [boostAnswers, setBoostAnswers] = useState({});

  useEffect(() => {
    let interval = null;
    if (isBoostMode && boostTimeLeft > 0 && !boostQuizSubmitted) {
      interval = setInterval(() => setBoostTimeLeft(prev => prev - 1), 1000);
    } 
    return () => clearInterval(interval);
  }, [isBoostMode, boostTimeLeft, boostQuizSubmitted]);

  useEffect(() => {
    setShowSidebar(mood !== 'high_focus' && !isBoostMode);
  }, [mood, isBoostMode]);

  useEffect(() => {
    const getDummyCourse = (cId) => {
      if (cId === '2') {
        return {
          _id: '2', title: 'React for Beginners', instructor: { name: 'John Smith' },
          lessons: [
            { id: 1, title: 'React Setup & JSX', videoUrl: "https://www.youtube.com/embed/bMknfKXIFA8", duration: '15:30', durationInSeconds: 930, completed: true },
            { id: 2, title: 'Components & Props', videoUrl: "https://www.youtube.com/embed/Cla1WwguArA", duration: '28:45', durationInSeconds: 1725, completed: true },
            { id: 3, title: 'State & Events', videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0", duration: '32:15', durationInSeconds: 1935, completed: false },
            { id: 4, title: 'Hooks Fundamentals', videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM", duration: '45:20', durationInSeconds: 2720, completed: false }
          ]
        };
      } else if (cId === '3') {
        return {
          _id: '3', title: 'Python Data Science', instructor: { name: 'John Smith' },
          lessons: [
            { id: 1, title: 'Python Basics', videoUrl: "https://www.youtube.com/embed/vEQ8CXFWLZU", duration: '15:30', durationInSeconds: 930, completed: true },
            { id: 2, title: 'NumPy Arrays', videoUrl: "https://www.youtube.com/embed/QUT1VHiLmmI", duration: '28:45', durationInSeconds: 1725, completed: false },
            { id: 3, title: 'Pandas DataFrames', videoUrl: "https://www.youtube.com/embed/vmEHCJofslg", duration: '32:15', durationInSeconds: 1935, completed: false }
          ]
        };
      } else {
        return {
          _id: '1', title: 'Complete Web Development Bootcamp', instructor: { name: 'John Smith' },
          lessons: [
            { id: 1, title: 'Introduction to Web Development', videoUrl: "https://www.youtube.com/embed/HfTXHrWMGVY", duration: '15:30', durationInSeconds: 930, completed: true },
            { id: 2, title: 'HTML Fundamentals', videoUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg', duration: '28:45', durationInSeconds: 1725, completed: true },
            { id: 3, title: 'CSS Styling Basics', videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc', duration: '32:15', durationInSeconds: 1935, completed: false },
            { id: 4, title: 'JavaScript Essentials', videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk', duration: '45:20', durationInSeconds: 2720, completed: false },
            { id: 5, title: 'React Introduction', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8', duration: '38:15', durationInSeconds: 2295, completed: false }
          ]
        };
      }
    };

    const mockCourse = getDummyCourse(courseId);

    setCourse(mockCourse);
    
    const lesson = mockCourse.lessons.find(l => l.id === parseInt(lessonId));
    if (lesson) {
      setCurrentLesson(lesson);
      setDuration(lesson.durationInSeconds || 1800);
    }
  }, [courseId, lessonId]);

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);
  
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    const newTime = (newProgress / 100) * duration;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => setFullscreen(!fullscreen);
  
  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const goToNextLesson = () => {
    if (!course) return;
    const currentIndex = course.lessons.findIndex(l => l.id === parseInt(lessonId));
    if (currentIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentIndex + 1];
      window.location.href = `/course/${courseId}/lesson/${nextLesson.id}`;
    }
  };

  const goToPreviousLesson = () => {
    if (!course) return;
    const currentIndex = course.lessons.findIndex(l => l.id === parseInt(lessonId));
    if (currentIndex > 0) {
      const prevLesson = course.lessons[currentIndex - 1];
      window.location.href = `/course/${courseId}/lesson/${prevLesson.id}`;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!course || !currentLesson) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center', color: 'white',
          background: 'rgba(255,255,255,0.1)', padding: '60px 40px',
          borderRadius: '30px', backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            width: '80px', height: '80px', border: '6px solid rgba(255,255,255,0.3)',
            borderTop: '6px solid white', borderRadius: '50%',
            animation: 'spin 1s linear infinite', margin: '0 auto 30px'
          }} />
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Loading Lesson...</h2>
        </div>
      </div>
    );
  }

  // --- BOOST MODE LAYOUT ---
  if (isBoostMode) {
    return (
      <div style={{
        minHeight: '100vh', padding: '40px 20px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
            padding: '20px 30px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '30px'
          }}>
            <div>
              <h2 style={{color: 'white', margin: 0, fontSize: '24px', fontWeight: '800'}}>🚀 Distraction-Free Boost</h2>
              <p style={{color: '#94a3b8', margin: '5px 0 0'}}>Just 5 minutes. You've got this.</p>
            </div>
            <div style={{
              background: boostTimeLeft < 60 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.1)',
              color: boostTimeLeft < 60 ? '#ef4444' : 'white',
              padding: '10px 25px', borderRadius: '15px', fontSize: '24px', fontWeight: '900',
              border: boostTimeLeft < 60 ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.1)',
            }}>
              {Math.floor(boostTimeLeft / 60)}:{(boostTimeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>

          <div style={{ borderRadius: '25px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', marginBottom: '30px', height: '400px' }}>
            {/* Embedded a dummy 2 minute coding short logic here */}
            <iframe
              src="https://www.youtube.com/embed/HfTXHrWMGVY"
              title="Mini Lesson"
              width="100%"
              height="100%"
              allowFullScreen
              style={{ border: 'none' }}
            />
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.03)', padding: '35px', borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h3 style={{color: 'white', fontSize: '20px', marginTop: 0, marginBottom: '25px'}}>✨ Quick Win Challenge</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{color: '#e2e8f0', fontSize: '16px', fontWeight: '600'}}>1. What is the fundamental building block of React?</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {['Classes', 'Components', 'Functions', 'Divs'].map(opt => (
                  <button key={opt} 
                    onClick={() => setBoostAnswers({...boostAnswers, q1: opt})}
                    style={{
                      padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
                      background: boostAnswers.q1 === opt ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                      color: boostAnswers.q1 === opt ? 'white' : '#cbd5e1', border: 'none', fontWeight: '600'
                    }}
                  >{opt}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '35px' }}>
              <p style={{color: '#e2e8f0', fontSize: '16px', fontWeight: '600'}}>2. Which hook manages side effects?</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {['useState', 'useEffect', 'useMemo', 'useContext'].map(opt => (
                  <button key={opt} 
                    onClick={() => setBoostAnswers({...boostAnswers, q2: opt})}
                    style={{
                      padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
                      background: boostAnswers.q2 === opt ? '#10b981' : 'rgba(255,255,255,0.05)',
                      color: boostAnswers.q2 === opt ? 'white' : '#cbd5e1', border: 'none', fontWeight: '600'
                    }}
                  >{opt}</button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                setBoostQuizSubmitted(true);
                addXp(15);
                setShowBoostComplete(true);
              }}
              style={{
                width: '100%', padding: '18px', background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white', borderRadius: '15px', border: 'none', fontSize: '18px', fontWeight: '800', cursor: 'pointer',
                opacity: (boostAnswers.q1 && boostAnswers.q2) ? 1 : 0.5,
                pointerEvents: (boostAnswers.q1 && boostAnswers.q2) ? 'auto' : 'none'
              }}
            >
              Submit & Claim 15 XP
            </button>
          </div>
        </div>
        
        <AIChatbox />

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // --- NORMAL LAYOUT ---
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'relative', zIndex: 1, maxWidth: '1600px', 
        margin: '0 auto', height: '100vh', display: 'flex' 
      }}>
        {/* Video Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px' }}>
          <div style={{
            background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(40px)',
            borderRadius: '30px', padding: '30px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
            height: '70vh', display: 'flex', flexDirection: 'column'
          }}
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          >
            <div style={{
              position: 'relative', width: '100%', height: '100%', borderRadius: '25px',
              overflow: 'hidden', background: 'linear-gradient(135deg, #1e293b, #334155)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              
<iframe
  src={currentLesson.videoUrl}
  title={currentLesson.title}
  width="100%"
  height="100%"
  allowFullScreen
  style={{
    borderRadius: "25px"
  }}
/>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                background: 'rgba(0,0,0,0.7)', borderRadius: '50%', width: '120px', height: '120px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}
              onClick={togglePlay}
              >
                <div style={{
                  width: '60px', height: '60px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 15px 35px rgba(59,130,246,0.4)'
                }}>
                  {playing ? <Pause size={28} color="white" /> : <Play size={28} color="white" />}
                </div>
              </div>
            </div>

            <div style={{ padding: '30px 20px 20px', opacity: showControls ? 1 : 0, transition: 'opacity 0.3s ease' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{
                      fontSize: '24px', fontWeight: '800', color: 'white', margin: 0,
                      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', 
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                      {currentLesson.title}
                    </h3>
                    {mood === 'high_focus' && <span style={{ background: 'rgba(249,115,22,0.2)', color: '#f97316', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>🔥 Focus Mode</span>}
                    {mood === 'low_energy' && <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>😴 Light Mode</span>}
                  </div>
                  <p style={{ fontSize: '16px', color: '#94a3b8', margin: 0 }}>{course.title}</p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button style={{
                    width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={() => setShowSidebar(!showSidebar)}
                  title="Toggle Sidebar"
                  >
                    <BookOpen size={20} />
                  </button>
                  <button style={{
                    width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={toggleFullscreen}
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <input
                  type="range" min="0" max="100" value={progress}
                  onChange={handleProgressChange}
                  style={{
                    width: '100%', height: '8px', borderRadius: '4px',
                    background: `linear-gradient(to right, #3b82f6 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                    outline: 'none', cursor: 'pointer'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <button onClick={togglePlay} style={{
                    width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {playing ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button style={{
                    width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={goToPreviousLesson}
                  >
                    <SkipBack size={20} />
                  </button>
                  <button style={{
                    width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onClick={goToNextLesson}
                  >
                    <SkipForward size={20} />
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '140px' }}>
                    <button onClick={toggleMute} style={{
                      width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                      type="range" min="0" max="1" step="0.1"
                      value={muted ? 0 : volume} onChange={handleVolumeChange}
                      style={{
                        width: '80px', height: '6px', borderRadius: '3px',
                        background: 'rgba(255,255,255,0.2)', outline: 'none', cursor: 'pointer'
                      }}
                    />
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '15px', fontWeight: '600', minWidth: '120px' }}>
                    {formatTime(currentTime)} / {currentLesson.duration}
                  </div>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                  background: 'rgba(255,255,255,0.1)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white', fontWeight: '700', cursor: 'pointer'
                }}
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                >
                  <Settings size={18} />
                  <span>{playbackSpeed}x</span>
                  {showSpeedMenu && (
                    <div style={{
                      position: 'absolute', top: '100%', right: 0,
                      background: 'rgba(30,41,59,0.95)', borderRadius: '15px', padding: '15px',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)',
                      minWidth: '120px', zIndex: 1000, marginTop: '5px'
                    }}>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                        <button key={speed} onClick={() => changePlaybackSpeed(speed)}
                          style={{
                            width: '100%', padding: '10px 15px', background: playbackSpeed === speed ? 'rgba(59,130,246,0.3)' : 'transparent',
                            color: 'white', border: 'none', borderRadius: '10px', textAlign: 'left', cursor: 'pointer',
                            fontWeight: playbackSpeed === speed ? '800' : '500'
                          }}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* New Syllabus and Notes Section */}
          <div style={{
            marginTop: '30px',
            background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
            borderRadius: '25px', padding: '35px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px'
          }}>
            {/* Syllabus Topics */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="#3b82f6" /> Syllabus Topics
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {(currentLesson.topics || [
                  `Introduction to ${currentLesson.title}`, 
                  mood === 'low_energy' ? 'Quick summary and visuals' : mood === 'high_focus' ? 'Deep underlying architecture' : 'Core syntax and structural rules', 
                  mood === 'low_energy' ? 'Fun 5-min interactive quiz' : mood === 'high_focus' ? 'Hard algorithmic assignments' : 'Practical hands-on lab execution', 
                  mood === 'high_focus' ? 'Distraction-free learning' : 'Optimization and best practices'
                ]).map((topic, i) => (
                  <li key={i} style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    color: '#cbd5e1', fontSize: '15px', lineHeight: '1.5', fontWeight: '500'
                  }}>
                    <div style={{ marginTop: '7px', width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', flexShrink: 0 }}></div>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notes Section */}
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileEdit size={22} color="#10b981" /> Lesson Notes
              </h3>
              <div style={{
                background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '15px',
                borderLeft: mood === 'low_energy' ? '4px solid #10b981' : mood === 'high_focus' ? '4px solid #f97316' : '4px solid #3b82f6', 
                color: '#e2e8f0', fontSize: '15px', lineHeight: '1.7'
              }}>
                {mood === 'low_energy' ? `Don't worry, we're keeping this light today! Focus on the broad concepts of ${currentLesson.title}. Watch the short summary, skip the heavy reading, and try the simple flashcards.` 
                 : mood === 'high_focus' ? `Deep dive time. In this module covering ${currentLesson.title}, we explore fundamental mechanisms, memory implications, and complex architectures. Put your phone away and build the production-grade project associated with this video.` 
                 : `In this module covering ${currentLesson.title}, we explore fundamental mechanisms and real-world implications. Ensure you actively follow along with the integrated environment and keep the primary official documentation open for deeper dives.`}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center',
            padding: '40px 0', flexWrap: 'wrap'
          }}>
            <button onClick={goToPreviousLesson} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
              background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '25px', fontSize: '16px', fontWeight: '700', cursor: 'pointer'
            }}
            disabled={course.lessons[0].id === parseInt(lessonId)}
            >
              <ChevronLeft size={20} /> Previous Lesson
            </button>
            <Link to={`/course/${courseId}`} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
              background: 'rgba(59,130,246,0.2)', color: 'white', border: '2px solid rgba(59,130,246,0.3)',
              borderRadius: '25px', fontSize: '16px', fontWeight: '700', textDecoration: 'none'
            }}>
              <Home size={20} /> Course Overview
            </Link>
            <button onClick={goToNextLesson} style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '18px 36px',
              background: 'rgba(255,255,255,0.1)', color: 'white', border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '25px', fontSize: '16px', fontWeight: '700', cursor: 'pointer'
            }}
            disabled={course.lessons[course.lessons.length - 1].id === parseInt(lessonId)}
            >
              Next Lesson <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {showSidebar && (
          <div style={{
            width: '420px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(40px)',
            borderLeft: '1px solid rgba(0,0,0,0.1)', padding: '40px', overflowY: 'auto',
            boxShadow: '-20px 0 60px rgba(0,0,0,0.2)'
          }}>
            <div style={{ marginBottom: '50px', textAlign: 'center' }}>
              <Link to={`/course/${courseId}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#64748b',
                textDecoration: 'none', fontSize: '15px', fontWeight: '600', marginBottom: '20px',
                padding: '12px 20px', background: 'rgba(248,250,252,0.8)', borderRadius: '20px'
              }}>
                <ChevronLeft size={18} /> Back to Course
              </Link>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>
                {course.title}
              </h2>
              <p style={{ fontSize: '16px', color: '#64748b', margin: 0, fontWeight: '600' }}>
                By {course.instructor.name}
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h3 style={{
                fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '25px',
                display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <BookOpen size={22} color="#3b82f6" /> Course Content
              </h3>
              <div style={{ display: 'grid', gap: '15px', maxHeight: '400px', overflowY: 'auto' }}>
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    to={`/course/${courseId}/lesson/${lesson.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '20px', padding: '25px',
                      background: parseInt(lessonId) === lesson.id ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'rgba(248,250,252,0.8)',
                      color: parseInt(lessonId) === lesson.id ? 'white' : '#1e293b',
                      borderRadius: '20px', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: '40px', height: '40px', background: parseInt(lessonId) === lesson.id ? 'rgba(255,255,255,0.3)' : 'rgba(59,130,246,0.1)',
                      borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: '800', color: parseInt(lessonId) === lesson.id ? 'white' : '#3b82f6'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', margin: 0, marginBottom: '4px' }}>
                        {lesson.title}
                      </h4>
                      <span style={{ fontSize: '14px', opacity: 0.7 }}>{lesson.duration}</span>
                    </div>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: lesson.completed ? 'rgba(16,185,129,0.2)' : 'rgba(148,163,184,0.2)',
                      color: lesson.completed ? '#10b981' : '#94a3b8'
                    }}>
                      {lesson.completed ? <CheckCircle size={18} /> : <Play size={16} />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ background: 'rgba(248,250,252,0.8)', padding: '30px', borderRadius: '25px', marginBottom: '30px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '25px' }}>Your Progress</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px', justifyContent: 'center' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #34d399)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 35px rgba(16,185,129,0.3)'
                }}>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>40%</span>
                </div>
                <div>
                  <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>2 of 5 lessons completed</p>
                  <p style={{ fontSize: '16px', color: '#10b981', fontWeight: '700', margin: 0 }}>Keep up the great work!</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button style={{
                width: '100%', padding: '20px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                color: 'white', border: 'none', borderRadius: '20px', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(59,130,246,0.4)'
              }}>
                ✅ Mark as Complete
              </button>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => setOpenMaterial('syllabus')}
                  style={{
                  flex: 1, padding: '15px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6',
                  border: '2px solid #3b82f6', borderRadius: '20px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                }}>
                  <FileText size={18} /> Syllabus
                </button>
                <button 
                  onClick={() => setOpenMaterial('notes')}
                  style={{
                  flex: 1, padding: '15px', background: 'rgba(16,185,129,0.1)', color: '#10b981',
                  border: '2px solid #10b981', borderRadius: '20px', fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s'
                }}>
                  <FileEdit size={18} /> Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Materials Modal */}
      {openMaterial && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            width: '90%', maxWidth: '600px', borderRadius: '25px', padding: '40px',
            border: `1px solid ${openMaterial === 'syllabus' ? 'rgba(59,130,246,0.4)' : 'rgba(16,185,129,0.4)'}`,
            boxShadow: `0 25px 60px ${openMaterial === 'syllabus' ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)'}`,
            color: 'white', position: 'relative'
          }}>
            <button 
              onClick={() => setOpenMaterial(null)}
              style={{ position: 'absolute', top: '25px', right: '25px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ 
                background: openMaterial === 'syllabus' ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)',
                padding: '15px', borderRadius: '18px', color: openMaterial === 'syllabus' ? '#3b82f6' : '#10b981'
              }}>
                {openMaterial === 'syllabus' ? <FileText size={30} /> : <FileEdit size={30} />}
              </div>
              <div>
                <h2 style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '800' }}>
                  {openMaterial === 'syllabus' ? 'Detailed Syllabus' : 'Comprehensive Notes'}
                </h2>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '15px' }}>{currentLesson?.title || 'Current Topic'}</p>
              </div>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
              {openMaterial === 'syllabus' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['1. Introduction & Core Philosophy', '2. Breaking down the fundamental syntax', '3. Common pitfalls and edge cases', '4. Live coding demonstration', '5. Best practices for production'].map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '15px', borderLeft: '4px solid #3b82f6', fontSize: '16px', fontWeight: '500' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#cbd5e1', lineHeight: '1.7', fontSize: '16px' }}>
                  <p>
                    <strong style={{ color: '#10b981' }}>Core Concept:</strong> This module breaks down the essential execution flow. Understanding the event loop and component lifecycle here is critical for optimization later on.
                  </p>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', fontFamily: 'monospace', color: '#38bdf8' }}>
                    // Always remember to initialize state:<br/>
                    const [data, setData] = useState(initial);
                  </div>
                  <p>
                    <strong style={{ color: '#10b981' }}>Key Takeaways:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li>Ensure strict unidirectional data flow.</li>
                      <li>Avoid deep prop drilling by utilizing context.</li>
                      <li>Memory leaks occur when cleanup functions in `useEffect` are ignored.</li>
                    </ul>
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <button 
                onClick={() => setOpenMaterial(null)}
                style={{
                  background: openMaterial === 'syllabus' ? '#3b82f6' : '#10b981', color: 'white',
                  border: 'none', padding: '14px 40px', borderRadius: '30px', fontSize: '16px', fontWeight: '800', cursor: 'pointer'
                }}
              >
                Back to Lesson
              </button>
            </div>
            
          </div>
        </div>
      )}

      <AIChatbox />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
          background: #3b82f6; cursor: pointer; box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 50%; background: #3b82f6;
          cursor: pointer; border: none; box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }
      `}</style>
    </div>
  );
};

export default VideoPlayerPage;
