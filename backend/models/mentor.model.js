const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name too short'],
    },

    role: {
      type: String,
      required: [true, 'Role is required'],
    },

    image: {
      type: String,
      required: [true, 'Image is required'],
    },

    bio: {
      type: String,
      required: [true, 'Bio is required'],
      minlength: [20, 'Bio too short'],
    },

    experience: {
      type: Number,
      min: [0, 'Invalid experience'],
    },

    linkedin: {
      type: String,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.*$/, 'Invalid LinkedIn URL'],
    },

    github: {
      type: String,
      match: [/^https?:\/\/(www\.)?github\.com\/.*$/, 'Invalid GitHub URL'],
    },
  },{ timestamps: true }
);

module.exports = mongoose.model('Mentor', mentorSchema);
