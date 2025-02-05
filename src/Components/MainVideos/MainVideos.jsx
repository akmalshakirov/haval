import React, { useEffect, useState } from "react";
import "./MainVideos.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Card, message } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

function MainVideos() {
    const [mainVideos, setMainVideos] = useState([]);

    const fetchMainVideos = async () => {
        try {
            const response = await axios.get(
                "https://haval-uz.onrender.com/videos"
            );
            setMainVideos(response.data);
        } catch (error) {
            console.log(error);
            message.error(
                `Videolarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}`
            );
        }
    };

    useEffect(() => {
        fetchMainVideos();
    }, []);

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
            <div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}>
                    {mainVideos.map((item) => (
                        <SwiperSlide key={item._id}>
                            <Card
                                data-aos='fade-up'
                                hoverable
                                style={{ margin: "20px 0" }}
                                cover={
                                    <div
                                        style={{
                                            padding: "0 0 20px 0",
                                        }}>
                                        <iframe
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            src={item.video}
                                            frameBorder='0'
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                            allowFullScreen></iframe>
                                    </div>
                                }>
                                <Card.Meta title={`Video ${item.title}`} />
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MainVideos;
