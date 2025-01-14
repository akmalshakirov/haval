import { Card, Button, Modal, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import AdminNewsW7hdH6 from "../../Images/admin-news-w7-hd-h6.jpg";
import "./AdminNews.css";

function AdminNews() {
    const [adminNewsList, setAdminNewsList] = useState([
        {
            title: "20.12.2024",
            description:
                "HAVAL brendi - O'zbekiston avtomobil bozorida bir yil",
            link: "/",
        },
        {
            title: "26.11.2024",
            description:
                "Toshkentda HAVAL avtomobil brendi dilerlik konferensiyasi bo'lib o'tdi",
            link: "/",
        },
        {
            title: "22.12.2024",
            description: "O'zbekiston avtomobil bozorida yangi o'zgarishlar",
            link: "/",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [form] = Form.useForm();

    const showEditModal = (news, index) => {
        setCurrentEdit(index);
        form.setFieldsValue(news);
        setIsModalOpen(true);
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            const updatedNewsList = [...adminNewsList];
            updatedNewsList[currentEdit] = values;
            setAdminNewsList(updatedNewsList);
            setIsModalOpen(false);
            form.resetFields();
        });
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <div className='admin-news'>
            <div className='admin-news-cards'>
                {adminNewsList.map((news, index) => (
                    <Card
                        key={index}
                        className='admin-news-card'
                        hoverable
                        style={{ maxWidth: 240 }}
                        cover={
                            <img
                                src={AdminNewsW7hdH6}
                                alt={`news-${index}`}
                                className='admin-news-cover-img'
                            />
                        }>
                        <h4 className='admin-news-card-title'>{news.title}</h4>
                        <p className='admin-news-card-description'>
                            {news.description}
                        </p>
                        <a className='admin-news-card-link' href={news.link}>
                            Batafsil -{">"}
                        </a>
                        <Button onClick={() => showEditModal(news, index)}>
                            <EditOutlined />
                        </Button>
                    </Card>
                ))}
            </div>

            <Modal
                title='Tahrirlash'
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='title'
                        label='Sarlavha'
                        rules={[
                            {
                                required: true,
                                message: "Sarlavha kiritilishi shart!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label='Tavsif'
                        rules={[
                            {
                                required: true,
                                message: "Tavsif kiritilishi shart!",
                            },
                        ]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name='link'
                        label='Havola'
                        rules={[
                            {
                                required: true,
                                message: "Havola kiritilishi shart!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AdminNews;
