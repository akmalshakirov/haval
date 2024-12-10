import React from "react";
import "./Models.css";
import HeaderNavBar from "../../Components/Header/HeaderNavBar";

function Models() {
    return (
        <div className='models'>
            <div>
                <HeaderNavBar />
            </div>
            <div className='models-container'>
                <ul className='to-home'>
                    <li>
                        <a href='/'>Bosh sahifa</a>
                    </li>
                    <li>Modellar</li>
                </ul>
            </div>
        </div>
    );
}

export default Models;
