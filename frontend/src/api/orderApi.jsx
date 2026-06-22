import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createCODOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API}/api/orders/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    `${API}/api/orders/my-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getAllOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(
    `${API}/api/orders/admin/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateOrderStatus = async (id, data) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(
    `${API}/api/orders/admin/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
