// utils/axios.ts
import axios from "axios";
import { BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional
});

export default axiosInstance;
