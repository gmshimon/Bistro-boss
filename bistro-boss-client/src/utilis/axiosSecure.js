import axios from "axios";

// Create an Axios instance
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
});

// Add a request interceptor to include the token in the headers
axiosSecure.interceptors.request.use(
  (config) => {
    // Retrieve the token from storage (e.g., localStorage or a variable)
     const token = localStorage.getItem('userToken');
    const {access_token} = JSON.parse(token)

    if (access_token) {
      // If a token exists, set it in the Authorization header
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosSecure;
