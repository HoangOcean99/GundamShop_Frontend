import axios from "axios";
import { auth } from "../../firebase";

const axiosClient = axios.create({
  baseURL: "https://gundamshop-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    // If token is missing but user is logged in via Firebase, fetch it
    if (!token && auth.currentUser) {
        try {
            token = await auth.currentUser.getIdToken(true);
            localStorage.setItem("token", token);
        } catch (err) {
            console.error("Failed to get Firebase token", err);
        }
    }

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