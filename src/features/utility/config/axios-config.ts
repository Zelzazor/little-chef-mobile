import { API_URL } from '@env';
import { AxiosRequestConfig } from 'axios';

export const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};
