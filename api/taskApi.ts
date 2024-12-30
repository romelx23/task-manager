import axios from "axios";

const backUrl = import.meta.env.VITE_BACK_URL;

const taskApi = axios.create({
  baseURL: backUrl + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default taskApi;
