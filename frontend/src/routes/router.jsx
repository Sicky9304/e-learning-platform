import { createBrowserRouter } from 'react-router-dom';

// Layouts
import AppLayout from '../layout/AppLayout';
import DashboardLayout from '../layout/DashboardLayout';

// Pages
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Courses from '../Pages/Courses';
import Dashboard from '../Pages/Dashboard';

// Authentication Components
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import AdminRoute from '../components/auth/AdminRoute';

// Dashboard Components
import ManageCourses from '../components/dashboard/ManageCourses';
import ManageMentors from '../components/dashboard/ManageMentors';

// Error Page
import ErrorPage from '../components/error/ErrorPage';

// Actions
import { contactData } from '../actions/contactAction';

// Protected Course Routes
import ProtectedCourseRoute from './ProtectedRoute';
import CourseDetails from './../Pages/CourseDetails/CourseDetails';
import LearnCourse from '../Pages/CourseDetails/LearnCourse';
import Checkout from '../Pages/Checkout';
import ManageOrders from '../Pages/ManageOrders';
import MyCourses from '../Pages/CourseDetails/MyCourses';
import Profile from '../Pages/Profile';
import ForgotPassword from './../components/auth/ForgotPassword';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // =========================
      // Public Routes
      // =========================

      {
        index: true,
        element: <Home />,
      },

      {
        path: 'about',
        element: <About />,
      },

      {
        path: 'contact',
        element: <Contact />,
        action: contactData,
      },

      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:id',
        element: <CourseDetails />
      },

      // =========================
      // Protected Course Routes
      // =========================
      {
        path: '/my-courses',
        element: (
          <ProtectedCourseRoute>
            <MyCourses />
          </ProtectedCourseRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedCourseRoute>
            <Profile />
          </ProtectedCourseRoute>
        )
      },

      {
        path: 'learn/:id',
        element: (
          <ProtectedCourseRoute>
            <LearnCourse />
          </ProtectedCourseRoute>
        ),
      },
      {
        path: '/checkout',
        element: <ProtectedCourseRoute><Checkout /></ProtectedCourseRoute>
      },

      // =========================
      // Authentication Routes
      // =========================

      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },

      // =========================
      // Protected Admin Routes
      // =========================

      {
        path: 'dashboard',
        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          // Dashboard Home
          {
            index: true,
            element: <Dashboard />,
          },

          // Manage Courses
          {
            path: 'courses',
            element: <ManageCourses />,
          },

          // Manage Mentors
          {
            path: 'mentors',
            element: <ManageMentors />,
          },

          // Manage Orders
          {
            path: 'orders',
            element: <ManageOrders />
          },
        ],
      },

      // =========================
      // 404 Not Found Route
      // =========================

      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
