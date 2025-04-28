import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // dein Backend-Server
  headers: {
    "Content-Type": "application/json",
  },
});

// Füge Interceptor hinzu, der automatisch Token anhängt
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
