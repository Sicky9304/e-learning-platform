import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createCODOrder = async (data) => {
  const token = localStorage.getItem('token');
  const response = await API.post('/api/orders/create',data,
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
  const response = await API.get('/api/orders/my-orders',
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

  const response = await API.get('/api/orders/admin/all',
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

  const response = await API.put(`/api/orders/admin/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
