const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, authorize, optionalAuth, checkOwnership, requirePublishedCourse } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all published courses with filtering and pagination
// @access  Public
router.get('/', [
  query('category').optional().trim(),
  query('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  query('price').optional().isIn(['free', 'paid', 'under-50', 'under-100']),
  query('sort').optional().isIn(['newest', 'oldest', 'price-low', 'price-high', 'rating', 'popular']),
  query('search').optional().trim().isLength({ min: 1, max: 100 }),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { status: 'published' };

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Level filter
    if (req.query.level) {
      filter.level = req.query.level;
    }

    // Price filter
    if (req.query.price) {
      switch (req.query.price) {
        case 'free':
          filter.price = 0;
          break;
        case 'paid':
          filter.price = { $gt: 0 };
          break;
        case 'under-50':
          filter.price = { $gt: 0, $lt: 50 };
          break;
        case 'under-100':
          filter.price = { $gt: 0, $lt: 100 };
          break;
      }
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Build sort object
    let sort = {};
    switch (req.query.sort) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { averageRating: -1 };
        break;
      case 'popular':
        sort = { studentsEnrolled: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Execute query
    const courses = await Course.find(filter)
      .populate('instructor', 'name avatar bio teachingStats')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const totalCourses = await Course.countDocuments(filter);
    const totalPages = Math.ceil(totalCourses / limit);

    // Calculate pagination info
    const pagination = {
      currentPage: page,
      totalPages,
      totalCourses,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    };

    res.status(200).json({
      success: true,
      message: `Retrieved ${courses.length} courses`,
      data: {
        courses,
        pagination
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving courses',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/courses/featured
// @desc    Get featured courses
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const courses = await Course.getFeatured(limit);

    res.status(200).json({
      success: true,
      message: `Retrieved ${courses.length} featured courses`,
      data: courses
    });

  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving featured courses',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/courses/popular
// @desc    Get popular courses
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const courses = await Course.getPopular(limit);

    res.status(200).json({
      success: true,
      message: `Retrieved ${courses.length} popular courses`,
      data: courses
    });

  } catch (error) {
    console.error('Get popular courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving popular courses',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/courses/categories
// @desc    Get all categories with course counts
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Course.aggregate([
      { $match: { status: 'published' } },
      { 
        $group: { 
          _id: '$category', 
          count: { $sum: 1 },
          avgRating: { $avg: '$averageRating' },
          totalStudents: { $sum: '$studentsEnrolled' }
        } 
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      message: `Retrieved ${categories.length} categories`,
      data: categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public (published courses), Private (draft courses for owners)
router.get('/:id', optionalAuth, requirePublishedCourse, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio expertise teachingStats')
      .populate('testimonials.student', 'name avatar');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Increment view count
    await Course.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.status(200).json({
      success: true,
      message: 'Course retrieved successfully',
      data: course
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (Instructors and Admins only)
router.post('/', auth, authorize('instructor', 'admin'), [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters'),
  body('category')
    .isIn([
      'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning',
      'DevOps', 'Design', 'Marketing', 'Business', 'Photography', 'Music',
      'Health & Fitness', 'Language', 'Other'
    ])
    .withMessage('Please select a valid category'),
  body('level')
    .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .withMessage('Please select a valid level'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('thumbnail')
    .isURL()
    .withMessage('Please provide a valid thumbnail URL')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add instructor to course data
    const courseData = {
      ...req.body,
      instructor: req.user.id
    };

    const course = await Course.create(courseData);

    // Populate instructor information
    await course.populate('instructor', 'name avatar bio');

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course owner or Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership (instructor owns the course or user is admin)
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own courses.'
      });
    }

    // Fields that can be updated
    const allowedUpdates = [
      'title', 'description', 'longDescription', 'thumbnail', 'previewVideo',
      'category', 'subcategory', 'tags', 'level', 'prerequisites', 'targetAudience',
      'learningObjectives', 'skillsYouWillLearn', 'curriculum', 'price', 'originalPrice',
      'maxStudents', 'features', 'language', 'subtitles', 'metaDescription', 'metaKeywords'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    course = await Course.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    ).populate('instructor', 'name avatar bio');

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Course owner or Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own courses.'
      });
    }

    // Check if course has enrolled students
    if (course.studentsEnrolled > 0 && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course with enrolled students. Please contact support.'
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private (Students only)
router.post('/:id/enroll', auth, authorize('student'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course is published
    if (course.status !== 'published') {
      return res.status(400).json({
        success: false,
        message: 'Cannot enroll in unpublished course'
      });
    }

    // Check if course has reached max capacity
    if (course.maxStudents && course.studentsEnrolled >= course.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Course has reached maximum capacity'
      });
    }

    const user = await User.findById(req.user.id);

    // Check if already enrolled
    const isEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.course.toString() === course._id.toString()
    );

    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // For paid courses, you would integrate payment processing here
    if (course.price > 0) {
      // Payment logic would go here (Stripe, PayPal, etc.)
      // For now, we'll simulate successful payment
      console.log(`Payment processing for course ${course._id}, amount: $${course.price}`);
    }

    // Enroll user in course
    await user.enrollInCourse(course._id);

    // Update course enrollment count
    await course.enrollStudent(user._id);

    // Update instructor stats
    await User.findByIdAndUpdate(course.instructor, {
      $inc: { 'teachingStats.totalStudents': 1 }
    });

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        courseId: course._id,
        courseTitle: course.title,
        enrolledAt: new Date()
      }
    });

  } catch (error) {
    console.error('Course enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error enrolling in course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/courses/:id/students
// @desc    Get enrolled students for a course
// @access  Private (Course instructor or Admin only)
router.get('/:id/students', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check permissions
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only course instructors can view enrolled students.'
      });
    }

    // Find all users enrolled in this course
    const enrolledStudents = await User.find({
      'enrolledCourses.course': course._id
    }, 'name email avatar enrolledCourses.$ enrolledCourses.enrolledAt enrolledCourses.progress')
      .lean();

    // Format the response
    const students = enrolledStudents.map(student => ({
      _id: student._id,
      name: student.name,
      email: student.email,
      avatar: student.avatar,
      enrolledAt: student.enrolledCourses[0].enrolledAt,
      progress: student.enrolledCourses[0].progress,
      completedLessons: student.enrolledCourses[0].completedLessons?.length || 0
    }));

    res.status(200).json({
      success: true,
      message: `Retrieved ${students.length} enrolled students`,
      data: {
        courseTitle: course.title,
        totalStudents: students.length,
        students
      }
    });

  } catch (error) {
    console.error('Get course students error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving course students',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/courses/:id/publish
// @desc    Publish/unpublish course
// @access  Private (Course instructor or Admin only)
router.post('/:id/publish', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check permissions
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only course instructors can publish courses.'
      });
    }

    const { action } = req.body; // 'publish' or 'unpublish'

    if (action === 'publish') {
      // Basic validation before publishing
      if (!course.curriculum || course.curriculum.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot publish course without curriculum content'
        });
      }

      course.status = 'published';
      course.publishedAt = new Date();
    } else if (action === 'unpublish') {
      course.status = 'draft';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "publish" or "unpublish"'
      });
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: `Course ${action}ed successfully`,
      data: {
        courseId: course._id,
        status: course.status,
        publishedAt: course.publishedAt
      }
    });

  } catch (error) {
    console.error('Publish course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error publishing course',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;