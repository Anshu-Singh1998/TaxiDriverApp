import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Api = axios.create({
  baseURL: 'https://bluetaxi.varmadns.com/uat/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use(
  async config => {
    // Don't add token for login
    if (!config.url.includes('login')) {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default Api;
