import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createRazorpayOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API}/api/payment/create-order`,
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
    `${API}/api/payment/verify-payment`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
