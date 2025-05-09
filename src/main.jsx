import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import App from "./App.jsx";
import "./i18n.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter
        future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
        }}>
        <App />
        <ToastContainer limit={3} />
    </BrowserRouter>
);
