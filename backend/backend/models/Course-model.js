const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Long description cannot be more than 2000 characters']
  },
  thumbnail: {
    type: String,
    required: [true, 'Please provide a course thumbnail']
  },
  previewVideo: {
    type: String // URL to preview/trailer video
  },
  
  // Instructor Information
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Course must belong to an instructor']
  },
  
  // Course Categorization
  category: {
    type: String,
    required: [true, 'Please specify a course category'],
    enum: [
      'Web Development',
      'Mobile Development', 
      'Data Science',
      'Machine Learning',
      'DevOps',
      'Design',
      'Marketing',
      'Business',
      'Photography',
      'Music',
      'Health & Fitness',
      'Language',
      'Other'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Course Level and Prerequisites
  level: {
    type: String,
    required: [true, 'Please specify course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  prerequisites: [String],
  targetAudience: [String],
  
  // Learning Outcomes
  learningObjectives: [{
    type: String,
    required: true,
    maxlength: [200, 'Learning objective cannot be more than 200 characters']
  }],
  skillsYouWillLearn: [String],
  
  // Course Content Structure
  curriculum: [{
    sectionTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Section title cannot be more than 100 characters']
    },
    sectionDescription: {
      type: String,
      maxlength: [300, 'Section description cannot be more than 300 characters']
    },
    lessons: [{
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Lesson title cannot be more than 100 characters']
      },
      description: {
        type: String,
        maxlength: [300, 'Lesson description cannot be more than 300 characters']
      },
      videoUrl: {
        type: String,
        required: true
      },
      videoDuration: {
        type: Number, // in seconds
        required: true
      },
      videoQuality: {
        type: String,
        enum: ['720p', '1080p', '1440p', '2160p'],
        default: '1080p'
      },
      resources: [{
        title: String,
        type: {
          type: String,
          enum: ['pdf', 'doc', 'zip', 'link', 'image'],
          required: true
        },
        url: String,
        fileSize: Number // in bytes
      }],
      quiz: {
        questions: [{
          question: String,
          type: {
            type: String,
            enum: ['multiple-choice', 'true-false', 'fill-blank'],
            default: 'multiple-choice'
          },
          options: [String],
          correctAnswer: String,
          explanation: String,
          points: {
            type: Number,
            default: 1
          }
        }],
        passingScore: {
          type: Number,
          default: 70
        },
        timeLimit: Number // in minutes
      },
      assignment: {
        title: String,
        description: String,
        instructions: String,
        dueDate: Date,
        maxScore: {
          type: Number,
          default: 100
        },
        submissionFormat: {
          type: String,
          enum: ['text', 'file', 'url'],
          default: 'text'
        }
      },
      isFree: {
        type: Boolean,
        default: false
      },
      order: {
        type: Number,
        required: true
      }
    }],
    order: {
      type: Number,
      required: true
    }
  }],
  
  // Course Metrics
  totalDuration: {
    type: Number, // in minutes
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  totalQuizzes: {
    type: Number,
    default: 0
  },
  totalAssignments: {
    type: Number,
    default: 0
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Please provide a course price'],
    min: 0
  },
  originalPrice: {
    type: Number
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Enrollment and Statistics
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  maxStudents: {
    type: Number // null means unlimited
  },
  
  // Reviews and Ratings
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  ratingBreakdown: {
    fiveStars: { type: Number, default: 0 },
    fourStars: { type: Number, default: 0 },
    threeStars: { type: Number, default: 0 },
    twoStars: { type: Number, default: 0 },
    oneStar: { type: Number, default: 0 }
  },
  
  // Course Status and Availability
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'under-review'],
    default: 'draft'
  },
  publishedAt: Date,
  archivedAt: Date,
  
  // Enrollment Settings
  enrollmentType: {
    type: String,
    enum: ['open', 'invitation-only', 'closed'],
    default: 'open'
  },
  enrollmentStartDate: Date,
  enrollmentEndDate: Date,
  
  // Course Schedule (for live courses)
  isLive: {
    type: Boolean,
    default: false
  },
  liveSchedule: {
    startDate: Date,
    endDate: Date,
    timezone: String,
    meetingLink: String,
    recurringPattern: String // daily, weekly, etc.
  },
  
  // Features and Includes
  features: [{
    type: String,
    enum: [
      'Lifetime Access',
      'Mobile Access',
      'Certificate of Completion',
      'Direct Instructor Access',
      'Discussion Forum',
      'Downloadable Resources',
      '30-day Money Back Guarantee',
      'Live Q&A Sessions',
      'Coding Exercises',
      'Peer Reviews'
    ]
  }],
  
  // Language and Accessibility
  language: {
    type: String,
    default: 'English'
  },
  subtitles: [String], // Available subtitle languages
  hasTranscripts: {
    type: Boolean,
    default: false
  },
  
  // SEO and Marketing
  metaDescription: String,
  metaKeywords: [String],
  promotionalVideo: String,
  testimonials: [{
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    text: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    featured: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Analytics and Tracking
  views: {
    type: Number,
    default: 0
  },
  enrollmentConversionRate: {
    type: Number,
    default: 0
  },
  completionRate: {
    type: Number,
    default: 0
  },
  engagementScore: {
    type: Number,
    default: 0
  },
  
  // Admin Fields
  isPromoted: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  adminNotes: String,
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: String,
  
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create indexes for better query performance
CourseSchema.index({ instructor: 1 });
CourseSchema.index({ category: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ status: 1 });
CourseSchema.index({ price: 1 });
CourseSchema.index({ averageRating: -1 });
CourseSchema.index({ studentsEnrolled: -1 });
CourseSchema.index({ createdAt: -1 });
CourseSchema.index({ publishedAt: -1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ title: 'text', description: 'text' });

// Virtual for course URL slug
CourseSchema.virtual('url').get(function() {
  return `/course/${this.slug || this._id}`;
});

// Virtual for formatted duration
CourseSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.totalDuration / 60);
  const minutes = this.totalDuration % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
});

// Virtual for discount price
CourseSchema.virtual('discountPrice').get(function() {
  if (this.originalPrice && this.discountPercentage) {
    return Math.round(this.originalPrice * (1 - this.discountPercentage / 100) * 100) / 100;
  }
  return this.price;
});

// Virtual to check if course is on sale
CourseSchema.virtual('isOnSale').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

// Create slug before saving
CourseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  next();
});

// Calculate totals before saving
CourseSchema.pre('save', function(next) {
  let totalDuration = 0;
  let totalLessons = 0;
  let totalQuizzes = 0;
  let totalAssignments = 0;
  
  this.curriculum.forEach(section => {
    totalLessons += section.lessons.length;
    section.lessons.forEach(lesson => {
      totalDuration += lesson.videoDuration || 0;
      if (lesson.quiz && lesson.quiz.questions.length > 0) {
        totalQuizzes += 1;
      }
      if (lesson.assignment && lesson.assignment.title) {
        totalAssignments += 1;
      }
    });
  });
  
  this.totalDuration = Math.round(totalDuration / 60); // Convert to minutes
  this.totalLessons = totalLessons;
  this.totalQuizzes = totalQuizzes;
  this.totalAssignments = totalAssignments;
  
  next();
});

// Update published date when status changes to published
CourseSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Static method to get courses by category
CourseSchema.statics.findByCategory = function(category, options = {}) {
  return this.find({ 
    category, 
    status: 'published',
    ...options 
  }).populate('instructor', 'name avatar bio');
};

// Static method to get featured courses
CourseSchema.statics.getFeatured = function(limit = 6) {
  return this.find({ 
    isFeatured: true, 
    status: 'published' 
  })
  .populate('instructor', 'name avatar')
  .sort({ averageRating: -1 })
  .limit(limit);
};

// Static method to get popular courses
CourseSchema.statics.getPopular = function(limit = 6) {
  return this.find({ status: 'published' })
    .populate('instructor', 'name avatar')
    .sort({ studentsEnrolled: -1 })
    .limit(limit);
};

// Instance method to enroll a student
CourseSchema.methods.enrollStudent = function(studentId) {
  this.studentsEnrolled += 1;
  return this.save();
};

// Instance method to add a review
CourseSchema.methods.addReview = function(rating, review, studentId) {
  // Update rating breakdown
  const ratingField = `${['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars'][rating - 1]}`;
  this.ratingBreakdown[ratingField] += 1;
  
  // Recalculate average rating
  this.totalRatings += 1;
  const totalScore = (
    this.ratingBreakdown.fiveStars * 5 +
    this.ratingBreakdown.fourStars * 4 +
    this.ratingBreakdown.threeStars * 3 +
    this.ratingBreakdown.twoStars * 2 +
    this.ratingBreakdown.oneStar * 1
  );
  
  this.averageRating = Math.round((totalScore / this.totalRatings) * 10) / 10;
  
  return this.save();
};

module.exports = mongoose.model('Course', CourseSchema);