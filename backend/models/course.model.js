const mongoose = require('mongoose');

// ============================================
// COURSE SCHEMA
// Main course collection
// Stores course information, mentor details,
// pricing, curriculum reference, learning outcomes, etc.
// ============================================

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Course description is required'],
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'Full Stack', 'Design', 'Business', 'Marketing'],
    },

    image: {
      type: String,
      required: [true, 'Course image is required'],
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
    },

    oldPrice: Number,

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    students: {
      type: Number,
      default: 0,
    },

    lessons: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String,
      default: '',
    },

    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },

    language: {
      type: String,
      default: 'English',
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mentor',
      required: [true, 'Mentor is required'],
    },

    // ============================================
    // COURSE REQUIREMENTS
    // ============================================

    requirements: [
      {
        type: String,
      },
    ],

    // ============================================
    // LEARNING OUTCOMES
    // ============================================

    learningOutcomes: [
      {
        type: String,
      },
    ],

    // ============================================
    // CURRICULUM REFERENCE
    // ============================================

    curriculum: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Curriculum',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('courses', courseSchema);
