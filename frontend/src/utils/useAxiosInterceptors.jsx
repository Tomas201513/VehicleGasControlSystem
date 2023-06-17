import axios from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000";

let access = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(async (req) => {
    // console.log("req", req);
    if (!access) {
        access = localStorage.getItem("accessToken")
            ? localStorage.getItem("accessToken")
            : null;
    }
    // console.log("access", access);

    const user = jwt_decode(access);

    const expirationTime = new Date(user.exp * 1000);
    const isExpired = expirationTime < new Date();
     // compare with current time
    // console.log("isExpired", isExpired);
    if (isExpired) {
        try {
            // console.log("iiiiiiiiiiiiiiiiiiiiiii");

            const response = await axios.post(
                `${baseURL}/api/auth/refresh`,
                {
                    refreshToken: localStorage.getItem("refreshToken"),
                }
            );
            // console.log("response", response);

            const { accessToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            access = accessToken;
        } catch (error) {
            // console.log(error);
            // Handle error here
            throw error;
        }
    }

    req.data = {
        ...req.data,
        accessToken: access,
    };

    return req;
});

export default axiosInstance;