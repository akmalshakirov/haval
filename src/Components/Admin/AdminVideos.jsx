import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card, Modal, Input, Button } from "antd";
const { Meta } = Card;
import "./AdminVideos.css";

import AdminVideoImg1 from "../../Images/admin-video-img1.jpg";
import AdminVideoImg2 from "../../Images/admin-video-img2.jpg";
import AdminVideoImg3 from "../../Images/admin-video-img3.jpg";

const initialCardsData = [
    {
        id: 1,
        title: "Dilerlik markazi Haval Olmazor",
        image: AdminVideoImg1,
        videoUrl:
            "https://www.youtube.com/embed/9-INM_a28M8?si=AejkD23crJrqrAZ2",
    },
    {
        id: 2,
        title: "Haval Olmazor - Olmazor - Haval",
        image: AdminVideoImg2,
        videoUrl:
            "https://www.youtube.com/embed/vp-I_oZPRCY?si=DUke0gv8GQRAESMh",
    },
    {
        id: 3,
        title: "Yangi WINGLE 7 modeli",
        image: AdminVideoImg3,
        videoUrl:
            "https://www.youtube.com/embed/cgEdBOQIHqs?si=y_uOoonioPsFq8zv",
    },
];

const AdminVideos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCardId, setActiveCardId] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newVideoUrl, setNewVideoUrl] = useState("");
    const [cards, setCards] = useState(initialCardsData);

    const showModal = (id) => {
        setActiveCardId(id);
        const currentCard = cards.find((card) => card.id === id);
        setNewTitle(currentCard.title);
        setNewVideoUrl(currentCard.videoUrl);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setCards(
            cards.map((card) =>
                card.id === activeCardId
                    ? { ...card, title: newTitle, videoUrl: newVideoUrl }
                    : card
            )
        );
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewVideoUrl("");
    };

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        if (url.includes("youtube.com/embed/") || url.includes("youtu.be/")) {
            setNewVideoUrl(url);
        } else {
            const youtubeRegex =
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

            const match = url.match(youtubeRegex);

            if (match && match[1]) {
                const videoId = match[1];
                setNewVideoUrl(`https://www.youtube.com/embed/${videoId}`);
            } else {
                setNewVideoUrl(url);
            }
        }
    };

    return (
        <div className='cards'>
            {cards.map((card) => (
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
            ))}

            <Modal
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
            </Modal>
        </div>
    );
};

export default AdminVideos;
