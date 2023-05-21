import { createContext, useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import PropTypes from 'prop-types';
import ToastContext from "src/context/hot-toast-context/HotToastContext";

const AuthContext = createContext({});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { showToast } = React.useContext(ToastContext);
  const [userDetail, setUserDetail] = useState(null);
  const [accessToken, setAccessTokens] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );
  async function loginUser(values) {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/logIn", {
        email: values.email,
        password: values.password
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setAccessTokens(res.data.accessToken);
      const decoded = jwt_decode(res.data.accessToken);
      setUserDetail(decoded);
      navigate("/app", { replace: true });
    } catch (err) {
      showToast("Login failed", "error", 2000);
      console.log(err);
    }
  }


  async function registerUser(values) {
    console.log("context" + JSON.stringify(values));
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        userName: values.name,
        email: values.email,
        password: values.password,
      });
      console.log("token" + JSON.stringify(res));
      if (res.status === 201) {
        navigate("/login", { replace: true });
      } else {
        throw new Error("Registration failed");
      }
      showToast("Registration successful", "success", 2000);
    } catch (err) {
      showToast("Registration failed", "error", 2000);
      console.error("Error registering user:", err.message);
    }
  }

  async function logoutUser() {
    try {
      const res = await axios.delete("http://127.0.0.1:8000/api/auth/logOut", {
        data: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      });
      console.log(res);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUserDetail(null);
      navigate("/login", { replace: true });
      // showToast("Logout successful", "success", 2000);
    } catch (err) {
      setUserDetail(null);
      navigate("/login", { replace: true });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      showToast("Logout failed", "error", 2000);
      console.error("Error logging out user:", err.message);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setUserDetail(decoded);
    }
  }, [accessToken]);


  return (
    <AuthContext.Provider
      value={{
        userDetail,
        loginUser,
        registerUser,
        logoutUser,
        accessToken,
        setUserDetail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node,
};
