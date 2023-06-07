import React from 'react'
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import AuthLayout from './layouts/auth/AuthLayout'
import Page404 from './pages/Page404'
import DashboardLayout from './layouts/dashboard/DashboardLayout'
import Cars from "./pages/car/Cars";
import Fuel from "./pages/fuel/Fuel";
import Users from "./pages/user/Users";
import Scan from "./pages/Scan/Scan";
import Station from "./pages/station/Station";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContext from "./context/AuthContext";
import Account from "src/pages/account/Account"
import FillStation from "src/pages/station/FillStation";
import Quota from './pages/quota/Quota';
import Home from "src/pages/home/Home";
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function RoutesComponent() {
  const { userDetail,setUserDetail,setIsLoading, isLoading} = React.useContext(AuthContext);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setUserDetail(decoded);
      setIsLoading(false); // Add this line
    } else {
      setIsLoading(false); // Add this line
    }
  }, [ setUserDetail, userDetail?.userName]);
  return (

    <Routes> 
      <Route element={<AuthLayout />} >
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
          <Route path="*" element={<Page404 />} />

      <Route element={<PrivateRoute />} >
        <Route path="/app" element={<DashboardLayout />} >
          <Route path="/app/account" element={<Account />} />
          {userDetail && userDetail?.roles[0] === "admin" && (
            <>
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/users" element={<Users />} />
            <Route path="/app/cars" element={<Cars />} />
            <Route path="/app/fuel" element={<Fuel />} />
            <Route path="/app/station" element={<Station />} />
            <Route path="/app/quota" element={<Quota />} />
            
          </>
          )}
          <Route path="/app/scan" element={<Scan />} />
          <Route path="/app/fillstation" element={<FillStation />} />
          <Route path="/app/home" element={<Home />} />
          <Route path="*" element={<Navigate to={userDetail?.roles[0] === "admin" ? "/app/dashboard" : "/app/scan"} />} />

        </Route>
      </Route>
    </Routes>



  )
}



export default RoutesComponent