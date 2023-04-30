import axios from "axios";
import { Token } from "./token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:3000/api/users";

export const GetUers = async () => {
  if (localStorage.getItem("access")) {
    const res = await axios.get(api, Token());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const DeleteUers= async (id) => {
  if (localStorage.getItem("access")) {
    const res = await axios.delete(`${api}${id}/`, Token());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateUers = async (values) => {
  if (localStorage.getItem("access")) {
    const res = await axios.post(api, values, Token());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateUers = async (values) => {
  if (localStorage.getItem("access")) {
    const res = await axios.put(`${api}${values.id}/`, values, Token());
    return res.data;
  } else {
    console.log("No token");
  }
};
