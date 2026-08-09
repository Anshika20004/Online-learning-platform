import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { predictLevel } from "../servecs/mlService";

const AssessmentTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { courseId, courseName, coursePrice, courseCategory } = location.state || {};
  
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes
  const [countdownActive, setCountdownActive] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 COURSE-WISE PREMIUM QUESTIONS (10 Questions = 100 MARKS)
  const getCourseQuestions = (courseCategory) => {
    const questions = {
      // Frontend Development
      "Frontend": [
        { id: 1, question: "What is the main advantage of the Virtual DOM in React?", options: ["Fast rendering", "Memory saving", "Better SEO", "Reduces server load"], correct: 0, marks: 10 },
        { id: 2, question: "When is the useEffect hook typically called?", options: ["Before rendering", "After rendering", "On component unmount", "On state change immediately"], correct: 1, marks: 10 },
        { id: 3, question: "What property determines the main axis in CSS Flexbox?", options: ["align-items", "justify-content", "flex-direction", "gap"], correct: 2, marks: 10 },
        { id: 4, question: "What is the primary use of useNavigate in React Router v6?", options: ["State management", "Programmatic Routing", "Form handling", "API calling"], correct: 1, marks: 10 },
        { id: 5, question: "Which of the following describes Tailwind CSS?", options: ["Utility-first framework", "Component-based framework", "Full UI Library", "CSS Preprocessor"], correct: 0, marks: 10 },
        { id: 6, question: "Which CSS feature is essential for responsive design?", options: ["Media queries", "Flexbox only", "Grid only", "Bootstrap only"], correct: 0, marks: 10 },
        { id: 7, question: "What is the primary use of the 'key' prop in React?", options: ["Styling elements", "List rendering identification", "Animation targeting", "State binding"], correct: 1, marks: 10 },
        { id: 8, question: "Which CSS layout method is designed natively for 2D layouts?", options: ["Rows only grids", "Columns only grids", "Grid Layout (Rows + Columns)", "Flexbox"], correct: 2, marks: 10 },
        { id: 9, question: "When should you fundamentally use the useMemo hook?", options: ["Handling Side effects", "Expensive calculations rendering", "Simple State update", "Cleanup operations"], correct: 1, marks: 10 },
        { id: 10, question: "Which of the following is an HTML semantic tag?", options: ["div", "section", "span", "br"], correct: 1, marks: 10 },
        { id: 11, question: "What is the primary purpose of the React Context API?", options: ["Local state mapping", "Global state management", "Client Routing", "Handling Forms"], correct: 1, marks: 10 },
        { id: 12, question: "What are CSS custom properties functionally known as?", options: ["CSS Variables", "CSS Functions", "CSS Mixins", "CSS Animations"], correct: 0, marks: 10 },
        { id: 13, question: "What is the precise purpose of the useCallback hook?", options: ["Storing State", "Memoizing functions", "Handling Effects", "Attaching ref bounds"], correct: 1, marks: 10 },
        { id: 14, question: "What is the purpose of ARIA attributes in web development?", options: ["DOM Styling", "Assisting Screen readers", "Triggering Animation", "Boosting SEO algorithms"], correct: 1, marks: 10 },
        { id: 15, question: "What does React lazy loading effectively implement?", options: ["Code splitting capability", "Image optimization", "Context State", "Prop drilling"], correct: 0, marks: 10 }
      ],

      // Backend Development  
      "Backend": [
        { id: 1, question: "How would you describe the Node.js event loop paradigm?", options: ["Single-threaded non-blocking", "Multi-threaded blocking", "Strictly Blocking", "Purely Synchronous"], correct: 0, marks: 10 },
        { id: 2, question: "How is the execution order of Express middleware determined?", options: ["Execution is Random", "Based on Registration order", "Reversed registration order", "Alphabetical mapping"], correct: 1, marks: 10 },
        { id: 3, question: "What specific type of NoSQL database architecture is MongoDB?", options: ["Relational structuring", "Document-oriented", "Graph-oriented", "Key-value indexing"], correct: 1, marks: 10 },
        { id: 4, question: "What database action does the REST API POST method typically parallel?", options: ["Read (Select)", "Create (Insert)", "Update (Modify)", "Delete (Drop)"], correct: 1, marks: 10 },
        { id: 5, question: "What is the main technical purpose of a JWT token?", options: ["Storing raw passwords", "Stateless Authentication", "Database connectivity", "Browser Caching"], correct: 1, marks: 10 },
        { id: 6, question: "What underlying foundational concept does async/await rely upon?", options: ["Deep Callbacks", "JS Promises", "Event Emitters", "Generator yields"], correct: 1, marks: 10 },
        { id: 7, question: "What action does bcrypt primarily perform regarding passwords?", options: ["Reversible Encryption", "Irreversible Hashing", "Base64 Encoding", "JWT Tokenization"], correct: 1, marks: 10 },
        { id: 8, question: "In the JavaScript ecosystem, what are NPM and Yarn classified as?", options: ["They are exactly the same", "Package dependency managers", "Programming Languages", "Execution Frameworks"], correct: 1, marks: 10 },
        { id: 9, question: "What are environment variables (.env files) primarily used for?", options: ["Frontend UI variables", "Secret Backend configuration", "Database schemas", "CSS global variables"], correct: 1, marks: 10 },
        { id: 10, question: "What predominantly triggers a CORS error in the browser?", options: ["Origin domain mismatch", "Expired JWT tokens", "Slow server response rules", "Browser memory exhaustion"], correct: 0, marks: 10 },
        { id: 11, question: "Mongoose serves as an Object Data Modeling (ODM) library for which database?", options: ["Microsoft SQL", "MongoDB", "Redis", "MySQL"], correct: 1, marks: 10 },
        { id: 12, question: "What is the primary security intention of API rate limiting?", options: ["Enhancing basic Security", "Boosting CPU Performance", "Increasing core SEO metrics", "Enabling Caching layers"], correct: 0, marks: 10 },
        { id: 13, question: "What is PM2 commonly utilized for in production environments?", options: ["Frontend hosting", "Node.js process management", "Database graphical interface", "CSS compiling"], correct: 1, marks: 10 },
        { id: 14, question: "What is the OAuth 2.0 protocol frequently implemented to handle?", options: ["Internal server passwords", "Social login delegation", "Database access rights", "Email structuring"], correct: 1, marks: 10 },
        { id: 15, question: "What isolated execution environments do Docker containers provide?", options: ["Heavy Virtual machines", "Lightweight App isolation", "Exclusive Database hosting", "Pure Frontend hosting"], correct: 1, marks: 10 }
      ],

      // Fullstack Development
      "Fullstack": [
        { id: 1, question: "What are the core foundational components of the MERN stack?", options: ["Mongo, Express, React, Node", "MySQL, Express, React, Nginx", "Mongo, Ember, Redis, Node", "MySQL, Express, Redux, Nginx"], correct: 0, marks: 10 },
        { id: 2, question: "Which embodies a superior, standard REST API endpoint design?", options: ["/users/:id", "/getUsers", "/userData", "/data"], correct: 0, marks: 10 },
        { id: 3, question: "Which of these efficiently handles complex global state management?", options: ["Redux / Context API", "localStorage manipulation", "Strict Cookies", "Session instances"], correct: 0, marks: 10 },
        { id: 4, question: "What are platforms like Vercel and Netlify predominantly utilized for?", options: ["Frontend Deployment platforms", "Only Heroku alternatives", "Only AWS alternatives", "Only GitHub repositories"], correct: 0, marks: 10 },
        { id: 5, question: "What is a primary architectural advantage of Microservices over Monoliths?", options: ["Absolute Simplicity", "Single app deployment", "Independent Scalability", "No technical advantages whatsoever"], correct: 2, marks: 10 },
        { id: 6, question: "Which indicates a professional, standard Git branching strategy?", options: ["Commit to Main only", "Isolating Feature branches", "Random branching", "Using absolutely no branches"], correct: 1, marks: 10 },
        { id: 7, question: "What is a CI/CD pipeline primarily configured to facilitate?", options: ["Manual FTP deployment", "Automated testing and continuous deployment", "Local machine testing only", "Stopping code deployment"], correct: 1, marks: 10 },
        { id: 8, question: "Which software methodology actively utilizes short iterations known as 'Sprints'?", options: ["Waterfall lifecycle", "Agile methodology", "Big bang deployment", "No planning approach"], correct: 1, marks: 10 },
        { id: 9, question: "Which properly represents the typical automated testing pyramid structure?", options: ["Unit Tests > Integration Tests > E2E", "E2E boundary tests only", "No systematic tests", "Strictly Manual testing only"], correct: 0, marks: 10 },
        { id: 10, question: "Which of these operates as a highly productive web performance optimization technique?", options: ["Component Lazy loading", "Compiling Big monolithic bundles", "Ignoring optimization entirely", "Only focusing on CSS optimization"], correct: 0, marks: 10 },
        { id: 11, question: "Which metric is universally considered a fundamental web security best practice?", options: ["Bypassing validation", "Crucial Input sanitization", "Trusting all user input implicitly", "No authentication requirements"], correct: 1, marks: 10 },
        { id: 12, question: "What is the overriding foundational benefit of strategic database indexing?", options: ["It deliberately causes slow queries", "It optimizes extremely fast search querying", "It yields no visible effect", "It increases storage dramatically"], correct: 1, marks: 10 },
        { id: 13, question: "What core structural feature distinguishes GraphQL from traditional REST?", options: ["Rigid Fixed schema structure", "Highly Flexible querying capability by the client", "They act exactly the same", "There is no real network difference"], correct: 1, marks: 10 },
        { id: 14, question: "Which is a quintessential example of a Cloud Serverless architecture?", options: ["AWS Lambda functions", "Traditional dedicated rack servers", "Local development environments only", "No cloud environments"], correct: 0, marks: 10 },
        { id: 15, question: "What dictates a central, definitive feature of a Progressive Web App (PWA)?", options: ["Offline support cache capability", "Desktop only enforced support", "No service workers required whatsoever", "Mobile operating system only support"], correct: 0, marks: 10 }
      ],

      // Mobile App Development
      "Mobile": [
        { id: 1, question: "What is the primary target use case for the React Native framework?", options: ["Web domination only", "Cross-platform Mobile application development", "Robust Desktop applications", "Backend server services"], correct: 1, marks: 10 },
        { id: 2, question: "Which modern programming language is inherently used to write Flutter applications?", options: ["JavaScript", "Dart", "Kotlin", "Swift"], correct: 1, marks: 10 },
        { id: 3, question: "Which specific languages are traditionally utilized for native Android development?", options: ["Swift ecosystem", "Kotlin or Java", "Dart", "JavaScript"], correct: 1, marks: 10 },
        { id: 4, question: "Which specific languages are predominantly used for native iOS development?", options: ["Kotlin exclusively", "Swift or Objective-C", "Dart language only", "Vanilla Java"], correct: 1, marks: 10 },
        { id: 5, question: "What defines the main underlying difference between Expo and standard React Native CLI?", options: ["They are fundamentally the same", "Managed SDK workflow vs Bare custom workflow", "Web rendering vs Mobile testing", "No technical execution difference"], correct: 1, marks: 10 },
        { id: 6, question: "Which backend operational services specifically handle mobile push notifications?", options: ["Firebase Cloud Messaging (FCM) / Apple Push (APNS)", "Standard Email handlers", "Physical SMS gateways", "Direct Phone calls"], correct: 0, marks: 10 },
        { id: 7, question: "How much time does a standard Apple App Store review protocol historically take?", options: ["Always exactly 1 day", "Anywhere from a few days to weeks depending", "Instant immediate approval", "There is no functional review"], correct: 1, marks: 10 },
        { id: 8, question: "What exact problem does hot reload aggressively solve in mobile development?", options: ["Slowing compile times artificially", "Providing instant UI rendering without structural recompiling", "Ensuring no preview is ever available", "Making code execution dramatically slower"], correct: 1, marks: 10 },
        { id: 9, question: "What exactly are native modules structurally built to accomplish?", options: ["Isolated JS execution only", "Directly accessing platform-specific hardware APIs", "Web interface execution only", "No native modules actually exist"], correct: 1, marks: 10 },
        { id: 10, question: "How is adaptive layout responsiveness primarily handled within React Native?", options: ["Responsive Dimensions API and Flexbox rules", "Standard CSS media queries block", "Only rigid Grid rules", "Fixed hardcoded pixel sizing"], correct: 0, marks: 10 },
        { id: 11, question: "Which prevailing libraries frequently handle global state management in modern mobile apps?", options: ["Exclusively Redux", "Exclusively Provider", "Both tools like Redux and Context/Provider", "None whatsoever"], correct: 2, marks: 10 },
        { id: 12, question: "How are sensitive hardware permissions ethically handled in modern Android applications?", options: ["They are automatically granted upon install", "Explicit Runtime user requests are made during usage", "It is an iOS only mandatory feature", "No permissions are logically needed"], correct: 1, marks: 10 },
        { id: 13, question: "How are background background computational tasks executed efficiently in React Native?", options: ["It is not technically possible", "Through registered Headless JS asynchronous tasks", "Only foreground tasks are physically allowed", "Via Web APIs only"], correct: 1, marks: 10 },
        { id: 14, question: "How much logical code sharing is typically achievable using React Native across iOS and Android builds?", options: ["Absolute 0% sharing", "Code is completely platform specific", "Averaging up to 90% codebase sharing", "100% exactly the identical code locally"], correct: 2, marks: 10 },
        { id: 15, question: "How does mobile app performance utilizing pure React Native generally compare functionally?", options: ["Providing near native speed execution equivalents", "Demonstrating very slow operational execution", "Feeling like Web-like slow speed", "Yielding no measurable difference in latency"], correct: 0, marks: 10 }
      ],

      // Data Science / ML
      "Data Science": [
        { id: 1, question: "What is the specialized Python pandas library primarily optimized to handle?", options: ["Advanced Web networking", "Robust Data manipulation, cleaning, and analysis", "Implementing Neural networks exclusively", "Interactive Data visualization pipelines"], correct: 1, marks: 10 },
        { id: 2, question: "What is the precise functional use of the Python Scikit-learn library?", options: ["Architecting immense Deep neural networks", "Implementing standard Machine learning algorithms systematically", "Basic foundational data cleaning exclusively", "General Web scraping capabilities"], correct: 1, marks: 10 },
        { id: 3, question: "What structural type of operational framework is TensorFlow categorized as?", options: ["A basic Frontend interactive framework", "A vast Deep learning tensor framework", "A scalable Database engine", "An aggressive CSS preprocessor utility"], correct: 1, marks: 10 },
        { id: 4, question: "What accurately characterizes the dataset needs of mathematical supervised learning?", options: ["Possessing no defined logical labels", "Relying heavily on training using labeled datasets explicitly", "Enforcing strict unknown clustering constraints", "Deriving arbitrary Association rules without metadata"], correct: 1, marks: 10 },
        { id: 5, question: "What numerical type of analytical task is linear regression primarily implemented to solve?", options: ["Rigid Classification sorting tasks", "Continuous Predictive Regression mapping tasks", "Loose Dimensional Clustering tasks", "Algorithmic Dimensionality calculation reduction"], correct: 1, marks: 10 },
        { id: 6, question: "What signifies a highly common and historically effective testing ratio for validation Train/Test splits?", options: ["A calculated 80-20 rule parameter split", "A perfectly strict 50-50 dataset split", "Holding 100% data for training, reserving 0% for testing", "No mathematical splitting metric is usually applied"], correct: 0, marks: 10 },
        { id: 7, question: "What accurately describes the debilitating problem of algorithmic overfitting in generalized machine learning processes?", options: ["Severely Underperforming constantly on foundational training data", "Overperforming dramatically on initial training data but catastrophically failing on generalized unseen new data", "Yielding the exact same structural performance universally regardless of metrics", "It is statistically not categorized as a measurable problem"], correct: 1, marks: 10 },
        { id: 8, question: "What specific operational feature is the Python Matplotlib library exclusively used for generating?", options: ["Intricate Data cleaning protocols", "Visual Data visualization rendering and static plotting charts", "Scaffolding baseline ML model deployments", "Executing rapid Web hosting environments"], correct: 1, marks: 10 },
        { id: 9, question: "What accurately describes the foundational structural interface of a Python Jupyter notebook context?", options: ["A highly standard visual code string editor", "An inherently interactive graphical computational research environment interface", "A robustly structured unified relational database module", "An automated production containerized deployment execution pipeline"], correct: 1, marks: 10 },
        { id: 10, question: "What expresses the mathematical intent and overall purpose of normalizing feature scaling operations?", options: ["It is computationally deemed unnecessary logically", "Functionally Normalizing wide data ranges predictably across disparate independent variables dimensions", "Solely Filtering out invalid non-integer string structure data parameters", "Purposefully Removing entirely valid data to reduce operational file size weight overhead"], correct: 1, marks: 10 },
        { id: 11, question: "Globally, how does systemic K-Fold Cross-validation function procedurally evaluate structural model accuracy effectively?", options: ["It statically performs a single definitive data execution split metric", "It consistently executes multiple rotating validation data training block splits cyclically", "It dynamically avoids verification and validation computations entirely for faster scaling", "It arbitrarily only trains and absolutely never structurally tests algorithmic data limits"], correct: 1, marks: 10 },
        { id: 12, question: "Logically, what framework structurally describes a conceptual algorithmic Decision Tree node mapping?", options: ["A strict flat procedural linear algebraic scale model", "A branching hierarchical logical tree-based decision map structure", "A deeply layered dynamic connected neural network topology graph", "A strict algorithmic numerical geographic distance metric optimization map topology calculation"], correct: 1, marks: 10 },
        { id: 13, question: "Under which specific broad technical parameter category is the structural K-Means numerical logic clustering algorithm definitively placed statistically?", options: ["A defined Supervised numerical learning protocol execution", "A definitively Unsupervised internal pattern matching learning category algorithm", "A loosely Semi-supervised classification and regression framework operation protocol pattern", "A complex algorithmic environment-based continuous Reinforcement optimization learning protocol process"], correct: 1, marks: 10 },
        { id: 14, question: "Procedurally, how is logical numerical hyperparameter structure parameter tuning structurally optimized and frequently practically performed during deep algorithmic mapping processes?", options: ["By rigidly using completely hardcoded arbitrary fixed external configuration parameter logic values universally", "Algorithmically utilizing systematic iterative parameter permutation mapping metric methods systematically like comprehensive Grid Search techniques", "Technically Tuning parameterization processes are actively completely never performed procedurally locally whatsoever", "Strictly performing metric analysis only explicitly uniquely during the initial exploratory data cleaning phase constraints procedures explicitly consistently only"], correct: 1, marks: 10 },
        { id: 15, question: "Practically speaking, how are functional deployed, trained scalable mathematical machine computational learning architectural models physically frequently served live directly into connected active HTTP production ecosystem platforms?", options: ["Fundamentally Served procedurally Via robust HTTP external backend python application framework REST APIs environments explicitly like scalable Flask architectures or rapid FastAPI server networks routing", "Functionally Kept strictly inherently hosted only isolated completely offline inside locally executed internal backend Jupyter Python Notebook research sandbox interface system networks solely invariably completely permanently continuously continually strictly persistently without distribution networks explicitly securely locally internally explicitly", "Structurally Deployed network applications are systematically functionally virtually completely never structurally formally continuously deployed actively into live continuous deployment continuous integration scale scalable HTTP external internet production environments", "Locally Exported rigidly statically simply locally as raw binary Microsoft Excel visual grid sheet representation structural network map document template files structurally continuously explicitly entirely persistently dynamically structurally"], correct: 0, marks: 10 }
      ]
    };

    const selectedQuestions = questions[courseCategory] || questions.Frontend; // Default to Frontend
    return selectedQuestions.slice(0, 10);
  };

  const testQuestions = getCourseQuestions(courseCategory);

  useEffect(() => {
    if (!courseId || !courseName) {
      navigate('/courses');
      return;
    }
    setLoading(false);
    setCountdownActive(true);

    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [courseId, courseName, navigate]);

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmitTest = async () => {
    const totalMarks = testQuestions.reduce((sum, q) => sum + q.marks, 0);
    const obtainedMarks = testQuestions.reduce((sum, q) => {
      return sum + (answers[q.id] === q.correct ? q.marks : 0);
    }, 0);

    const percentage = Math.round((obtainedMarks / totalMarks) * 100);
    const timeTakenMinutes = Math.floor((25 * 60 - timer) / 60);

    try {
      const mlResponse = await predictLevel({
        score: percentage,
        time_taken: timeTakenMinutes,
        accuracy: percentage,
        attempts: 1,
        topic_perf: percentage / 100
      });

      const level = mlResponse.level;

      let skillLevel;
      if (level === "Low") skillLevel = "Beginner";
      else if (level === "Medium") skillLevel = "Intermediate";
      else if (level === "High") skillLevel = "Advanced";
      else skillLevel = "Expert";

      const resultData = {
        obtainedMarks,
        totalMarks,
        percentage,
        level,
        skillLevel,
        time_taken: timeTakenMinutes,
        timestamp: new Date().toISOString()
      };

      setResult(resultData);

      localStorage.setItem('studentLevel', JSON.stringify({ 
        courseId, 
        courseName, 
        coursePrice, 
        courseCategory,
        ...resultData 
      }));

      setTimeout(() => {
        navigate('/roadmap', { 
          state: { 
            courseId, 
            courseName, 
            coursePrice, 
            courseCategory,
            ...resultData 
          } 
        });
      }, 5000);

    } catch (error) {
      console.error("🚫 ML Prediction Error:", error);
      
      let level, skillLevel;
      if (percentage <= 40) {
        level = 'Low'; skillLevel = 'Beginner';
      } else if (percentage <= 70) {
        level = 'Medium'; skillLevel = 'Intermediate';
      } else if (percentage <= 85) {
        level = 'High'; skillLevel = 'Advanced';
      } else {
        level = 'Excellent'; skillLevel = 'Expert';
      }

      const resultData = {
        obtainedMarks, totalMarks, percentage, level, skillLevel,
        time_taken: timeTakenMinutes, timestamp: new Date().toISOString()
      };

      setResult(resultData);
      localStorage.setItem('studentLevel', JSON.stringify({ 
        courseId, courseName, coursePrice, courseCategory, ...resultData 
      }));

      setTimeout(() => {
        navigate('/roadmap', { state: { courseId, courseName, coursePrice, courseCategory, ...resultData } });
      }, 5000);

      alert("⚠️ AI Server offline - Using Smart Fallback. Roadmap ready!");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
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
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Loading Assessment...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.4) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(6,182,212,0.4) 0%, transparent 50%)`,
        zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.95)',
            padding: '30px 50px',
            borderRadius: '40px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #fff 0%, #e0f2fe 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              marginBottom: '15px',
              letterSpacing: '-0.02em'
            }}>
              🎯 AI-Powered Assessment
            </h1>
            <p style={{
              fontSize: '24px',
              color: '#1e40af',
              fontWeight: '700',
              margin: 0,
              letterSpacing: '-0.01em'
            }}>
              {courseName} • {courseCategory} • 100 Marks Test
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '25px 35px',
              borderRadius: '30px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(25px)',
              minWidth: '180px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>
                ⏰ Time Remaining
              </div>
              <div style={{
                fontSize: '42px',
                fontWeight: '900',
                color: timer < 600 ? '#ef4444' : '#1e40af',
                textShadow: timer < 600 ? '0 0 25px #ef4444' : '0 0 25px #1e40af'
              }}>
                {formatTime(timer)}
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.9)',
              padding: '25px 35px',
              borderRadius: '30px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              backdropFilter: 'blur(25px)',
              minWidth: '180px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '15px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>
                📝 Progress
              </div>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#1e40af' }}>
                {Object.keys(answers).length}/{testQuestions.length}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(850px, 1fr))',
          gap: '35px',
          justifyContent: 'center',
          marginBottom: '80px'
        }}>
          {testQuestions.map((question, index) => (
            <div key={question.id} style={{
              background: 'rgba(255,255,255,0.97)',
              borderRadius: '35px',
              padding: '45px',
              boxShadow: '0 35px 70px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.4)',
              position: 'relative',
              overflow: 'hidden',
              transform: `translateY(${Math.sin(index * 0.5) * 8}px)`
            }}>
              <div style={{
                position: 'absolute',
                top: '25px',
                left: '25px',
                width: '65px',
                height: '65px',
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '22px',
                fontWeight: '900',
                boxShadow: '0 15px 35px rgba(59,130,246,0.4)',
                zIndex: 2
              }}>
                Q{question.id}
              </div>

              <div style={{ paddingLeft: '90px', marginBottom: '35px' }}>
                <h2 style={{
                  fontSize: '26px',
                  fontWeight: '800',
                  color: '#1e293b',
                  lineHeight: '1.4',
                  margin: 0,
                  letterSpacing: '-0.015em'
                }}>
                  {question.question}
                </h2>
                <div style={{
                  marginTop: '15px',
                  padding: '12px 20px',
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  borderRadius: '25px',
                  color: '#1e40af',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'inline-block'
                }}>
                  {question.marks} Marks
                </div>
              </div>

              <div style={{ display: 'grid', gap: '22px', paddingLeft: '90px' }}>
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '25px 30px',
                    background: answers[question.id] === optIndex ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' : 'rgba(255,255,255,1)',
                    color: answers[question.id] === optIndex ? 'white' : '#1e293b',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: answers[question.id] === optIndex ? '0 20px 45px rgba(59,130,246,0.4)' : '0 8px 25px rgba(0,0,0,0.1)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    fontSize: '18px',
                    fontWeight: answers[question.id] === optIndex ? '800' : '600',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                    onClick={() => handleAnswer(question.id, optIndex)}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '4px solid currentColor',
                      marginRight: '25px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      {answers[question.id] === optIndex && (
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: 'white',
                          borderRadius: '50%',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }} />
                      )}
                    </div>
                    <span style={{ letterSpacing: '-0.01em' }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {result ? (
          <div style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,0.98)',
            padding: '60px 40px',
            borderRadius: '40px',
            boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(30px)',
            maxWidth: '800px',
            margin: '0 auto 60px'
          }}>
            <div style={{ fontSize: '140px', marginBottom: '30px' }}>
              {result.percentage >= 70 ? '🎉' : result.percentage >= 40 ? '👍' : '📚'}
            </div>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              background: result.level === 'Excellent' ? 'linear-gradient(135deg, #10b981, #34d399)' :
                         result.level === 'High' ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' :
                         result.level === 'Medium' ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' :
                         'linear-gradient(135deg, #ef4444, #f87171)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '20px'
            }}>
              {result.percentage}%
            </h1>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                padding: '25px',
                borderRadius: '25px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#059669' }}>
                  {result.obtainedMarks}/{result.totalMarks}
                </div>
                <div style={{ fontSize: '16px', color: '#047857', fontWeight: '600' }}>Marks Obtained</div>
              </div>
              <div style={{
                background: 'rgba(59,130,246,0.1)',
                padding: '25px',
                borderRadius: '25px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#1e40af' }}>
                  {result.skillLevel}
                </div>
                <div style={{ fontSize: '16px', color: '#1e40af', fontWeight: '600' }}>AI Skill Level</div>
              </div>
            </div>
            <p style={{
              fontSize: '22px',
              color: '#374151',
              fontWeight: '600',
              marginBottom: '40px'
            }}>
              Redirecting to your personalized {result.skillLevel} roadmap in <span style={{ color: '#3b82f6' }}>5</span> seconds...
            </p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <button 
              onClick={handleSubmitTest} 
              disabled={Object.keys(answers).length !== testQuestions.length}
              style={{
                padding: '30px 80px',
                fontSize: '22px',
                fontWeight: '900',
                background: Object.keys(answers).length === testQuestions.length ? 
                  'linear-gradient(135deg, #10b981, #34d399)' : 'rgba(255,255,255,0.3)',
                color: Object.keys(answers).length === testQuestions.length ? 'white' : '#94a3b8',
                border: 'none',
                borderRadius: '60px',
                cursor: Object.keys(answers).length === testQuestions.length ? 'pointer' : 'not-allowed',
                boxShadow: Object.keys(answers).length === testQuestions.length ? 
                  '0 30px 60px rgba(16,185,129,0.4)' : '0 10px 30px rgba(0,0,0,0.1)',
                letterSpacing: '0.05em',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              ✨ Generate AI Roadmap ({Object.keys(answers).length}/{testQuestions.length} Complete)
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 40px rgba(59,130,246,0.8); }
        }
      `}</style>
    </div>
  );
};

export default AssessmentTest;
