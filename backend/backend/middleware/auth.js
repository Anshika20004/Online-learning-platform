const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - Verify JWT token
const auth = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract token from "Bearer TOKEN"
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token and add to request
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user no longer exists'
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account has been deactivated'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (error) {
      console.error('Token verification failed:', error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please login again.'
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
      }
      
      return res.status(401).json({
        success: false,
        message: 'Token verification failed'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication middleware',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please login first.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${req.user.role} role is not authorized to access this route.`,
        data: {
          userRole: req.user.role,
          requiredRoles: roles
        }
      });
    }

    next();
  };
};

// Optional auth - Add user to request if token exists, but don't require it
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Get token from cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // If no token, continue without user
    if (!token) {
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token and add to request
      const user = await User.findById(decoded.id);
      
      if (user && user.isActive) {
        req.user = user;
      }

    } catch (error) {
      // If token is invalid, just continue without user
      console.log('Optional auth token invalid:', error.message);
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Don't fail the request, just continue without user
    next();
  }
};

// Check if user owns the resource
const checkOwnership = (resourceModel, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const resource = await resourceModel.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Check if user is admin
      if (req.user.role === 'admin') {
        return next();
      }

      // Check ownership based on different field names
      let ownerId;
      if (resource.user) {
        ownerId = resource.user;
      } else if (resource.instructor) {
        ownerId = resource.instructor;
      } else if (resource.author) {
        ownerId = resource.author;
      } else if (resource.createdBy) {
        ownerId = resource.createdBy;
      }

      if (!ownerId || ownerId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.'
        });
      }

      // Add resource to request for use in route handler
      req.resource = resource;
      next();

    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error checking resource ownership',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

// Rate limiting per user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const userRequests = new Map();

  return (req, res, next) => {
    if (!req.user) {
      return next();
    }

    const userId = req.user.id;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get or initialize user request history
    if (!userRequests.has(userId)) {
      userRequests.set(userId, []);
    }

    const requests = userRequests.get(userId);
    
    // Remove old requests outside the window
    const recentRequests = requests.filter(time => time > windowStart);
    userRequests.set(userId, recentRequests);

    // Check if user has exceeded the limit
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        data: {
          limit: maxRequests,
          windowMs,
          retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000)
        }
      });
    }

    // Add current request
    recentRequests.push(now);
    next();
  };
};

// Check if user has verified email
const requireEmailVerification = (req, res, next) => {
  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your email address to access this resource.',
      data: {
        emailVerificationRequired: true
      }
    });
  }
  next();
};

// Check if course is published (for public access)
const requirePublishedCourse = async (req, res, next) => {
  try {
    const Course = require('../models/Course');
    const courseId = req.params.courseId || req.params.id;
    
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Allow instructors and admins to access unpublished courses
    if (req.user && (req.user.role === 'admin' || course.instructor.toString() === req.user.id)) {
      req.course = course;
      return next();
    }

    // For students and public access, course must be published
    if (course.status !== 'published') {
      return res.status(403).json({
        success: false,
        message: 'This course is not available for public access'
      });
    }

    req.course = course;
    next();

  } catch (error) {
    console.error('Course status check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error checking course status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Logging middleware for admin actions
const logAdminAction = (action) => {
  return (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      console.log(`[ADMIN ACTION] ${req.user.email} - ${action} - ${new Date().toISOString()}`);
      console.log(`[REQUEST DETAILS] ${req.method} ${req.originalUrl}`);
      
      // In production, you might want to save this to a database
      // AdminLog.create({
      //   admin: req.user.id,
      //   action,
      //   details: {
      //     method: req.method,
      //     url: req.originalUrl,
      //     body: req.body,
      //     params: req.params,
      //     query: req.query
      //   }
      // });
    }
    next();
  };
};

module.exports = {
  auth,
  authorize,
  optionalAuth,
  checkOwnership,
  userRateLimit,
  requireEmailVerification,
  requirePublishedCourse,
  logAdminAction
};