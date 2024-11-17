import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await api.post('/products', formData);
  return data;
};

export const updateProduct = async (formData) => {
  const { data } = await api.put(`/products/${formData.get('id')}`, formData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const loginAdmin = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const getAdminStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data;
};

export const submitContact = async (formData) => {
  const { data } = await api.post('/contact', formData);
  return data;
};

export const submitFeedback = async (feedback) => {
  const { data } = await api.post('/feedback', feedback);
  return data;
};

export const submitCheckout = async (orderDetails) => {
  const { data } = await api.post('/orders', orderDetails);
  return data;
};