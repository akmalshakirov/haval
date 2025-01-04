import React, { useEffect, useState } from "react";
import "./Preloader.css";

const Preloader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (progress < 100) {
            timer = setTimeout(() => {
                setProgress((prev) => Math.min(prev + 1, 100));
            }, 15);
        } else {
            onFinish();
        }

        return () => clearTimeout(timer);
    }, [progress, onFinish]);

    return (
        <div className='preloader'>
            <div className='loader-container'>
                <div className='loading'>
                    Loading{" "}
                    <span className='blink'>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </div>
                <div className='progress-bar'>
                    <div
                        className='progress'
                        style={{ width: `${progress}%` }}></div>
                </div>
                <div className='progress-text'>{progress}%</div>
            </div>
        </div>
    );
};

export default Preloader;
