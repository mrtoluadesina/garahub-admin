import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const request = axios.create({
  baseURL: BASE_URL
});

const storage = localStorage.getItem("persist:garahub")


request.interceptors.request.use(config => {
    const user=JSON.parse(storage)
    const token =JSON.parse(user.LoginReducer).info.token;
    if (token){
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
},
error => {
    Promise.reject(error)
}
);

request.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default request;
