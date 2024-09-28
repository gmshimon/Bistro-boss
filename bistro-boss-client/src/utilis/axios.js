import axios from "axios"; 

const prod = "https://bistro-boss-fytb.onrender.com/api/v1/"

// const local = 'http://localhost:5000/api/v1/'

const instance = axios.create({
  baseURL : prod,
});

export default instance;