import React, { useEffect, useState } from "react";
// import { EditOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
// const { Meta } = Card;
import "./AdminVideos.css";

// import AdminVideoImg1 from "../../Images/admin-video-img1.jpg";
// import AdminVideoImg2 from "../../Images/admin-video-img2.jpg";
// import AdminVideoImg3 from "../../Images/admin-video-img3.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// const initialCardsData = [
//     {
//         id: 1,
//         title: "Dilerlik markazi Haval Olmazor",
//         image: AdminVideoImg1,
//         videoUrl:
//             "https://www.youtube.com/embed/9-INM_a28M8?si=AejkD23crJrqrAZ2",
//     },
//     {
//         id: 2,
//         title: "Haval Olmazor - Olmazor - Haval",
//         image: AdminVideoImg2,
//         videoUrl:
//             "https://www.youtube.com/embed/vp-I_oZPRCY?si=DUke0gv8GQRAESMh",
//     },
//     {
//         id: 3,
//         title: "Yangi WINGLE 7 modeli",
//         image: AdminVideoImg3,
//         videoUrl:
//             "https://www.youtube.com/embed/cgEdBOQIHqs?si=y_uOoonioPsFq8zv",
//     },
// ];

const AdminVideos = () => {
    // const [isModalOpens, setIsModalOpen] = useState(false);
    // const [activeCardIsd, setActiveCardId] = useState(null);
    // const [newTitle, ssetNewTitle] = useState("");
    // const [newVideoUrls, setNewVideoUrl] = useState("");
    const [videos, setVideos] = useState([]);
    const [loader, setLoader] = useState(true);

    // const showModal = (id) => {
    //     setActiveCardId(id);
    //     const currentCard = cards.find((card) => card.id === id);
    //     setNewTitle(currentCard.title);
    //     setNewVideoUrl(currentCard.videoUrl);
    //     setIsModalOpen(true);
    // };

    const fetchVideos = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const response = await axios.get(
                "https://haval-uz.onrender.com/videos",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setVideos(response.data);
        } catch (error) {
            const response = error.response;
            if (response.status === 401) {
                toast.info("Token vaqti tugagan!");
            } else {
                toast.error(
                    `Videolarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}` ||
                        error.message
                );
            }
        } finally {
            setLoader(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            fetchVideos();
        }
    }, []);

    // const handleOk = () => {
    //     setCards(
    //         cards.map((card) =>
    //             card.id === activeCardId
    //                 ? { ...card, title: newTitle, videoUrl: newVideoUrl }
    //                 : card
    //         )
    //     );
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setNewVideoUrl("");
    // };

    // const handleTitleChange = (e) => {
    //     setNewTitle(e.target.value);
    // };

    // const handleUrlChange = (e) => {
    //     const url = e.target.value;
    //     if (url.includes("youtube.com/embed/") || url.includes("youtu.be/")) {
    //         setNewVideoUrl(url);
    //     } else {
    //         const youtubeRegex =
    //             /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

    //         const match = url.match(youtubeRegex);

    //         if (match && match[1]) {
    //             const videoId = match[1];
    //             setNewVideoUrl(`https://www.youtube.com/embed/${videoId}`);
    //         } else {
    //             setNewVideoUrl(url);
    //         }
    //     }
    // };

    return (
        <div className='admin-videos'>
            <ToastContainer />
            <h1>Videolar</h1>
            {/* {cards.map((card) => (
                <div className='card' key={card.id}>
                    <Card
                        className='card-or'
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt='example'
                                src={card.image}
                                className='card-img'
                                style={{ cursor: "pointer" }}
                            />
                        }
                        actions={[
                            <EditOutlined
                                key='edit'
                                onClick={() => showModal(card.id)}
                            />,
                        ]}>
                        <Meta title={card.title} />
                    </Card>
                </div>
            ))} */}
            {/* <Modal
                title='Video tahrirlash'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={800}
                footer={<Button onClick={handleOk}>Saqlash</Button>}
                style={{ margin: "-50px auto" }}
                destroyOnClose={true}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}>
                    <Input
                        value={newTitle}
                        onChange={handleTitleChange}
                        placeholder='Video nomini kiriting'
                    />
                    <Input
                        value={newVideoUrl}
                        onChange={handleUrlChange}
                        placeholder='Video URL'
                    />
                    <div
                        style={{
                            width: "100%",
                            margin: " auto",
                            aspectRatio: "9/4",
                        }}>
                        <iframe
                            width='100%'
                            height='100%'
                            src={
                                newVideoUrl.startsWith("http")
                                    ? newVideoUrl
                                    : ""
                            }
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    </div>
                </div>
            </Modal> */}
            {loader ? (
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "50px",
                    }}>
                    <h1>Yuklanmoqda</h1>
                    <Spin size='large' />
                </div>
            ) : (
                <div className='admin-cards'>
                    {videos.map((item, index) => {
                        return (
                            <>
                                <Card
                                    key={index}
                                    style={{ maxWidth: 340 }}
                                    className='admin-cards-item'>
                                    <iframe
                                        title='Admin cards iframe'
                                        src={item.video}
                                        frameborder='0'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowfullscreen></iframe>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <div>
                                        <p>
                                            Yaratilgan vaqti:
                                            <b>{item.createdAt}</b>
                                        </p>
                                    </div>
                                    <Link to={item.video} target='_blank'>
                                        Batafsil
                                    </Link>
                                </Card>
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminVideos;
