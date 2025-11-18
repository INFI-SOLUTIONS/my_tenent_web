import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-tenent-server.vercel.app",
  timeout: 10000,
});

export default axiosInstance;
