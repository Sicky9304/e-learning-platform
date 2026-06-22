import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payment';

export const createRazorpayOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/create-order`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const verifyPayment = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/verify-payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
