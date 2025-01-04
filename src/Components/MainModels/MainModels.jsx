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
// import { render } from "react-dom";

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
                                <h3>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-link'>
                                        GWM WINGLE 7
                                    </a>
                                </h3>
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
                    <div className='custom-card second-card'>
                        <div className='card-image'>
                            <a href='models/gwm-wingle-7'>
                                <img src={HavalDargo} alt='haval h6' />
                            </a>
                        </div>
                        <div className='card-content'>
                            <div className='card-content-top'>
                                2024 | Benzin
                            </div>
                            <div className='card-content-center'>
                                <h3>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-link'>
                                        GWM WINGLE 7
                                    </a>
                                </h3>
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
                    <div className='custom-card third-card'>
                        <div className='card-image'>
                            <a href='models/gwm-wingle-7'>
                                <img src={HavalJolion} alt='haval h6' />
                            </a>
                        </div>
                        <div className='card-content'>
                            <div className='card-content-top'>
                                2024 | Benzin
                            </div>
                            <div className='card-content-center'>
                                <h3>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-link'>
                                        GWM WINGLE 7
                                    </a>
                                </h3>
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
                    <div className='custom-card third-card'>
                        <div className='card-image'>
                            <a href='models/gwm-wingle-7'>
                                <img src={HavalM6} alt='haval h6' />
                            </a>
                        </div>
                        <div className='card-content'>
                            <div className='card-content-top'>
                                2024 | Benzin
                            </div>
                            <div className='card-content-center'>
                                <h3>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-link'>
                                        GWM WINGLE 7
                                    </a>
                                </h3>
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
            </Swiper>
            <div className='custom-pagination'></div>
        </div>
    );
}

export default MainModels;
