import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/parallax";
import { Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import gwmWingle7 from "../../Images/gwm-wingle-7.jpg";
import havalDargo from "../../Images/haval-dargo.jpg";
import havalH6 from "../../Images/haval-h6.jpg";
import havalH9 from "../../Images/haval-h9.jpg";
import havalJolion from "../../Images/haval-jolion.jpg";
import havalM6 from "../../Images/haval-m6.jpg";
import "./Header.css";
import "./HeaderSwiper.css";

const images = [
    {
        src: havalH9,
        title: "YANGI HAVAL H9",
        desc: "O'ZBEKISTON YOLLARIDA ALLAQACHON",
        link: "/models/haval-h9",
    },
    {
        src: havalDargo,
        title: "YANGI HAVAL DARGO",
        desc: "TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.",
        link: "/models/haval-dargo",
    },
    {
        src: havalJolion,
        title: "YANGILANGAN HAVAL JOLION",
        desc: "SO'NGI URFDAGI SHAHAR KROSSOVERI",
        link: "/models/haval-jolion",
    },
    {
        src: havalM6,
        title: "HAVAL M6",
        desc: "XARID UCHUN ENG QULAY MAVJUD KROSSOVERLARDAN BIRI",
        link: "/models/haval-m6",
    },
    {
        src: havalH6,
        title: "HAVAL H6",
        desc: "IDEAL OILAVIY AVTOMOBIL",
        link: "/models/haval-h6",
    },
    {
        src: gwmWingle7,
        title: "GWM WINGLE 7",
        desc: "KO‘PROQ JOY - KO‘PROQ IMKONIYATLAR",
        link: "/models/gwm-wingle-7",
    },
];

const SwiperComponent = () => {
    const [parallaxEnabled, setParallaxEnabled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setParallaxEnabled(true), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='header-swiper-wrapper'>
            <Swiper
                parallax={parallaxEnabled}
                speed={2277}
                modules={[Parallax]}
                className='swiper-container'>
                {images.map(({ src, title, desc, link }, index) => (
                    <SwiperSlide
                        key={index}
                        className='swiper-slide1 intro-slide'>
                        <img src={src} alt={title} data-swiper-parallax='1' />
                        <div className='swiper-slide-content'>
                            <h1
                                className='slide-title'
                                data-swiper-parallax='-500'>
                                {title}
                            </h1>
                            <p
                                className='slide-description'
                                data-swiper-parallax='-500'>
                                {desc}
                            </p>
                            <Link
                                to={link}
                                className='slide-btn'
                                data-swiper-parallax='-400'>
                                Batafsil
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperComponent;
