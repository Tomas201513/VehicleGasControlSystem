// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import AuthLayout from './layouts/auth/AuthLayout'
import Page404 from './pages/Page404'

function RoutesComponent() {
  return (

    <Routes>
        <Route element={<AuthLayout />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Page404 />} />
    </Routes>



 )
}



export default RoutesComponent