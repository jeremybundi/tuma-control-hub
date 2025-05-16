// hooks/useApi.ts
import api from '../utils/apiService';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const useApi = () => {
  const get = async <T>(
    url: string, 
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  };

  const post = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  };

  return { get, post };
};

export default useApi;