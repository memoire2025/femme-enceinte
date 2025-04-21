import axios from "axios";

const api = axios.create({
    baseURL: "http://femme-enceinte.com",
});

api.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem("accessToken-femme-enceinte");
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (accessToken) {
        
        if (userInfo.exp < Date.now() / 1000) {

            localStorage.removeItem("accessToken-femme-enceinte");
            localStorage.removeItem('userInfo');
            window.location.href = "/login";
            return Promise.reject(new Error("No refresh token"));

        }
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => Promise.reject(error));

export default api;

