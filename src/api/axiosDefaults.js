// API
import axios from "axios";

// Set the default configuration for axios requests
axios.defaults.baseURL = "https://where-next-drf-api.herokuapp.com/"; // Base URL for API requests
// Default content type for POST requests
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Send cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Create an instance of axios for request interceptors
export const axiosReq = axios.create();

// Create an instance of axios for response interceptors
export const axiosRes = axios.create();
