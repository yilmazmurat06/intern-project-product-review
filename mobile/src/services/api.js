import { Platform } from 'react-native';

// NOTE: If you are using Expo Go on a physical device, you must replace 'localhost' 
// with your computer's LAN IP address (e.g., 'http://192.168.1.100:8080/api').
// '10.0.2.2' works for Android Emulator.
// 'localhost' works for iOS Simulator.
// Using LAN IP 192.168.1.89 found from ipconfig
const BASE_URL = 'http://192.168.1.89:8080/api';

console.log('API Base URL:', BASE_URL);

const headers = {
  'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
  }
  return response.json();
};

export const getProducts = async (page = 0, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/products?page=${page}&size=${size}`, {
      method: 'GET',
      headers,
    });
    const data = await handleResponse(response);
    return { data };
  } catch (error) {
    console.error("Fetch error in getProducts:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'GET',
      headers,
    });
    const data = await handleResponse(response);
    return { data };
  } catch (error) {
    console.error("Fetch error in getProductById:", error);
    throw error;
  }
};

export const getReviewsByProduct = async (productId, page = 0, size = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}/reviews?page=${page}&size=${size}`, {
      method: 'GET',
      headers,
    });
    const data = await handleResponse(response);
    return { data };
  } catch (error) {
    console.error("Fetch error in getReviewsByProduct:", error);
    throw error;
  }
};

export const createReview = async (productId, reviewData) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify(reviewData),
    });
    const data = await handleResponse(response);
    return { data };
  } catch (error) {
    console.error("Fetch error in createReview:", error);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  getReviewsByProduct,
  createReview
};
