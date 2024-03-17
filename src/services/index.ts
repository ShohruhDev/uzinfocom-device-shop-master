import axios from 'axios';
const MainConnect = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here
  },
  // You can add other default settings
});
export default MainConnect;
