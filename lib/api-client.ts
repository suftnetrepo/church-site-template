import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.JERUR_NEXT_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  config.headers.set('nj-api-key', process.env.JERUR_NEXT_API_KEY ?? '');
  return config;
});
