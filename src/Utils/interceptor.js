import { Axios } from "axios";

const baseURL = "http://192.168.1.72:8100/api/v1";
const api = Axios.create({
  baseURL: baseURL,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    return new Promise((resolve, reject) => {
      reject(error);
      throw error;
    });
  }
);
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default api;
