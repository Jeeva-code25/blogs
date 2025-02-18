import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogs-server-lurm.onrender.com/',
    withCredentials: true
});
  
export default api