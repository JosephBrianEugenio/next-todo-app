import axios from "axios";

export const HTTP_WEB = () => {
  const defaultHeaders = {
    Accept: "application/json",
  };
  const webAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: defaultHeaders,
  });
  return webAxiosInstance;
};

export const HTTP_API = () => {
  const token = localStorage.getItem("access_token");
  const defaultHeaders = {
    "Content-type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const apiAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: defaultHeaders,
  });

  // Add a response interceptor to handle 401 errors and redirect
  apiAxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized request. Redirecting to login...");

        // Redirect to login page
        // use this because next.js not allowed to use any Navigation
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return apiAxiosInstance;
};
