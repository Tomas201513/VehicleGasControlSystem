import axios from "axios";
import { TokenJson } from "./token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
const api = "http://127.0.0.1:8000/api/stations/";
const api2 = "http://127.0.0.1:8000/api/stations/fill/";

export const GetStation = async () => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.get(api, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
};


export const CreateStation = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.post(api, values, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}

export const UpdateStation = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.put(`${api}${values.selectedData}`, values.values, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}

export const FillStation = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.post(`${api2}${values.id}`, values, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}


export const DeleteStation = async (id) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.delete(`${api}${id}`, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
};
