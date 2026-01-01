import axios, { AxiosInstance, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

export const BASE_URL = 'http://192.168.1.74:8000';

let memoryToken: string | null = null;

export const setAuthToken = async (token: string | null) => {
  memoryToken = token;

  if (token) {
    await SecureStore.setItemAsync('token', token);
  } else {
    await SecureStore.deleteItemAsync('token');
  }
};

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ------------------------------------------------
 | REQUEST INTERCEPTOR
 ------------------------------------------------ */
api.interceptors.request.use(async (config) => {
  if (!memoryToken) {
    memoryToken = await SecureStore.getItemAsync('token');
  }

  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }

  return config;
});

/* ------------------------------------------------
 | RESPONSE INTERCEPTOR
 | Auto logout on 401
 ------------------------------------------------ */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await setAuthToken(null);
    }

    return Promise.reject(error);
  }
);

export default api;
