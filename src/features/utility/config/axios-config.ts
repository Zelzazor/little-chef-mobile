import { API_URL } from '@env';
import { type AxiosRequestConfig } from 'axios';

export const AXIOS_CONFIG: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};
