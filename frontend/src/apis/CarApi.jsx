import axios from "axios";
// import { Token } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/cars/";

export const GetCar = async () => {
  // if (localStorage.getItem("accessToken")) {
  const res = await axios.get(api);
  console.log(res.data);
  return res.data;
  // } else {
  //   console.log("No token");
  // }
};

export const DeleteCar = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.delete(`${api}${id}/`);
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateCar = async (values) => {
  console.log(JSON.stringify(values));
  if (localStorage.getItem("accessToken")) {
    const res = await axios.post(api, values);
    return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateCar = async (values) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.put(`${api}${values.selectedData}/`, values.values);
    return res.data;
  } else {
    console.log("No token");
  }
};


// export const DeleteCars= async (id) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.delete(`${api}${id}/`, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// };

// export const CreateCars = async (values) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.post(api, values, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// };

// export const UpdateCars = async (values) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.put(`${api}${values.id}/`, values, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// };
