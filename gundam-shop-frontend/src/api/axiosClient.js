import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://gundamshop-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;