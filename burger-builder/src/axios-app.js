import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://react-burger-gm.firebaseio.com/',
});

export default axiosInstance;