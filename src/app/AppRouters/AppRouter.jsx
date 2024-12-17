import React from "react";
import Models from "../../Pages/Models/Models";
import Dealers from "../../Pages/Dealers/Dealers";
import AdminPanel from "../../Components/Admin/Admin";
import { Navigate, Route, Routes } from "react-router-dom";
import Guarantee from "../../Pages/Guarantee/Guarantee.jsx";
import HavalH6 from "../../Pages/Models/HavalH6/HavalH6.jsx";
import HavalM6 from "../../Pages/Models/Haval-M6/HavalM6.jsx";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";
import HeaderSwiper from "../../Components/Header/HeaderSwiper";
import HavalDargo from "../../Pages/Models/Haval-Dargo/HavalDargo";
import AdminLogin from "../../Components/Admin_login/AdminLogin.jsx";
import GWMwignle7 from "../../Pages/Models/GWM-wingle-7/GWM-wignle-7.jsx";
import HavalJolion from "../../Pages/Models/Haval-Jolion/HavalJolion.jsx";

function AppRouter() {
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
                <Route path='/admin' element={<AdminPanel />} />
                <Route path='/admin/auth' element={<AdminLogin />} />
                <Route path='/dealers' element={<Dealers />} />
                <Route path='/models' element={<Models />} />
                <Route path='/models/haval-dargo' element={<HavalDargo />} />
                <Route path='/models/haval-jolion' element={<HavalJolion />} />
                <Route path='/models/haval-m6' element={<HavalM6 />} />
                <Route path='/models/haval-h6' element={<HavalH6 />} />
                <Route path='/models/gwm-wingle-7' element={<GWMwignle7 />} />
                <Route
                    path='/owners/service/guarantee'
                    element={<Guarantee />}
                />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </div>
    );
}

export default AppRouter;
