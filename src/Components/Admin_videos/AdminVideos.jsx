import { Card, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminVideos.css";

const AdminVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loader, setLoader] = useState(true);

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

    return (
        <div className='admin-videos'>
            <h1>Videolar</h1>
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
