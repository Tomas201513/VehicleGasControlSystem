import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

let access = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
console.log("access", access);
const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
    if (!access) {
        access = localStorage.getItem("accessToken")
            ? JSON.parse(localStorage.getItem("accessToken"))
            : null;
        req.headers.Authorization = `Bearer ${access}`;
    }

    const user = jwt_decode(access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
        const response = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken: localStorage.getItem("refreshToken"),
        });

        const { accessToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        req.headers.Authorization = `Bearer ${accessToken}`;
        return req;
    } catch (error) {
        console.log(error);
        // Handle error here
        throw error;
    }
});

export default axiosInstance;
