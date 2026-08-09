const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// MongoDB Connection (Optional - for demo, we'll use mock data)
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB Connected');
    } else {
      console.log('⚠️  Using mock data (no MongoDB connection)');
    }
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Continuing with mock data...');
  }
};

connectDB();

// Mock Data for Demo
const mockUsers = [
  {
    _id: '1',
    name: 'Shaikh Anas',
    email: 'anas@edulearn.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'Passionate learner and web developer',
    location: 'Balaghat, Madhya Pradesh, India',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'John Smith',
    email: 'john@edulearn.com',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bio: 'Senior Full Stack Developer and Instructor',
    location: 'San Francisco, CA',
    expertise: ['JavaScript', 'React', 'Node.js'],
    createdAt: new Date().toISOString()
  }
];

const mockCourses = [
  {
    _id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React and more with hands-on projects.',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
    instructor: mockUsers[1],
    category: 'Web Development',
    level: 'Beginner',
    price: 99,
    originalPrice: 149,
    rating: 4.7,
    reviewsCount: 324,
    studentsEnrolled: 1250,
    duration: '40h 30m',
    lessons: 85,
    status: 'published'
  },
  {
    _id: '2',
    title: 'React for Beginners',
    description: 'Master React.js with hands-on projects and modern development practices.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    instructor: mockUsers[1],
    category: 'Web Development',
    level: 'Intermediate',
    price: 79,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 267,
    studentsEnrolled: 890,
    duration: '25h 15m',
    lessons: 42,
    status: 'published'
  },
  {
    _id: '3',
    title: 'Python Data Science',
    description: 'Data analysis and machine learning with Python, pandas, and scikit-learn.',
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop',
    instructor: mockUsers[1],
    category: 'Data Science',
    level: 'Intermediate',
    price: 119,
    originalPrice: 159,
    rating: 4.6,
    reviewsCount: 189,
    studentsEnrolled: 567,
    duration: '35h 20m',
    lessons: 68,
    status: 'published'
  }
];

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'EduLearn Pro API is running! 🚀',
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Demo authentication
  if (email === 'anas@edulearn.com' && password === 'password123') {
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUsers[0],
        token: 'demo-token-student'
      }
    });
  }

  if (email === 'john@edulearn.com' && password === 'password123') {
    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUsers[1],
        token: 'demo-token-instructor'
      }
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials. Use demo accounts.'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role = 'student' } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Demo registration
  const newUser = {
    _id: Date.now().toString(),
    name,
    email,
    role,
    avatar: role === 'student' ? 
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' :
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    bio: `New ${role} on EduLearn Pro`,
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: newUser,
      token: `demo-token-${Date.now()}`
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  // Mock authentication check
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  // Return demo user
  res.json({
    success: true,
    data: mockUsers[0]
  });
});

// Courses Routes
app.get('/api/courses', (req, res) => {
  const { category, level, search, page = 1, limit = 12 } = req.query;
  let filteredCourses = [...mockCourses];

  // Apply filters
  if (category) {
    filteredCourses = filteredCourses.filter(course => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (level) {
    filteredCourses = filteredCourses.filter(course => 
      course.level.toLowerCase() === level.toLowerCase()
    );
  }

  if (search) {
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  res.json({
    success: true,
    message: `Retrieved ${paginatedCourses.length} courses`,
    data: {
      courses: paginatedCourses,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredCourses.length / limit),
        totalCourses: filteredCourses.length,
        hasNextPage: endIndex < filteredCourses.length,
        hasPrevPage: page > 1
      }
    }
  });
});

app.get('/api/courses/featured', (req, res) => {
  const featuredCourses = mockCourses.slice(0, 3);
  res.json({
    success: true,
    message: 'Retrieved featured courses',
    data: featuredCourses
  });
});

app.get('/api/courses/:id', (req, res) => {
  const course = mockCourses.find(c => c._id === req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  res.json({
    success: true,
    message: 'Course retrieved successfully',
    data: course
  });
});

// Categories Route
app.get('/api/courses/categories', (req, res) => {
  const categories = [
    { name: 'Web Development', count: 45, icon: '💻' },
    { name: 'Data Science', count: 28, icon: '📊' },
    { name: 'Design', count: 32, icon: '🎨' },
    { name: 'Mobile Development', count: 22, icon: '📱' },
    { name: 'DevOps', count: 18, icon: '⚙️' },
    { name: 'Marketing', count: 15, icon: '📈' }
  ];

  res.json({
    success: true,
    message: 'Categories retrieved successfully',
    data: categories
  });
});

// User Profile Routes
app.get('/api/users/profile', (req, res) => {
  // Mock user profile
  res.json({
    success: true,
    data: mockUsers[0]
  });
});

app.put('/api/users/profile', (req, res) => {
  // Mock profile update
  const updatedUser = { ...mockUsers[0], ...req.body };
  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableEndpoints: {
      health: '/api/health',
      auth: '/api/auth/*',
      courses: '/api/courses',
      profile: '/api/users/profile'
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 =================================');
  console.log('   EDULEARN PRO API SERVER STARTED');
  console.log('   =================================');
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📋 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log('');
  console.log('📝 Demo Accounts:');
  console.log('   Student: anas@edulearn.com / password123');
  console.log('   Instructor: john@edulearn.com / password123');
  console.log('   =================================\n');
});

module.exports = app;