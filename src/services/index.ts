import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BACKEND_API;

const MainConnect = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
export default MainConnect
