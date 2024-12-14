import React, { useState, useRef } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Modal, Input, Button } from "antd";
const { Meta } = Card;
import "./AdminVideos.css";

import AdminVideoImg1 from "../../Images/admin-video-img1.jpg";
import AdminVideoImg2 from "../../Images/admin-video-img2.jpg";

const AdminVideos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoTitle, setVideoTitle] = useState(
        "Dilerlik markazi Haval Olmazor"
    );
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState([]);
    const [tempVideoUrl, setTempVideoUrl] = useState(videoUrl);
    const videoRef = useRef(null);

    const fetchVideos = () => {
        setVideoUrl([
            {
                key: 1,
                title: "Dilerlik markazi Haval Olmazor",
                image: AdminVideoImg1,
                url: "https://www.youtube.com/embed/9-INM_a28M8?si=AejkD23crJrqrAZ2",
            },
            {
                key: 2,
                title: "Haval Olmazor - Olmazor",
                image: AdminVideoImg2,
                url: "https://www.youtube.com/embed/vp-I_oZPRCY?si=DUke0gv8GQRAESMh",
            },
        ]);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setVideoTitle(e.target.value);
    };

    const playVideo = () => {
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        if (videoRef.current) {
            const iframe = videoRef.current;
            const iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }
        setIsVideoOpen(false);
    };

    const handleUrlChange = (e) => {
        setTempVideoUrl(e.target.value);
    };

    const saveVideoUrl = () => {
        setVideoUrl(tempVideoUrl);
    };

    return (
        <div className='cards'>
            <div className='card'>
                <Card
                    className='card-or'
                    style={{
                        width: 300,
                    }}
                    cover={
                        <img
                            alt='example'
                            src={AdminVideoImg1}
                            onClick={playVideo}
                            className='card-img'
                            style={{ cursor: "pointer" }}
                        />
                    }
                    actions={[
                        <SettingOutlined key='setting' />,
                        <EditOutlined key='edit' onClick={showModal} />,
                    ]}>
                    <Meta title={videoTitle} />
                </Card>
                <Modal
                    title='Edit Video Title'
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Input
                        value={videoTitle}
                        onChange={handleInputChange}
                        placeholder='Enter new title'
                    />
                </Modal>
                <Modal
                    title='Video Player'
                    open={isVideoOpen}
                    footer={null}
                    onCancel={closeVideo}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            marginBottom: "1rem",
                        }}>
                        <Input
                            value={tempVideoUrl}
                            onChange={handleUrlChange}
                            placeholder='Enter video URL'
                            style={{ flex: 1 }}
                        />
                        <Button type='primary' onClick={saveVideoUrl}>
                            Save
                        </Button>
                    </div>
                    <iframe
                        width='100%'
                        height='315'
                        src={videoUrl}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                        ref={videoRef}></iframe>
                </Modal>
            </div>
            <div className='card'>
                <Card
                    style={{
                        width: 300,
                    }}
                    cover={
                        <img
                            alt='example'
                            src={AdminVideoImg2}
                            onClick={playVideo}
                            className='card-img'
                            style={{ cursor: "pointer" }}
                        />
                    }
                    actions={[
                        <SettingOutlined key='setting' />,
                        <EditOutlined key='edit' onClick={showModal} />,
                    ]}>
                    <Meta title={setVideoUrl} />
                </Card>
                <Modal
                    title='Edit Video Title'
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <Input
                        value={videoTitle}
                        onChange={handleInputChange}
                        placeholder='Enter new title'
                    />
                </Modal>
                <Modal
                    title='Video Player'
                    open={isVideoOpen}
                    footer={null}
                    onCancel={closeVideo}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            marginBottom: "1rem",
                        }}>
                        <Input
                            value={tempVideoUrl}
                            onChange={handleUrlChange}
                            placeholder='Enter video URL'
                            style={{ flex: 1 }}
                        />
                        <Button type='primary' onClick={saveVideoUrl}>
                            Save
                        </Button>
                    </div>
                    <iframe
                        width='100%'
                        height='315'
                        src={videoUrl}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                        ref={videoRef}></iframe>
                </Modal>
            </div>
        </div>
    );
};

export default AdminVideos;
