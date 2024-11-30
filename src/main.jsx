import { createRoot } from "react-dom/client";
import "./App.css";
import "./i18n.js";
import App from "./app/index.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <BrowserRouter
        future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
        }}>
        <App />
    </BrowserRouter>
);
