const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();


//routes importing
const errorMiddleware = require('./middlewares/errors');
const courseRoutes = require('./routes/course.routes')
const mentorRoutes = require('./routes/mentor.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const contactRoutes = require("./routes/contact.routes");
const progressRoutes = require('./routes/progress.routes');

//auth Routes
const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');


// Middlewares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes declared
app.get('/', (req, res) => {
  res.send('api is working');
});

app.use('/api/courses', courseRoutes);
app.use('/api/mentors', mentorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/contact',contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/progress', progressRoutes);

// globelly Error handle middleware
app.use(errorMiddleware);

module.exports = app;
