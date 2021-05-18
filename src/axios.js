import Axios from 'axios';

const axios = Axios.create({
  baseURL: "http://localhost:3001",
  headers: { Auth: "Simple Auth" },
  timeout: 3000,
});

export default axios;