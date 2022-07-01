import axios from "axios";

const axiosApi = axios.create({
  baseURL: window.location.origin + "/api/",
});

export default axiosApi;
