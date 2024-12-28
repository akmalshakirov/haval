import { createRoot } from "react-dom/client";
import "./App.css";
import "./i18n.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter
        future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
        }}>
        <App />
    </BrowserRouter>
);
