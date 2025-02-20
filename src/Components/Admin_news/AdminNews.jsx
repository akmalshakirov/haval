import { Button, Card, Form, Image, Input, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import "./AdminNews.css";
import axios from "axios";

function AdminNews() {
    const [adminNewsList, setAdminNewsList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [addNewsModal, setAddNewsModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();

    const fetchNews = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, iltimos qayta tizimga kiring!");
                return;
            }

            const response = await axios.get(
                // "https://haval-uz.onrender.com/news",
                "http://localhost:3000/news",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newsData = Array.isArray(response.data)
                ? response.data
                : response.data.news || response.data.data || [];
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
                    `Yangiliklarni yuklashda xatolik yuz berdi: ${
                        error.response?.data?.message || error.message
                    }`
                );
            }
        } finally {
            setLoader(false);
        }
    };

    const handleAddNews = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi");
                return;
            }

            const values = await form.validateFields();
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            if (fileList.length > 0) {
                formData.append("image", fileList[0]);
            }

            const response = await axios.post(
                "http://localhost:3000/add-news",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setAddNewsModal(false);
                message.success("Yangilik muvaffaqiyatli qo'shildi!");
                setAdminNewsList([
                    ...adminNewsList,
                    { key: `${adminNewsList.length + 1}`, ...values },
                ]);
                form.resetFields();
                setDetailModal(false);
                setSelectedNews(null);
                setFileList([]);
                await fetchNews();
            }
            if (response.status === 500) {
                message.error("Bazaga ulanishda xatolik yuz berdi!");
            }
        } catch (error) {
            const response = error.response;
            if (response?.status === 401) {
                message.info("Token vaqti tugagan!");
            } else {
                message.error(
                    `Xatolik yuz berdi: ${
                        response?.data?.message || error.message
                    }`
                );
            }
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
            <Button
                type='primary'
                id='admin-news-button-primary'
                onClick={() => setAddNewsModal(!addNewsModal)}>
                Yanglik qoshish
            </Button>

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
                onCancel={() => setDetailModal(false)}
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

            {/* ADD NEWS MODAL ------ */}
            <Modal
                title="Yanglik qo'shish"
                open={addNewsModal}
                onCancel={() => setAddNewsModal(false)}
                onOk={handleAddNews}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        label='Yanglikning sarlavhasi'
                        name='title'
                        rules={[
                            {
                                required: true,
                                message: "Iltimos, sarlavhani kiriting!",
                            },
                        ]}>
                        <Input placeholder='Masalan: Haval brendi mashhurlashmoqda' />
                    </Form.Item>

                    <Form.Item
                        label='Yanglikning matni'
                        name='description'
                        rules={[
                            {
                                required: true,
                                message: "Iltimos, matnni kiriting!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label='Yanglikning rasmi:'>
                        <div>
                            <input
                                type='file'
                                accept='image/*'
                                id='add-car'
                                className='add-car-input edit-car-input'
                                onChange={(e) => setFileList(e.target.files)}
                            />
                            <label
                                htmlFor='add-car'
                                title='Rasm tanlash'
                                id='edit-car-label'
                                className='add-car-label edit-car-label'>
                                Rasm tanlash
                            </label>
                            {fileList.length > 0 && (
                                <Image
                                    src={URL.createObjectURL(fileList[0])}
                                    alt='Rasm'
                                    style={{
                                        maxHeight: "150px",
                                        maxWidth: "250px",
                                    }}
                                />
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminNews;
