import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainVideos.css";

const VideosArr = [
    {
        id: 1,
        title: "GM-ПУЛИГА ИНОМАРКА 3900$ БЛАН МИНАСИЗ💥МАТИЗ ПУЛИГА,😱ХАЛК КУТГАН КУН КЕЛДИ.GM БОЗОРИ СИНДИ❌",
        url: "https://www.youtube.com/watch?v=9-INM_a28M8",
        imgUrl: "https://i.ytimg.com/vi_webp/9-INM_a28M8/maxresdefault.webp",
    },
    {
        id: 2,
        title: "HAVAL ADM-ASTER Samarqand..6200$ ga krosover",
        url: "https://www.youtube.com/watch?v=vp-I_oZPRCY",
        imgUrl: "https://i.ytimg.com/vi/vp-I_oZPRCY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCUcTgoekm8C7S_OzBvo6owdqdzzA",
    },
    {
        id: 3,
        title: "ENDI YO’L TALLAMAS MASHINA MINAMIZ JENTRANI PULIGA 😱 DAXSHAT MASHINA KELDI OZIZ KORING HAVAL VINGEL7",
        url: "https://www.youtube.com/watch?v=cgEdBOQIHqs",
        imgUrl: "https://i.ytimg.com/vi_webp/cgEdBOQIHqs/sddefault.webp",
    },
];

function MainVideos() {
    // const [mainVideos, setMainVideos] = useState([]);
    // const [selectedVideo, setSelectedVideo] = useState(null);

    // const fetchMainVideos = async () => {
    //     try {
    //         const response = await axios.get(
    //             "https://haval-uz.onrender.com/videos"
    //         );
    //         setMainVideos(response.data);
    //     } catch (error) {
    //         toast.error(
    //             `Videolarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}`
    //         );
    //     }
    // };

    // useEffect(() => {
    //     fetchMainVideos();
    // }, []);

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
                    {VideosArr.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className='main-videos-cards'>
                                <div className='main-videos-card'>
                                    <a href={item.url} target='_blank'>
                                        {item.title}
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MainVideos;
