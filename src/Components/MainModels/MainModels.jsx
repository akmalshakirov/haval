import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import HavalH6 from "../../Images/haval-h6.jpg";
import HavalJolion from "../../Images/haval-jolion.jpg";
import HavalDargo from "../../Images/haval-dargo.jpg";
import HavalM6 from "../../Images/haval-m6.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./MainModels.css";

import { Pagination, Navigation } from "swiper/modules";
import { render } from "react-dom";

function MainModels() {
    const pagination = {
        el: ".custom-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return (
                '<span class="pagination-buttons ' +
                className +
                '">' +
                (index + 1) +
                "</span>"
            );
        },
    };
    const navigation = {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
        renderBullet: function (index, className) {
            return (
                '<span class="pagination-buttons ' +
                className +
                '">' +
                (index + 1) +
                "</span>"
            );
        },
    };
    return (
        <div className='models-container'>
            <div className='models-header'>
                <h1>HAVAL modellar qatori</h1>
                <p>
                    Tanlov sizda! O'zbekiston sharoitlariga moslashtirilgan
                    texnologik jihatdan ilg'or HAVAL krossoverlari va yo'l
                    tanalamas avtomobillariga baho bering.
                </p>
            </div>
            <Swiper
                pagination={pagination}
                modules={[Pagination, Navigation]}
                navigation={true}
                slidesPerView={2}
                spaceBetween={30}
                className='mySwiper models-swiper'>
                <SwiperSlide>
                    <div className='custom-card first-card'>
                        <div className='card-image'>
                            <a href='models/gwm-wingle-7'>
                                <img src={HavalH6} alt='haval h6' />
                            </a>
                        </div>
                        <div className='card-content'>
                            <div className='card-content-top'>
                                2024 | Benzin
                            </div>
                            <div className='card-content-center'>
                                <a
                                    href='/models/gwm-wingle-7'
                                    className='card-content-link'>
                                    GWM WINGLE 7
                                </a>
                                <p className='card-content-description'>
                                    KO‘PROQ JOY - KO‘PROQ IMKONIYATLAR
                                </p>
                                <ul>
                                    <li>9.1 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p>NARXI: </p>
                                    <p>359 900 000 so'm</p>
                                    <button>Batafsilroq</button>
                                    <span>Konfigurator</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='custom-card'>
                        <div className='card-image'>
                            <img src={HavalJolion} alt='haval jolion' />
                        </div>
                        <div className='card-content'>
                            <h3>HAVAL JOLION</h3>
                            <p>Shahar uchun ideal krossover</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='custom-card'>
                        <div className='card-image'>
                            <img src={HavalDargo} alt='haval dargo' />
                        </div>
                        <div className='card-content'>
                            <h3>HAVAL DARGO</h3>
                            <p>Zamonaviy va ishonchli SUV</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='custom-card'>
                        <div className='card-image'>
                            <img src={HavalM6} alt='haval' />
                        </div>
                        <div className='card-content'>
                            <h3>HAVAL M6</h3>
                            <p>Premium darajadagi krossover</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className='custom-pagination'></div>
            <div className='models-swiper-pagination pagination-buttons'>
                <div className='swiper-button-prev'></div>
                <div className='swiper-button-next'></div>
            </div>
        </div>
    );
}

export default MainModels;
