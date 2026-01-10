import { Platform } from 'react-native';

// Tünel URL'i (Firewall engelini aşmak için)
// Bu URL geçicidir. Eğer çalışmazsa, terminalde "npx localtunnel --port 8080"
// komutunu çalıştırıp yeni verilen URL'i buraya yapıştırmalısınız.
const TUNNEL_URL = 'https://real-emus-swim.loca.lt';

const getBaseUrl = () => {
  return `${TUNNEL_URL}/api`;
};

const BASE_URL = getBaseUrl();

console.log('API Base URL:', BASE_URL);

const headers = {
  'Content-Type': 'application/json',
  'Bypass-Tunnel-Reminder': 'true', // Localtunnel uyarı sayfasını geçmek için
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
