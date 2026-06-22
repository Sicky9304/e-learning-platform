const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    videoType: {
      type: String,
      enum: ['youtube', 'iframe', 'video'],
      default: 'youtube',
    },

    videoUrl: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      default: '0 min',
    },

    notes: {
      type: String,
      default: '',
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lesson', lessonSchema);
