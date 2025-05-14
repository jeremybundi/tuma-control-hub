// hooks/useApi.ts
import api from '../utils/apiService';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

const useApi = () => {
  const get = async <T>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  };

  const post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  };

  return { get, post };
};

export default useApi;