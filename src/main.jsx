import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
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
    </BrowserRouter>
);
