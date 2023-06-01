import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://44.202.63.26/company",
  headers: { "Content-Type": "application/json" }
});

export default axiosInstance
