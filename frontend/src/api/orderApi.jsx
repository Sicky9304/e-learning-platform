import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const createCODOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    `${API_URL}/create`,
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
    `${API_URL}/my-orders`,
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
    `${API_URL}/admin/all`,
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
    `${API_URL}/admin/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
