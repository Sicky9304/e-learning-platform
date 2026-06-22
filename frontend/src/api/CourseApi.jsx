import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Get categories count and categories
export const getCategoryCount = () => {
  return api.get('/api/courses/category-count');
};

//GET Top 5 latest Courses
export const getLatestCourses = () => {
  return api.get('/api/courses/latest');
};

// Get All Courses
export const getCourses = () => {
  return api.get("/api/courses");
};

// Get Single Course by Id
export const getCourseById = (id) => {
  return api.get(`/api/courses/${id}`);
};

// Add Course
export const addCourse = (data) => {
  return api.post("/api/courses", data);
};

// Delete Course
export const deleteCourse = (id) => {
  return api.delete(`/api/courses/${id}`);
};

// Update Course
export const updateCourse = (id, data) => {
  return api.put(`/api/courses/${id}`, data);
};

