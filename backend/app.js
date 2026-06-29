const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const helmet = require('helmet').default;
const rateLimit = require('express-rate-limit').default;

const app = express();

// Trust reverse proxy (needed for Render, Vercel, Heroku, Nginx, etc.) to get correct client IPs
app.set('trust proxy', 1);


//routes importing
const errorMiddleware = require('./middlewares/errors');
const courseRoutes = require('./routes/course.routes')
const mentorRoutes = require('./routes/mentor.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const contactRoutes = require("./routes/contact.routes");
const progressRoutes = require('./routes/progress.routes');
const chatbotRoutes = require('./routes/chatbot.routes');

//auth Routes
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');


// Middlewares
dotenv.config();
// Use Helmet with cross-origin friendly resource policy
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Rate Limiting to prevent brute-force / DDoS attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to sensitive endpoints
app.use('/api/auth/login', apiLimiter);
app.use('/api/auth/register', apiLimiter);
app.use('/api/chatbot/ask', apiLimiter);

// routes declared
app.get('/', (req, res) => {
  res.send('api is working');
});

app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/chatbot', chatbotRoutes);

// globelly Error handle middleware
app.use(errorMiddleware);

module.exports = app;
