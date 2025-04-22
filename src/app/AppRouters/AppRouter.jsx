import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PreLoader from "../../Components/PreLoader/PreLoader.jsx";

const AdminPanel = React.lazy(() => import("../../Components/Admin/Admin.jsx"));
const AdminLogin = React.lazy(() =>
    import("../../Components/Admin_login/AdminLogin.jsx")
);
const FooterComponent = React.lazy(() =>
    import("../../Components/Footer/Footer.jsx")
);
const HeaderNavBar = React.lazy(() =>
    import("../../Components/Header/HeaderNavBar")
);
const HeaderSwiper = React.lazy(() =>
    import("../../Components/Header/HeaderSwiper")
);
const MainDealers = React.lazy(() =>
    import("../../Components/MainDealers/MainDealers.jsx")
);
const MainModels = React.lazy(() =>
    import("../../Components/MainModels/MainModels.jsx")
);
const MainVideos = React.lazy(() =>
    import("../../Components/MainVideos/MainVideos.jsx")
);
const ProtectedRoute = React.lazy(() =>
    import("../../Components/ProtectedRoute/ProtectedRoute")
);
const BDealer = React.lazy(() =>
    import("../../Pages/Become-dealer/BDealer.jsx")
);
const Dealers = React.lazy(() => import("../../Pages/Dealers/Dealers"));
const Guarantee = React.lazy(() =>
    import("../../Pages/Guarantee/Guarantee.jsx")
);
const Login = React.lazy(() => import("../../Pages/Login/Login.jsx"));
const GWMwignle7 = React.lazy(() =>
    import("../../Pages/Models/GWM-wingle-7/GWM-wignle-7.jsx")
);
const HavalDargo = React.lazy(() =>
    import("../../Pages/Models/Haval-Dargo/HavalDargo")
);
const HavalJolion = React.lazy(() =>
    import("../../Pages/Models/Haval-Jolion/HavalJolion.jsx")
);
const HavalM6 = React.lazy(() =>
    import("../../Pages/Models/Haval-M6/HavalM6.jsx")
);
const HavalH6 = React.lazy(() =>
    import("../../Pages/Models/HavalH6/HavalH6.jsx")
);
const Models = React.lazy(() => import("../../Pages/Models/Models"));
const Registration = React.lazy(() =>
    import("../../Pages/Register/Register.jsx")
);
const TestDrive = React.lazy(() =>
    import("../../Pages/Test-drive/TestDrive.jsx")
);
const User = React.lazy(() => import("../../Pages/User/User.jsx"));
const AuthRouter = React.lazy(() => import("../AuthRouters/AuthRouter.jsx"));

const AppRouter = () => {
    return (
        <Suspense fallback={<PreLoader />}>
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
                            <FooterComponent />
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
                <Route
                    path='/owners/service/guarantee'
                    element={<Guarantee />}
                />
                <Route path='/test-drive' element={<TestDrive />} />
                <Route
                    path='/about-gwm/haval-v-uzbekistane/how-become-dealer'
                    element={<BDealer />}
                />
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/user' element={<User />} />
                {/* NOT FOUND PAGE */}
                <Route path='*' element={<AuthRouter />} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
