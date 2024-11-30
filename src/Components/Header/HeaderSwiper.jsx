import React, { useEffect } from "react";
import { Swiper } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "./HeaderSwiper.css";
import havalDargo from "../../Images/haval-dargo.jpg";
import havalJolion from "../../Images/haval-jolion.jpg";

const SwiperComponent = () => {
    useEffect(() => {
        const swiper = new Swiper(".swiper-container", {
            speed: 2222,
            autoplay: {
                delay: 2222,
            },
            loop: true,
            parallax: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
            },
        });

        return () => {
            swiper.destroy(true, true);
        };
    }, []);

    return (
        <div className='swiper-container'>
            <div className='swiper-wrapper'>
                {/* Slide 1 */}
                <div className='swiper-slide'>
                    <img
                        src={havalDargo}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGI HAVAL DARGO
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                        </p>
                        <a href='/models/haval-dargo' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                    <div className='slide-service'>
                        <img src='' alt='' />
                    </div>
                </div>
                {/* Slide 2 */}
                <div className='swiper-slide'>
                    <img
                        src={havalJolion}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGILANGAN HAVAL JOLION
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            SO'NGI URFDAGI SHAHAR KROSSOVERI
                        </p>
                        <a href='/models/haval-jolion' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                </div>
                {/* Slide 3 */}
                <div className='swiper-slide'>
                    <img
                        src={havalDargo}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGI HAVAL DARGO
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                        </p>
                        <a href='/models/haval-dargo' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                </div>
                {/* Slide 4 */}
                <div className='swiper-slide'>
                    <img
                        src={havalDargo}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGI HAVAL DARGO
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                        </p>
                        <a href='/models/haval-dargo' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                </div>
                {/* Slide 5 */}
                <div className='swiper-slide'>
                    <img
                        src={havalDargo}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGI HAVAL DARGO
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                        </p>
                        <a href='/models/haval-dargo' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                </div>
                {/* Slide 6 */}
                <div className='swiper-slide'>
                    <img
                        src={havalDargo}
                        alt='haval-dargo'
                        data-swiper-parallax='500'
                    />
                    <div className='swiper-slide-content'>
                        <h2 className='slide-title' data-swiper-parallax='-500'>
                            YANGI HAVAL DARGO
                        </h2>
                        <p
                            className='slide-description'
                            data-swiper-parallax='-300'>
                            TRASSADA MUKAMMAL, YO'LSIZLIKDA ISHONCHLI.
                        </p>
                        <a href='/models/haval-dargo' className='slide-btn'>
                            Batafsil
                        </a>
                    </div>
                </div>
                {/* Slide 7 */}
            </div>
        </div>
    );
};

export default SwiperComponent;
