//@ts-nocheck
const { Groq } = require('groq-sdk');
const Course = require('../models/course.model');
const ErrorHandler = require('../middlewares/errors');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const dotenv = require('dotenv');
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.getChatRecommendation = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return next(new ErrorHandler('Please enter a question', 400));
  }

  const courses = await Course.find({ isPublished: true }).populate('mentor', 'name');

  if (!courses.length) {
    return res.status(200).json({
      success: true,
      reply: 'No courses are available right now.',
    });
  }

  const courseList = courses
    .map(
      (course) => `Title: ${course.title} Category: ${course.category} Level: ${course.level}
  Price: ₹${course.price} Duration: ${course.duration} Language: ${course.language} Description: ${course.description}`
    )
    .join('\n-----------------\n');

  const prompt = `You are an AI assistant for an E-Learning Platform.
  Student Question:"${message}"
  Available Courses:${courseList}
  Rules:
  - Only recommend courses from the available course list.
  - Maximum 5 courses.
  - Return each course in separate lines.
  - Use this exact format:

  Course 1
  📚 Title: Course Name
  💰 Price: ₹999
  📊 Level: Beginner

  Course 2
  📚 Title: Course Name
  💰 Price: ₹999
  📊 Level: Intermediate

  - Do not use markdown (**)
  - Do not write long paragraphs.
  - Keep response clean and mobile friendly.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return res.status(200).json({
    success: true,
    reply: completion.choices[0].message.content,
  });
});
