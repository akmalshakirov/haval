import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import HavalJolion from "../../Images/haval-jolion-large.jpg";
import HavalDargo from "../../Images/haval-dargo-large.jpg";
import HavalM6 from "../../Images/haval-m6-large.jpg";
import HavalGwmWingle7 from "../../Images/gwm-wingle-7-large.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./MainModels.css";

import { Pagination } from "swiper/modules";

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
                modules={[Pagination]}
                slidesPerView={2}
                spaceBetween={30}
                speed={1111}
                touchRatio={1}
                className='mySwiper models-swiper'>
                {/* 1 */}
                <SwiperSlide>
                    <div className='custom-card first-card'>
                        <div className='card-image'>
                            <a href='models/gwm-wingle-7'>
                                <img
                                    src={HavalGwmWingle7}
                                    alt='haval h6'
                                />
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
                                <ul className='card-content-li'>
                                    <li>9.1 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p>Narxi: </p>
                                    <p>359 900 000 so'm</p>
                                    <button>
                                        <a
                                            href='/'
                                            className='card-content-bottom-link'>
                                            Batafsilroq
                                        </a>
                                    </button>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-bottom-configurator'>
                                        Konfigurator
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 2 */}
                <SwiperSlide >
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
                                        href='/models/haval-dargo'
                                        className='card-content-link'>
                                        HAVAL DARGO
                                    </a>
                                </h3>
                                <p className='card-content-description'>
                                    TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                                </p>
                                <ul className='card-content-li'>
                                    <li>7.5 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p>Narxi: </p>
                                    <p>399 900 000 so'mdan</p>
                                    <button>
                                        <a
                                            href='/'
                                            className='card-content-bottom-link'>
                                            Batafsilroq
                                        </a>
                                    </button>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-bottom-configurator'>
                                        Konfigurator
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 3 */}
                <SwiperSlide >
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
                                        HAVAL JOLION
                                    </a>
                                </h3>
                                <p className='card-content-description'>
                                    ZAMONAVIY SHAHAR KROSSOVERI
                                </p>
                                <ul className='card-content-li'>
                                    <li>6.1 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p>Narxi: </p>
                                    <p>269 900 000 so'm</p>
                                    <button>
                                        <a
                                            href='/'
                                            className='card-content-bottom-link'>
                                            Batafsilroq
                                        </a>
                                    </button>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-bottom-configurator'>
                                        Konfigurator
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 4 */}
                <SwiperSlide >
                    <div className='custom-card fourth-card'>
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
                                        HAVAL M6
                                    </a>
                                </h3>
                                <p className='card-content-description'>
                                    XARID UCHUN ENG QULAY MAVJUD KROSSOVERLARDAN
                                    BIRI
                                </p>
                                <ul className='card-content-li'>
                                    <li>6.9 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p>Narxi: </p>
                                    <p>242 900 000 so'm</p>
                                    <button>
                                        <a
                                            href='/'
                                            className='card-content-bottom-link'>
                                            Batafsilroq
                                        </a>
                                    </button>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-bottom-configurator'>
                                        Konfigurator
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* 5 */}
                <SwiperSlide >
                    <div className='custom-card fiveth-card'>
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
                                        HAVAL H6
                                    </a>
                                </h3>
                                <p className='card-content-description'>
                                    O'ZBEKISTON YO'LLARIDA ALLAQACHON
                                </p>
                                <ul className='card-content-li'>
                                    <li>6.6 L/100 km</li>
                                    <li>Shahardan tashqarida tsikli *</li>
                                </ul>
                                <div className='card-content-bottom'>
                                    <p className='card-content-bottom-price'>
                                        Narxi:
                                    </p>
                                    <p>342 900 000 so'm</p>
                                    <button>
                                        <a
                                            href='/'
                                            className='card-content-bottom-link'>
                                            Batafsilroq
                                        </a>
                                    </button>
                                    <a
                                        href='/models/gwm-wingle-7'
                                        className='card-content-bottom-configurator'>
                                        Konfigurator
                                    </a>
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
