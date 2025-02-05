import { Card, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminNews.css";

function AdminNews() {
    const [adminNewsList, setAdminNewsList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

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
            
            // Ensure we're working with an array
            const newsData = Array.isArray(response.data) ? response.data : 
                           (response.data.news || response.data.data || []);
            
            setAdminNewsList(newsData);
            
            if (newsData.length === 0) {
                message.info("Yangiliklar topilmadi");
            }
        } catch (error) {
            const response = error.response;
            if (response?.status === 401) {
                message.info("Token vaqti tugagan!");
            } else {
                message.error(
                    `Yangiliklarni yuklashda xatolik yuz berdi: ${error.response?.data?.message || error.message}`
                );
            }
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDetailModal = (item) => {
        setSelectedNews(item);
        setDetailModal(true);
    };

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
                    {Array.isArray(adminNewsList) &&
                        adminNewsList.map((item, index) => (
                            <div key={item._id || index}>
                                <Card
                                    cover={
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                            maxHeight: 200,
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                                style={{ maxWidth: 240 }}>
                                <p>{item.title}</p>
                                <a
                                    onClick={() => handleDetailModal(item)}
                                    style={{
                                        display: "block",
                                        width: "30%",
                                        cursor: "pointer",
                                        padding: "5px",
                                        marginTop: "10px",
                                        borderRadius: "5px",
                                        border: "1px solid #ddd",
                                    }}>
                                    Batafsil
                                </a>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                open={detailModal}
                onCancel={() => {
                    setDetailModal(false);
                    setSelectedNews(null);
                }}
                footer={null}>
                {selectedNews && (
                    <Card
                        cover={
                            <img
                                src={selectedNews.image}
                                alt={selectedNews.title}
                                style={{ objectFit: "cover" }}
                            />
                        }
                        bordered={false}>
                        <h3>{selectedNews.title}</h3>
                        <p>{selectedNews.description}</p>
                    </Card>
                )}
            </Modal>
        </div>
    );
}

export default AdminNews;
