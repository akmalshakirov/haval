import React from "react";
import { Routes, Route } from "react-router-dom";
import Models from "../../Pages/Models/Models";
import Dealers from "../../Pages/Dealers/Dealers";
import AdminPanel from "../../Components/Admin/Admin";
import Guarantee from "../../Pages/Guarantee/Guarantee.jsx";
import HavalH6 from "../../Pages/Models/HavalH6/HavalH6.jsx";
import HavalM6 from "../../Pages/Models/Haval-M6/HavalM6.jsx";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import HeaderSwiper from "../../Components/Header/HeaderSwiper";
import HavalDargo from "../../Pages/Models/Haval-Dargo/HavalDargo";
import AdminLogin from "../../Components/Admin_login/AdminLogin.jsx";
import GWMwignle7 from "../../Pages/Models/GWM-wingle-7/GWM-wignle-7.jsx";
import HavalJolion from "../../Pages/Models/Haval-Jolion/HavalJolion.jsx";
import ProtectedRoute from "../../Components/ProtectedRoute/ProtectedRoute";
import MainModels from "../../Components/MainModels/MainModels.jsx";
import MainDealers from "../../Components/MainDealers/MainDealers.jsx";
import MainVideos from "../../Components/MainVideos/MainVideos.jsx";
import AuthRouter from "../AuthRouters/AuthRouter.jsx";
import TestDrive from "../../Pages/Test-drive/TestDrive.jsx";
import BDealer from "../../Pages/Become-dealer/BDealer.jsx";
import Login from "../../Pages/Login/Login.jsx";
import Registration from "../../Pages/Register/Register.jsx";
import User from "../../Pages/User/User.jsx";
import UserEditProfile from "../../Pages/User/UserEditProfile.jsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <>
                        <HeaderNavBar />
                        <HeaderSwiper />
                        <MainModels />
                        <MainDealers />
                        <MainVideos />
                    </>
                }
            />
            <Route
                path='/admin'
                element={
                    <ProtectedRoute>
                        <AdminPanel />
                    </ProtectedRoute>
                }
            />
            <Route path='/admin/auth' element={<AdminLogin />} />
            <Route path='/dealers' element={<Dealers />} />
            <Route path='/models' element={<Models />} />
            <Route path='/models/haval-dargo' element={<HavalDargo />} />
            <Route path='/models/haval-jolion' element={<HavalJolion />} />
            <Route path='/models/haval-m6' element={<HavalM6 />} />
            <Route path='/models/haval-h6' element={<HavalH6 />} />
            <Route path='/models/gwm-wingle-7' element={<GWMwignle7 />} />
            <Route path='/owners/service/guarantee' element={<Guarantee />} />
            <Route path='/test-drive' element={<TestDrive />} />
            <Route
                path='/about-gwm/haval-v-uzbekistane/how-become-dealer'
                element={<BDealer />}
            />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/user' element={<User />} />
            <Route path='*' element={<AuthRouter />} /> {/*<- NOT FOUND PAGE */}
        </Routes>
    );
};

export default AppRouter;
