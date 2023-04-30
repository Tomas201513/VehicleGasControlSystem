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
  const { showToast } = React.useContext(ToastContext);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

    async function loginUser(values) {
    console.log("context" + JSON.stringify(values));
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/logIn",{email:values.email,password:values.password});
      console.log("token" + JSON.stringify(res));
      localStorage.setItem("token", res.data.accessToken);
      const decoded = jwt_decode(res.data.accessToken);
      setCurrentUser(decoded);  
      navigate("/dashboard", { replace: true });
      showToast("Login successful", "success", 2000);
    } catch (err) {
      showToast("Login failed", "error", 2000);
      console.log(err);
    }
  }

    async function registerUser(values) {
      console.log("context" + JSON.stringify(values));
      try {
        const res = await axios.post("http://localhost:8000/api/auth/register", values);
        if (res.data.success) {
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
            localStorage.removeItem("token");
            setCurrentUser(null);
            navigate("/login", { replace: true });
            await axios       
                    .post("http://localhost:8000/api/auth/logOut")
                    .then((res) => {
                            console.log(res);
                            navigate("/login", { replace: true });
                    }
                    )
                    .catch((err) => {

                            console.log(err);
                    }
                    );

        }


    return (
      <AuthContext.Provider
        value={{
          currentUser,
          loginUser,
          registerUser,
          logoutUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
  children: PropTypes.node,
};
