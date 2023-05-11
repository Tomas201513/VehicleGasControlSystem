import axios from "axios";
// import { Token } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/fuel/";
const api2 = "http://127.0.0.1:8000/api/fuel/car/";
const api3 = "http://127.0.0.1:8000/api/fuel/monthly/1" // 1 is just a placeholder


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

export const GetFuelByMonth = async () => {
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.get(api3);
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
  console.log(values);
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.post(api, values);
  return res.data;
  // } else {
  //   console.log("No token");
  // }
};

export const UpdateFuel = async (values) => {
  console.log(values);
  console.log('bem');
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.put(`${api}${values.selectedData}/`, values.values);
  return res.data;
  // } else {
  //   console.log("No token");
  // }
};
