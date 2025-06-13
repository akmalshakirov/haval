import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/parallax";
import { Autoplay, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import BYDChazor from "../../Images/byd-chazor.webp";
import BYDSongPlusChampion from "../../Images/byd-song-plus-champion.webp";
import BYDSongPlusEv from "../../Images/byd-song-plus-ev.webp";
import BYDSongProDmi from "../../Images/byd-song-pro-dmi.webp";
import "./Header.css";
import "./HeaderSwiper.css";

const images = [
    {
        src: BYDChazor,
        title: "BYD CHAZOR CHAMPION",
        price: "273 900 000",
        link: "/models/haval-h9",
    },
    {
        src: BYDSongProDmi,
        title: "SONG PRO DM-i Champion",
        price: "321 800 000",
        link: "/models/haval-dargo",
    },
    {
        src: BYDSongPlusEv,
        title: "SONG PLUS EV Champion",
        price: "395 300 000",
        link: "/models/haval-jolion",
    },
    {
        src: BYDSongPlusChampion,
        title: "SONG PLUS DM-i Champion",
        price: "387 200 000",
        link: "/models/haval-m6",
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
                speed={1577}
                autoplay={{
                    delay: 2200,
                }}
                modules={[Parallax, Autoplay]}
                className='swiper-container'>
                {images.map(({ src, title, price, link }, index) => (
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
                                {price} so'm
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
