import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import apiService from "../utils/apiService";
import config from "../config/configProvider";

export const useApi = <T>(endpoint: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => { 
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService<T>(`${config.apiBaseUrl}${endpoint}`, options || {});
        setData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options, config.apiBaseUrl]);

  return { data, error, loading };
};
