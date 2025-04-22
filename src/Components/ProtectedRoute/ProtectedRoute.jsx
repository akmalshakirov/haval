import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthRouter from "../../app/AuthRouters/AuthRouter";
import AdminPanel from "../Admin/Admin";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [location]);

    if (isAuthenticated === null) {
        return;
    }

    if (!isAuthenticated) {
        return <AuthRouter />;
    }

    return <AdminPanel />;
};

export default ProtectedRoute;
