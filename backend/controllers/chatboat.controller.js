//@ts-nocheck
const { Groq } = require('groq-sdk');
const jwt = require('jsonwebtoken');
const Course = require('../models/course.model');
const User = require('../models/user.model');
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

  // 1. Optional User Authentication Context
  let userContext = "The student is a guest (not logged in).";
  let enrolledCourseIds = [];
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const loggedInUser = await User.findById(decoded.id).populate('enrolledCourses');
      if (loggedInUser) {
        enrolledCourseIds = loggedInUser.enrolledCourses.map((c) => c._id.toString());
        userContext = `The student is logged in.
Name: ${loggedInUser.name}
Email: ${loggedInUser.email}
Enrolled Courses: ${loggedInUser.enrolledCourses.map((c) => c.title).join(', ') || 'None'}`;
      }
    } catch (err) {
      // Ignore token verification errors and treat as guest
    }
  }

  // 2. Fetch Available Courses
  const courses = await Course.find({ isPublished: true }).populate('mentor', 'name');

  if (!courses.length) {
    return res.status(200).json({
      success: true,
      reply: 'No courses are available right now.',
      courses: [],
    });
  }

  const courseList = courses
    .map(
      (course) => `ID: ${course._id}
Title: ${course.title}
Category: ${course.category}
Level: ${course.level}
Price: ₹${course.price}
Duration: ${course.duration || 'N/A'}
Language: ${course.language || 'English'}
Description: ${course.description}`
    )
    .join('\n-----------------\n');

  // 3. System Prompt specifying JSON response format
  const systemPrompt = `You are a helpful, expert AI Learning Advisor for our E-Learning Platform.
Your goal is to answer the student's question and recommend matching courses from the available courses list.

You MUST respond strictly in the following JSON format:
{
  "reply": "Your written answer to the student. You can use markdown like **bold** text and newline characters (\\n) for paragraphs and lists. If you recommend courses, briefly explain why in this text.",
  "courses": [
    {
      "_id": "The exact ID of the recommended course from the Available Courses list",
      "title": "The exact title of the recommended course",
      "price": number,
      "level": "The level of the recommended course",
      "category": "The category of the recommended course",
      "duration": "The duration of the recommended course"
    }
  ]
}

Rules:
1. ONLY recommend courses from the "Available Courses" list below. Do not make up courses.
2. Under "courses", use the exact details (especially ID, title, and price) from the provided course list.
3. If the user is logged in (details provided in Student Context), address them by name and personalize your advice. Do not recommend courses they are already enrolled in unless they ask about it.
4. If no courses are relevant to recommend, set the "courses" array to an empty array [].
5. Keep the response reply text engaging, supportive, and formatted beautifully.
6. The entire response must be a single valid JSON object.`;

  const userPrompt = `[Student Context]
${userContext}

[Student Question]
"${message}"

[Available Courses]
${courseList}`;

  let responseText;
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 800,
    });
    responseText = completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Llama-3.3-70b failed, trying Llama-3.1-8b-instant fallback...", error);
    try {
      const completionFallback = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 800,
      });
      responseText = completionFallback.choices[0].message.content;
    } catch (fallbackError) {
      console.error("Fallback Groq call failed:", fallbackError);
      return res.status(200).json({
        success: true,
        reply: "I'm having trouble connecting to my learning engine right now. Please try again in a moment!",
        courses: [],
      });
    }
  }

  // 4. Robust parsing and response formatting
  let parsedData;
  try {
    parsedData = JSON.parse(responseText);
  } catch (e) {
    parsedData = {
      reply: responseText,
      courses: [],
    };
  }

  const reply = parsedData.reply || (typeof parsedData === 'string' ? parsedData : "Here are some courses matching your query.");
  const recommendedCourses = Array.isArray(parsedData.courses) ? parsedData.courses : [];

  return res.status(200).json({
    success: true,
    reply: reply,
    courses: recommendedCourses,
  });
});
