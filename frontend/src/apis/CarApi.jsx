import axios from "axios";
import { TokenJson } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/cars/";

export const GetCar = async () => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.get(api, TokenJson());
  console.log(res.data);
  return res.data;
  } else {
    console.log("No token");
  }
};

export const DeleteCar = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.delete(`${api}${id}/`, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateCar = async (values) => {
  console.log(JSON.stringify(values));
  if (localStorage.getItem("accessToken")) {
    const res = await axios.post(api, values, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateCar = async (values) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.put(`${api}${values.selectedData}/`, values.values, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};
export const GetCarDetail = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.get(`${api}${id}/`, TokenJson());
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
