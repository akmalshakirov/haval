import React, { useEffect } from "react";
import "./MainVideos.css";
import AOS from "aos";
import "aos/dist/aos.css";

function MainVideos() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-out",
        });
    }, []);
    return (
        <div className='main-videos'>
            <div>
                <h1 data-aos='fade-up'>Video sharhlar</h1>
            </div>
        </div>
    );
}

export default MainVideos;
