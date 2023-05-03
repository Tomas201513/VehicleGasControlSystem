import axios from "axios";
// import { Token } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/fuel/";
const api2 = "http://127.0.0.1:8000/api/fuel/car/";

export const GetFuel = async () => {
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.get(api);
  return res.data;
  // } else {
  //   console.log("No token");
  // }
};
export const GetFuelByCar = async (id) => {
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.get(`${api2}${id}/`);
  return res.data;
  // } else {
  //   console.log("No token");
  // }
};


export const DeleteFuel = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.delete(`${api}${id}/`);
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateFuel = async (values) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.post(api, values);
    return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateFuel = async (values) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.put(`${api}${values.selectedData}/`, values.values);
    return res.data;
  } else {
    console.log("No token");
  }
};
