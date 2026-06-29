//@ts-ignore

import { createBrowserRouter } from 'react-router-dom';

// =========================
// Layouts
// =========================
import AppLayout from '../layout/AppLayout';
import DashboardLayout from '../layout/DashboardLayout';

// =========================
// Route Protection
// =========================
import ProtectedCourseRoute from './ProtectedRoute';
import AdminRoute from '../components/auth/AdminRoute';

// =========================
// Actions
// =========================
import { contactData } from '../actions/contactAction';

// =========================
// Lazy Loaded Pages
// =========================
import {
  Home,
  About,
  Contact,
  Courses,
  CourseDetails,
  LearnCourse,
  MyCourses,
  Checkout,
  Profile,
  Login,
  Register,
  ForgotPassword,
  Dashboard,
  ManageCourses,
  ManageMentors,
  ManageOrders,
  ErrorPage,
} from './lazyImports';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,

    children: [
      // =====================================================
      // PUBLIC ROUTES
      // =====================================================

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
        element: <CourseDetails />,
      },

      // =====================================================
      // AUTH ROUTES
      // =====================================================

      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'register',
        element: <Register />,
      },

      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },

      // =====================================================
      // PROTECTED USER ROUTES
      // =====================================================

      {
        path: 'my-courses',
        element: (
          <ProtectedCourseRoute>
            <MyCourses />
          </ProtectedCourseRoute>
        ),
      },

      {
        path: 'profile',
        element: (
          <ProtectedCourseRoute>
            <Profile />
          </ProtectedCourseRoute>
        ),
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
        path: 'checkout',
        element: <Checkout />,
      },

      // =====================================================
      // ADMIN DASHBOARD ROUTES
      // =====================================================

      {
        path: 'dashboard',

        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),

        children: [
          {
            index: true,
            element: <Dashboard />,
          },

          {
            path: 'courses',
            element: <ManageCourses />,
          },

          {
            path: 'mentors',
            element: <ManageMentors />,
          },

          {
            path: 'orders',
            element: <ManageOrders />,
          },
        ],
      },

      // =====================================================
      // 404 ROUTE
      // =====================================================

      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);
