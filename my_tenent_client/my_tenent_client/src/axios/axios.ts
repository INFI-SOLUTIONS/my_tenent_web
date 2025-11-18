import axios from "axios";

// Use proxy in development, direct URL in production
const baseURL = import.meta.env.DEV 
  ? "/api"  // This will be proxied by Vite
  : "https://my-tenent-server.vercel.app";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

export default axiosInstance;
