import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import Login from "../../Pages/Login/Login";
import Dealers from "../../Pages/Dealers/Dealers";
import AdminPanel from "../../Components/Admin/Admin";
import HeaderSwiper from "../../Components/Header/HeaderSwiper";
import HavalDargo from "../../Pages/Models/Haval-Dargo/HavalDargo";
import Models from "../../Pages/Models/Models";
import PrivateRoute from "../../Components/PrivateRoute/Private.jsx";
import Register from "../../Pages/Register/Register.jsx";
import AdminLogin from "../../Components/Admin_login/AdminLogin.jsx";
import HavalJolion from "../../Pages/Models/Haval-Jolion/HavalJolion.jsx";
import Guarantee from "../../Pages/Guarantee/Guarantee.jsx";
import AdminLayout from "../../Components/Admin/AdminEXAMPLE.jsx";
import HavalM6 from "../../Pages/Models/Haval-M6/HavalM6.jsx";
import HavalH6 from "../../Pages/Models/HavalH6/HavalH6.jsx";
import GWMwignle7 from "../../Pages/Models/GWM-wingle-7/GWM-wignle-7.jsx";

function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    };

    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <HeaderNavBar />
                            <HeaderSwiper />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/admin-ex'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <AdminLayout />
                        </PrivateRoute>
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
                <Route
                    path='/models/haval-jolion'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <HavalJolion />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/models/haval-m6'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <HavalM6 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/models/haval-h6'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <HavalH6 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/models/gwm-wingle-7'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <GWMwignle7 />
                        </PrivateRoute>
                    }
                />

                <Route
                    path='/owners/service/guarantee'
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Guarantee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/register'
                    element={<Register />}
                    isAuthenticated={isAuthenticated}
                />

                <Route
                    path='/login'
                    element={
                        <Login
                            onLogin={handleLogin}
                            isAuthenticated={isAuthenticated}
                        />
                    }
                />

                <Route path='*' element={<Navigate to='/login' />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
