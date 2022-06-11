import { axiosPrivate } from "./axios.js";

export const requestInterceptor = (token) => {
    axiosPrivate.interceptors.request.use(
        (config) => {
            // console.log("\x1b[33m%s\x1b[0m", "config : ", config);
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            } else {
                return Promise.reject(new Error("No token found"));
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return axiosPrivate;
};
