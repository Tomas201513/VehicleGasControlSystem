import axios from "axios";
import { TokenJson } from "./token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
const api = "http://127.0.0.1:8000/api/stations/";

export const GetStation = async () => {
    if (localStorage.getItem("accessToken")) {
        const res = await axios.get(api, TokenJson());
        return res.data;
    } else {
        console.log("No token");
    }
};


export const CreateStation = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axios.post(api, values, TokenJson());
        return res.data;
    } else {
        console.log("No token");
    }
}

export const UpdateStation = async (values) => {
    console.log('xxxxx', values);
    if (localStorage.getItem("accessToken")) {
        const res = await axios.put(`${api}${values.selectedData}`, values.values, TokenJson());
        return res.data;
    } else {
        console.log("No token");
    }
}

export const DeleteStation = async (id) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axios.delete(`${api}${id}`, TokenJson());
        return res.data;
    } else {
        console.log("No token");
    }
};
