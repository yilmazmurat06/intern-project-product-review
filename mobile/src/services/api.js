import axios from 'axios';
import { Platform } from 'react-native';

// NOTE: If you are using Expo Go on a physical device, you must replace 'localhost' 
// with your computer's LAN IP address (e.g., 'http://192.168.1.100:8080/api').
// '10.0.2.2' works for Android Emulator.
// 'localhost' works for iOS Simulator.
const BASE_URL = Platform.OS === 'android' 
  ? 'http://192.168.1.89:8080/api' 
  : 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = (page = 0, size = 10) => {
  return api.get(`/products?page=${page}&size=${size}`);
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const getReviewsByProduct = (productId, page = 0, size = 10) => {
  return api.get(`/products/${productId}/reviews?page=${page}&size=${size}`);
};

export const createReview = (productId, reviewData) => {
  return api.post(`/products/${productId}/reviews`, reviewData);
};

export default api;
