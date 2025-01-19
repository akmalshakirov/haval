import { Card, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminNews.css";

function AdminNews() {
    const [adminNewsList, setAdminNewsList] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchNews = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, iltimos qayta tizimga kiring!");
                return;
            }

            const response = await axios.get(
                "https://haval-uz.onrender.com/news",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAdminNewsList(response.data);
        } catch (error) {
            message.error(
                `Yangiliklarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}` ||
                    error.message
            );
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className='admin-news'>
            {loader ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        marginTop: "50px",
                    }}>
                    <h1>Yuklanmoqda</h1>
                    <Spin size='large' />
                </div>
            ) : (
                <div className='admin-news-cards'>
                    {adminNewsList.map((item, index) => (
                        <div key={index}>
                            <Card
                                cover={<img src={item.image} />}
                                style={{ maxWidth: 240 }}>
                                <p>{item.title}</p>
                                <div>
                                    <a href={item.link}>Batafsil {item.link}</a>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminNews;
