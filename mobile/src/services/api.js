import axios from "axios";

const api = axios.create({
  baseURL: "http://100.0.0.111:3333"
});

export default api;
