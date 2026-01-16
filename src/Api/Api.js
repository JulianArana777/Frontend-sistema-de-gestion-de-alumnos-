import axios from "axios";

//Crear api para conectarse al backend como variable de entorno 
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export default api;