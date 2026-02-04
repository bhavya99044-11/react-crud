import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const createApi = (url, data) => {
    return axios
    .post(url,data)
    .then((response) => response.data)
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const getApi = (url) => {
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const deleteApi = (url) => {
    return axios
    .delete(url)
    .then((response) => response.data)
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export const updateApi = (url,data) => {
    return axios
    .get(url,data)
    .then((response) => response.data)
    .catch((e) => {
      console.error( e);
      throw e;
    });
};
