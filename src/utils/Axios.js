import axios from "axios";
import { store } from "../redux/store";

const BASE_URL = import.meta.env.VITE_API_URL;

const Axios = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

Axios.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response.data ?? response;
    },
    (error) => {
        const status = error?.response?.status;
        const message =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";

        if (status === 401) {
            localStorage.clear();
            window.location.href = "/auth/login";
        }

        if (status === 403) {
            console.error("Access denied");
        }

        if (status >= 500) {
            console.error("Server error");
        }

        return Promise.reject({
            success: false,
            status,
            message,
            raw: error,
        });
    }
);

export default Axios;
