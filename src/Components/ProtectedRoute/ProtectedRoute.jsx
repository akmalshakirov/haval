import { Navigate } from "react-router-dom";
import { notification } from "antd";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        if (!authToken) {
            notification.error({
                message: "Xatolik!",
                description: "Bu sahifa faqat adminlar uchun!",
                placement: "bottomRight",
                duration: 500,
            });
            setIsAuthenticated(false);
        }
    }, [authToken]);

    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }

    return children;
};

export default ProtectedRoute;
