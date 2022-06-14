import { axiosPrivate } from "./axios.js";
import { verifyJWT } from "../features/token/verifyJWT.js";

export const requestInterceptor = (token) => {
    console.group("requestInterceptor");
    const decoded = verifyJWT(token);
    if (decoded) {
        console.log("\x1b[33m%s\x1b[0m", "----------------------");
        console.log(`time now   : ${new Date()}\nexpiration : ${new Date((decoded.exp * 1000))}`)
        console.log("interceptor token : ", token)
        console.log("\x1b[33m%s\x1b[0m", "----------------------");
    } 
    console.groupEnd();
    axiosPrivate.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.common['Authorization'] = `Bearer ${token}`;
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
