import React from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "swiper/swiper-bundle.css";
import havalDargo from "../../Images/haval-dargo.jpg";
import havalJolion from "../../Images/haval-jolion.jpg";
import havalM6 from "../../Images/haval-m6.jpg";
import havalH6 from "../../Images/haval-h6.jpg";
import gwmWingle7 from "../../Images/gwm-wingle-7.jpg";
import headerSwiperServices5Year from "../../Images/header-swiper-services-5-year.svg";
import havalSwiperVideo from "../../Images/HavalSwiperVideo.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Header.css";
import "./HeaderSwiper.css";

import { Autoplay, Parallax } from "swiper/modules";

const SwiperComponent = () => {
    return (
        <Swiper
            className='header-swiper-wrapper'
            autoplay={{
                delay: 6565,
                disableOnInteraction: false,
            }}
            parallax={true}
            speed={2277}
            modules={[Parallax, Autoplay]}>
            {/* Slide 1 */}
            <SwiperSlide className='swiper-slide1'>
                <img
                    src={havalDargo}
                    alt='haval-dargo'
                    data-swiper-parallax='1'
                />
                <div className='swiper-slide-content first-swiper-slide'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        YANGI HAVAL DARGO
                    </h2>
                    <p
                        className='slide-description'
                        data-swiper-parallax='-500'>
                        TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                    </p>
                    <a
                        href='/models/haval-dargo'
                        className='slide-btn'
                        data-swiper-parallax='-400'>
                        Batafsil
                    </a>
                </div>
                <div className='slide-service'>
                    <img src={headerSwiperServices5Year} alt='5-year' />
                    <img src={headerSwiperServices5Year} alt='service' />
                    <img src={headerSwiperServices5Year} alt='asl-' />
                </div>
            </SwiperSlide>
            {/* Slide 2 */}
            <SwiperSlide className='swiper-slide1'>
                <img
                    src={havalJolion}
                    alt='haval-dargo'
                    data-swiper-parallax='1'
                />
                <div className='swiper-slide-content'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        YANGILANGAN HAVAL JOLION
                    </h2>
                    <p
                        className='slide-description'
                        data-swiper-parallax='-500'>
                        SO'NGI URFDAGI SHAHAR KROSSOVERI
                    </p>
                    <a
                        href='/models/haval-jolion'
                        className='slide-btn'
                        data-swiper-parallax='-400'>
                        Batafsil
                    </a>
                </div>
            </SwiperSlide>
            {/* Slide 3 */}
            <SwiperSlide className='swiper-slide1'>
                <img src={havalM6} alt='haval-dargo' data-swiper-parallax='1' />
                <div className='swiper-slide-content swiper-slide-3'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        HAVAL M6
                    </h2>
                    <p
                        className='slide-description'
                        data-swiper-parallax='-500'>
                        XARID UCHUN ENG QULAY MAVJUD KROSSOVERLARDAN BIRI
                    </p>
                    <a
                        href='/models/haval-m6'
                        className='slide-btn'
                        data-swiper-parallax='-400'>
                        Batafsil
                    </a>
                </div>
            </SwiperSlide>
            {/* Slide 4 */}
            <SwiperSlide className='swiper-slide1'>
                <img src={havalH6} alt='haval-dargo' data-swiper-parallax='1' />
                <div className='swiper-slide-content'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        HAVAL H6
                    </h2>
                    <p
                        className='slide-description'
                        data-swiper-parallax='-500'>
                        IDEAL OILAVIY AVTOMOBIL
                    </p>
                    <a
                        href='/models/haval-h6'
                        className='slide-btn'
                        data-swiper-parallax='-400'>
                        Batafsil
                    </a>
                </div>
            </SwiperSlide>
            {/* Slide 5 */}
            <SwiperSlide className='swiper-slide1'>
                <img
                    src={gwmWingle7}
                    alt='haval-dargo'
                    data-swiper-parallax='1'
                />
                <div className='swiper-slide-content second-swiper-slide'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        GWM WINGLE 7
                    </h2>
                    <p
                        className='slide-description'
                        data-swiper-parallax='-500'>
                        KO‘PROQ JOY - KO‘PROQ IMKONIYATLAR
                    </p>
                    <a
                        href='/models/gwm-wingle-7'
                        className='slide-btn'
                        data-swiper-parallax='-400'>
                        Batafsil
                    </a>
                </div>
            </SwiperSlide>
            {/* Slide 6 */}
            <SwiperSlide className='swiper-slide1 swiper-video'>
                <video src={havalSwiperVideo} muted autoPlay loop></video>
                <div className='swiper-slide-content third-swiper-slide'>
                    <h2 className='slide-title' data-swiper-parallax='-500'>
                        HAR KUNI MUHIM
                    </h2>
                    <p
                        className='slide-description third-swiper-slide-description'
                        data-swiper-parallax='-500'>
                        ASOSIDA ODAMLAR. ULARNING EMOYTSIYALARI, HISSIYOTLARI VA
                        HAYOT LAZZLARI BO"LGAN HAVAL BRENDINING FALSAFASI
                    </p>
                </div>
            </SwiperSlide>
            {/* <div className='swiper-pagination'></div> */}
        </Swiper>
    );
};

export default SwiperComponent;
