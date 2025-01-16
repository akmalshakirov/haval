import { Card, message } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminNews.css";

function AdminNews() {
    const [adminNewsList, setAdminNewsList] = useState([]);

    const fetchNews = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, iltimos qayta tizimga kiring!");
                return;
            }

            const response = await axios.get("http://localhost:3000/news", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAdminNewsList(response.data);
        } catch (error) {
            message.error(
                error.response?.data?.message ||
                    error.message ||
                    "Xatolik yuz berdi!"
            );
        }
    };

    const shortText = (text) => {
        if (text.length > 15) {
            return text.slice(0, 18) + "...";
        }
        return text;
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className='admin-news'>
            <div className='admin-news-cards'>
                {adminNewsList.map((item, index) => (
                    <div key={index}>
                        <Card
                            cover={<img src={item.image} />}
                            style={{ maxWidth: 240 }}>
                            <p>{item.title}</p>
                            <footer>
                                <a href={item.link}>Batafsil {item.link}</a>
                            </footer>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminNews;
