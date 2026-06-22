import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// Get All Mentors
export const getMentors = () => {
  return api.get("/api/mentors");
}

// Get single Mentor
export const getMentorsByid = (id) => {
  return api.get(`/api/mentors/${id}`);
}

// Add Mentor
export const addMentor = (data) => {
  return api.post("/api/mentors",data)
}

// Delete Mentor
export const deleteMentor = (id) => {
  return api.delete(`/api/mentors/${id}`)
}

//Update Mentor
export const updateMentor = (id, data) => {
  return api.put(`/api/mentors/${id}`,data);
}
