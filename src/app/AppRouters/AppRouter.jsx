import React, { useState } from "react";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import Login from "../../Pages/Login/Login";
import Dealers from "../../Pages/Dealers/Dealers";
import AdminPanel from "../../Components/Admin/Admin";
import HeaderSwiper from "../../Components/Header/HeaderSwiper";
import HavalDargo from "../../Pages/Models/Haval-Dargo/HavalDargo";
import Models from "../../Pages/Models/Models";
import PrivateRoute from "../../Components/PrivateRoute/Private.jsx";
import Register from "../../Pages/Register/Register.jsx";
import AdminEXAMPLE from "../../Components/Admin/AdminEXAMPLE.jsx";
import AdminLogin from "../../Components/Admin_login/AdminLogin.jsx";
import CarAnimation from "../../Components/PageTR/CarAnimation.jsx";

function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <HeaderNavBar />
                            <HeaderSwiper />
                        </>
                    }
                />

                <Route
                    path='/admin'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/admin-example'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            {/* <AdminPanel /> */}
                            <AdminEXAMPLE />
                        </PrivateRoute>
                    }
                />

                <Route path='/admin/auth' element={<AdminLogin />} />

                <Route
                    path='/dealers'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Dealers />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/models'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Models />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/models/haval-dargo'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <HavalDargo />
                        </PrivateRoute>
                    }
                />

                <Route path='/register' element={<Register />} />

                <Route
                    path='/login'
                    element={<Login onLogin={handleLogin} />}
                />

                <Route path='*' element={<Navigate to='/login' />} />
                <Route path='/animation' element={<CarAnimation />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
