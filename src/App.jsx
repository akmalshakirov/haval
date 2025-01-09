import React, { useState, useEffect } from "react";
import AppRouter from "./app/AppRouters/AppRouter";
import Preloader from "./Components/Preloader/Preloader";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const handleContentLoaded = () => {
            setTimeout(() => {
                setIsLoading(true);
            }, 1000);
        };

        if (document.readyState === "complete") {
            setTimeout(() => {
                setIsLoading(true);
            }, 1000);
        } else {
            document.addEventListener("DOMContentLoaded", handleContentLoaded);
        }

        return () => {
            document.removeEventListener(
                "DOMContentLoaded",
                handleContentLoaded
            );
        };
    }, []);

    const handleFinish = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 300);
    };
    return (
        <div>
            {isLoading ? <Preloader onFinish={handleFinish} /> : <AppRouter />}
        </div>
    );
}

export default App;
