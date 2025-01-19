import React from "react";
import { Link } from "react-router-dom";
import "./AuthRouters.css";

function AuthRouter() {
    return (
        <div className='not-found-page'>
            <Link to='/' className='not-found-page-link'>
                Orqaga qaytish
            </Link>
        </div>
    );
}

export default AuthRouter;
