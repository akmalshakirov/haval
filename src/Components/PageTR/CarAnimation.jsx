import React from "react";
import "./CarAnimation.css";

const CarAnimation = () => {
    return (
        <div className='car-container'>
            <div className='car'>
                <div className='body'></div>
                <div className='tire front'></div>
                <div className='tire back'></div>
            </div>
        </div>
    );
};

export default CarAnimation;
