import { Platform } from 'react-native';
import Constants from 'expo-constants';

// UNIVERSAL SOLUTION: Works on all devices (physical & emulators & APK builds & WEB)
// Automatically detects the correct IP address for your backend
const BACKEND_PORT = '8080';

const getBaseUrl = () => {
  // Get the Expo development server's host IP (works for all scenarios)
  let debuggerHost = Constants.expoConfig?.hostUri 
    ? Constants.expoConfig.hostUri.split(':').shift()
    : null;

  // Remove tunnel domain if present (*.exp.direct, *.loca.lt)
  if (debuggerHost && (debuggerHost.includes('.exp.direct') || debuggerHost.includes('.loca.lt'))) {
    // Extract IP from tunnel URL or use manifest
    debuggerHost = Constants.expoConfig?.debuggerHost?.split(':').shift() || null;
  }

  let backendHost;

  // Check if we're in production APK but still testing locally
  const isLocalBuild = !__DEV__ && Platform.OS === 'android';
  
  if (__DEV__ || isLocalBuild) {
    // Development mode OR APK build for local testing
    if (Platform.OS === 'web') {
      // For web browser - use public backend tunnel
      backendHost = 'green-hoops-play.loca.lt';
    } else if (Platform.OS === 'android') {
      // For Android emulator, ALWAYS use 10.0.2.2 (special alias for host machine)
      // For physical Android devices with Expo Go, use LAN IP
      if (debuggerHost && !debuggerHost.includes('localhost') && __DEV__) {
        backendHost = debuggerHost; // Use LAN IP from Expo (only in dev with Expo Go)
      } else {
        backendHost = '10.0.2.2'; // For emulator and APK builds
      }
    } else if (Platform.OS === 'ios') {
      // For iOS simulator/physical device
      backendHost = debuggerHost || 'localhost';
    } else {
      // Fallback
      backendHost = 'localhost';
    }
  } else {
    // Production mode - set your production URL here
    backendHost = 'your-production-server.com';
  }

  const baseUrl = `http://${backendHost}:${BACKEND_PORT}/api`;
  return baseUrl;
};

const BASE_URL = getBaseUrl();

console.log('🔗 API Base URL:', BASE_URL);
console.log('📱 Platform:', Platform.OS);
console.log('🔧 Dev Mode:', __DEV__);
console.log('🌐 Debugger Host:', Constants.expoConfig?.hostUri);

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
    console.log('Creating review for product:', productId);
    console.log('Review data:', reviewData);
    console.log('Posting to:', `${BASE_URL}/products/${productId}/reviews`);
    
    const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers,
      body: JSON.stringify(reviewData),
    });
    
    console.log('Response status:', response.status);
    const data = await handleResponse(response);
    console.log('Review created successfully:', data);
    return { data };
  } catch (error) {
    console.error("Fetch error in createReview:", error);
    console.error("Error details:", error.message);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  getReviewsByProduct,
  createReview
};
