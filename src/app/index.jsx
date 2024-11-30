import React from "react";
import AppRouter from "./AppRouters/AppRouter";
import AuthRouter from "./AuthRouters/AuthRouter";

function App() {
    const isLoggin = true;
    return <>{isLoggin ? <AppRouter /> : <AuthRouter />}</>;
}

export default App;
