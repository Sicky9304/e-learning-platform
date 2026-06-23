import { lazy } from 'react';

// Public Pages
export const Home = lazy(() => import('../Pages/Home'));
export const About = lazy(() => import('../Pages/About'));
export const Contact = lazy(() => import('../Pages/Contact'));
export const Courses = lazy(() => import('../Pages/Courses'));

// Course Pages
export const CourseDetails = lazy(() => import('../Pages/CourseDetails/CourseDetails'));
export const LearnCourse = lazy(() => import('../Pages/CourseDetails/LearnCourse'));
export const MyCourses = lazy(() => import('../Pages/CourseDetails/MyCourses'));
export const Checkout = lazy(() => import('../Pages/Checkout'));

// User Pages
export const Profile = lazy(() => import('../Pages/Profile'));

// Auth Pages
export const Login = lazy(() => import('../components/auth/Login'));
export const Register = lazy(() => import('../components/auth/Register'));
export const ForgotPassword = lazy(() => import('../components/auth/ForgotPassword'));

// Dashboard Pages
export const Dashboard = lazy(() => import('../Pages/Dashboard'));
export const ManageCourses = lazy(() => import('../components/dashboard/ManageCourses'));
export const ManageMentors = lazy(() => import('../components/dashboard/ManageMentors'));
export const ManageOrders = lazy(() => import('../Pages/ManageOrders'));

// Error Page
export const ErrorPage = lazy(() => import('../components/error/ErrorPage'));
