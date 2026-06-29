# LMS E-Learning Platform with AI-Powered Advisor

A premium MERN-stack Learning Management System (LMS) designed to offer an immersive, interactive, and responsive course learning experience. Features include user/admin dashboards, course progression tracking, a secure payment gateway integration, and a newly optimized **AI Academy Advisor** built with Groq.

🔗 **Live Demo:** [https://e-learning-platform-delta-nine.vercel.app/](https://e-learning-platform-delta-nine.vercel.app/)

---

## 🌟 Key Features

*   **🔒 Auth & Profiles:** Secure registration, JWT-based sessions, cookie storage, password resets, and user profile management (avatar uploads powered by Cloudinary).
*   **📚 Course Catalog:** Advanced filtering by category (Frontend, Backend, Database, Full Stack, etc.), level (Beginner, Intermediate, Advanced), and detailed course specifications.
*   **💳 Payments:** Seamless purchase flow integrated with **Razorpay** secure checkout.
*   **📈 Progress Tracking:** Lesson completion statuses and course learning progression bars.
*   **👑 Admin Dashboard:** Complete control for administrators to manage courses, list mentors, and view orders.
*   **🤖 AI Academy Advisor (Upgraded):**
    *   **Contextual Awareness:** Reads logged-in student details (name, email) and avoids recommending courses they are already enrolled in.
    *   **Structured Outputs:** Uses LLM JSON response mode to parse answers.
    *   **Premium Interactive UI:** Renders recommendations as sleek, micro-animated course cards containing badges, durations, price tags, and direct detail links.
    *   **Model Fallback Resilience:** Queries `llama-3.3-70b-versatile` with automatic fallback to `llama-3.1-8b-instant` if rate limits occur.

---

## 🛠 Tech Stack

### Frontend
*   **React 19** with **Vite** (fast bundling)
*   **Tailwind CSS** (sleek, modern styling)
*   **Framer Motion** (smooth layout transitions and micro-animations)
*   **Lucide React** (premium icons)
*   **Axios** (API requests with automatic token interceptors)

### Backend
*   **Node.js & Express** (structured MVC framework)
*   **Mongoose (MongoDB)** (schema modeling and relationships)
*   **Groq SDK** (AI text models execution)
*   **Nodemailer** (transmitting security emails)
*   **Cloudinary** (media file storage)
*   **Razorpay SDK** (secure payment order initiation)

---

## 📁 Repository Structure

```
├── backend/
│   ├── config/             # DB & cloud configurations
│   ├── controllers/        # Express request handlers (Auth, Courses, Orders, Chatbot, etc.)
│   ├── middlewares/        # Authentication, Error handling, Multer file upload filters
│   ├── models/             # Mongoose schemas (User, Course, Mentor, Order, Progress, etc.)
│   ├── routes/             # Express routes mapped to controllers
│   ├── utils/              # Email templates & error helper functions
│   ├── server.js           # Server port initiation
│   └── app.js              # Express app setup and middleware routing
└── frontend/
    ├── public/             # Static public assets
    └── src/
        ├── actions/        # Frontend action handlers (e.g. contact forms)
        ├── api/            # Centralized Axios API request client
        ├── components/     # UI components (auth, course cards, chatboat, profile, skeleton loaders)
        ├── context/        # React context (Auth context, theme, etc.)
        ├── layout/         # Base app page structures
        ├── Pages/          # Client-facing pages (Home, Course Details, Checkout, Dashboard)
        └── routes/         # Lazy-loaded router path configuration
```

---

## 🚀 Installation & Setup

Ensure you have **Node.js (v18+)** installed. You can run packages using `npm` or `bun`.

### 1. Clone the project and configure environment variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES=30d
JWT_COOKIE_EXPIRES=30
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USERNAME=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=your_gmail@gmail.com
GROQ_API_KEY=your_groq_api_key
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/
```

### 2. Install dependencies & run the Backend
```bash
cd backend
npm install
npm run dev
```
*The server will start on [http://localhost:5000](http://localhost:5000).*

### 3. Install dependencies & run the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*The React app will boot up on [http://localhost:5173](http://localhost:5173).*

---

## 🤖 Upgraded AI Advisor Details

The AI Chatbot utilizes **Groq's JSON response mode**. It automatically receives:
1. **User Profile details** (if logged in, using token validation) to avoid recommending already bought courses.
2. **Current published course database catalog** (to keep recommendation information 100% accurate).

If the AI recommends any courses, they are structured as JSON and rendered in the chat window as interactive cards:
*   Clicking **"View Details"** routes directly to the `/courses/:id` page and dismisses the chat window.
*   Category badges, prices, and durations are formatted dynamically.
*   Chat window automatically scrolls to the bottom on new replies.
*   Typing indicator is rendered as a clean, animated pulsing element.
