import axios from "axios";
import { TokenJson } from "./token/AuthToken";
import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/fuel/";
const api2 = "http://127.0.0.1:8000/api/fuel/car/";
const api3 = "http://127.0.0.1:8000/api/fuel/monthly/1" // 1 is just a placeholder


export const GetFuel = async () => {
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.get(api, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};
export const GetFuelByCar = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.get(`${api2}${id}/`, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};

export const GetFuelByMonth = async () => {
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.get(api3, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};


export const DeleteFuel = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.delete(`${api}${id}/`, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateFuel = async (values) => {
  console.log(values);
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.post(api, values, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateFuel = async (values) => {
  console.log(values);
  console.log('bem');
  if (localStorage.getItem("accessToken")) {
    const res = await axiosInstance.put(`${api}${values.cardRow}/`, values.values, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};
