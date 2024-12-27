import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import config from "../config/configProvider";

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  timeout: 10000, // Set a timeout for requests (optional)
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add Authorization header or any custom headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Example: Add custom headers for content type
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can process successful responses here
    return response;
  },
  (error) => {
    // Example: Handle specific HTTP errors globally
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized errors
      // localStorage.clear();
      // window.location.reload()
      console.error("Unauthorized access - redirecting to login.");
    }
    return Promise.reject(error);
  }
);

// Export the API service
const apiService = async <T>(endpoint: string, options: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const baseUrl = `${config.apiBaseUrl}/${endpoint}`;
  const response = await apiClient({ url: baseUrl, ...options });
  return response;
};

export default apiService;
