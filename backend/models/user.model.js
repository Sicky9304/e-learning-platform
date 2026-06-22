//@ts-nocheck
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      maxlength: [30, 'Name cannot exceed 30 characters'],
    },

    email: {
      type: String,
      required: [true, 'Please enter email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },

    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },

    phoneNumber: {
      type: String,
      required: [true, 'Please enter phone number'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10 digit phone number'],
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    enrolledCourses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'courses',
        },
      ],
      default: [],
    },
    avatar: {
      public_id: {
        type: String,
        default: '',
      },
      url: {
        type: String,
        default: '',
      },
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// HASH PASSWORD
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// UPDATE PASSWORD CHANGED TIME
userSchema.pre('save', function () {
  if (!this.isModified('password') || this.isNew) return;

  this.passwordChangedAt = Date.now() - 1000;
});

// COMPARE PASSWORD
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// CHECK PASSWORD CHANGED AFTER TOKEN
userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

// GENERATE JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

// GENERATE PASSWORD RESET TOKEN
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
