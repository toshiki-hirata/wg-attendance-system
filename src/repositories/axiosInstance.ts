import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.example.com', // TODO:API処理実現方針決定後取り込み
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
