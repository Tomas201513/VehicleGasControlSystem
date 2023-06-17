import axios from "axios";
import { TokenJson } from "./token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";
const api = "http://127.0.0.1:8000/api/quotas/";

export const GetQuota = async () => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.get(api, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}

export const GetQuotaDetail = async (id) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.get(`${api}${id}`, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}


export const CreateQuota = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.post(api, values, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}

export const UpdateQuota = async (values) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.put(`${api}${values.selectedData}`, values.values, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}


export const DeleteQuota = async (id) => {
    if (localStorage.getItem("accessToken")) {
        const res = await axiosInstance.delete(`${api}${id}`, TokenJson());
        return res.data;
    } else {
        // console.log("No token");
    }
}


