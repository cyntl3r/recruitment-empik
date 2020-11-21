import axios from 'axios';

export const getCartService = () => axios.get('/api/cart');

export const checkProductQuantity = (pid, quantity) =>
  axios.post('/api/product/check', { pid, quantity });
