import axios from "axios";
import { TokenJson } from "./token/AuthToken";
// import axiosInstance from "src/utils/useAxiosInterceptors";

const api = "http://127.0.0.1:8000/api/users/";

export const GetUser = async () => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.get(api, TokenJson());
  return res.data;
  } else {
    console.log("No token");
  }
};

export const DeleteUser = async (id) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.delete(`${api}${id}/`, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const CreateUser = async (values) => {
  if (localStorage.getItem("accessToken")) {
    const res = await axios.post(api, values, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};

export const UpdateUser = async (values) => {
  console.log(values);
  if (localStorage.getItem("accessToken")) {
    const res = await axios.put(`${api}${values.selectedData}/`, values.values, TokenJson());
    return res.data;
  } else {
    console.log("No token");
  }
};



// export const DeleteUers = async (id) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.delete(`${api}${id}/`, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// };

// export const CreateUers = async (values) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.post(api, values, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// }; 

// export const UpdateUers = async (values) => {
//   if (localStorage.getItem("accessToken")) {
//     const res = await axios.put(`${api}${values.id}/`, values, Token());
//     return res.data;
//   } else {
//     console.log("No token");
//   }
// };
