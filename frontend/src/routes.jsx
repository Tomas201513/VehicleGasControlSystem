// import React from 'react'
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
function RoutesComponent() {
  return (

    <Routes>
      <Route element={<AuthLayout />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<DashboardLayout />} >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/station" element={<Station />} />

      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>



  )
}



export default RoutesComponent