import axios from "axios";
// import { Token } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/stations/";

export const GetStation = async () => {
    // if (localStorage.getItem("accessToken")) {
    const res = await axios.get(api);
    return res.data;
    // } else {
    //   console.log("No token");
    // }
};


export const CreateStation = async (values) => {
    // if (localStorage.getItem("accessToken")) {
    const res = await axios.post(api, values);
    return res.data;
    // } else {
    //     console.log("No token");
    // }
}

export const UpdateStation = async (values) => {
    console.log('xxxxx', values);
    // if (localStorage.getItem("accessToken")) {
    const res = await axios.put(`${api}${values.selectedData}`, values.values);
    return res.data;
    // } else {
    //     console.log("No token");
    // }
}

export const DeleteStation = async (id) => {
    //   if (localStorage.getItem("accessToken")) {
    const res = await axios.delete(`${api}${id}`);
    return res.data;
    //   } else {
    //     console.log("No token");
    //   }
};