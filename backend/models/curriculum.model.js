const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
      required: true,
    },

    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Curriculum', curriculumSchema);
