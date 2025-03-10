import axios from "axios";
import store from "../redux/store";

const api = axios.create({
    baseURL: 'https://api-chater.vercel.app/',
    // baseURL: 'http://localhost:3600',
    headers: {
        "Content-Type": "application/json",
    }
});

// Fungsi untuk mengatur token dalam header permintaan Axios
api.interceptors.request.use(async function (config) {

    // Ambil token dari store sesuai kebutuhan
    const token = store.getState().auth.token;
    console.log('token', token)

    if (token) {
        config.headers["Authorization"] = token;
        // console.log('token', token)
    }

    // Periksa apakah permintaan mengandung file
    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;

}, function (error) {

    return Promise.reject(error);

});

// Tambahkan interceptor respons
api.interceptors.response.use(function (response) {

    return response

}, function (error) {
    if (error.response && error.response.status === 403) {
        window.location.pathname = '/auth/login'
    }

    // return Promise.reject(error);

});

export default api;
