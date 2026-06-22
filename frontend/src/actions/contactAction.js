
import api from './../api/ContactApi';

// This action function runs when the form is submitted
// It collects form data and sends it to the backend
export const contactData = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const res = await api.post('/api/contact', data);

    return {
      success: true,
      message: res.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Something went wrong. Please try again.',
    };
  }
};
