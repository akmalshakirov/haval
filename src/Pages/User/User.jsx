import React, { useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Table,
    Button,
    Form,
    Input,
    Modal,
    Avatar,
    Dropdown,
    message,
} from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import GWM_wingle_7 from "../../Images/gwm-wingle-7.jpg";
import UserImage from "../../Images/userimage.png";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const UserPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Haval | Shaxsiy kabinet";
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
            message.info("Oldin login qiling!");
        }
    });
    const [contracts, setContracts] = useState([
        {
            id: 1,
            image: GWM_wingle_7,
            title: "Avtomobil shartnomasi 1",
            startDate: "2023-03-01",
            endDate: "2023-03-08",
        },
        {
            id: 2,
            image: GWM_wingle_7,
            title: "Avtomobil shartnomasi 2",
            startDate: "2023-03-05",
            endDate: "2023-03-12",
        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleAddContract = (values) => {
        const newContract = {
            id: contracts.length + 1,
            image: null,
            title: values.title,
            startDate: "2023-03-10",
            endDate: "2023-03-17",
        };
        setContracts([...contracts, newContract]);
        form.resetFields();
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "Rasm",
            dataIndex: "image",
            key: "image",
            render: (image) => <Avatar shape='square' size={50} src={image} />,
            width: 70,
        },
        {
            title: "Shartnoma nomi",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Olingan sana",
            dataIndex: "startDate",
            key: "startDate",
        },
        {
            title: "Amal qilish muddati",
            dataIndex: "endDate",
            key: "endDate",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    const menuItems = [
        {
            key: "1",
            icon: <FileTextOutlined />,
            label: "Shartnomalarim",
        },
    ];

    const profileMenuItems = [
        {
            key: "edit",
            label: "Profilni tahrirlash",
        },
        {
            key: "logout",
            label: "Tizimdan chiqish",
        },
    ];

    const handleProfileMenuClick = (info) => {
        if (info.key === "edit") {
            setIsEditModalOpen(!isEditModalOpen);
        } else if (info.key === "logout") {
            alert("Tizimdan chiqish funktsiyasi chaqirildi!");
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={["1"]}
                    mode='inline'
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <div></div>
                    <Dropdown
                        menu={{
                            items: profileMenuItems,
                            onClick: handleProfileMenuClick,
                        }}
                        trigger={["click"]}>
                        <Avatar
                            style={{
                                cursor: "pointer",
                                border: "1px solid #212121",
                                backgroundColor: "transparent",
                            }}
                            src={UserImage}
                        />
                    </Dropdown>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <Button
                        type='primary'
                        onClick={() => setIsModalVisible(!isModalVisible)}
                        style={{ marginBottom: 16 }}>
                        Shartnoma qo'shish
                    </Button>
                    <Table
                        dataSource={contracts.map((contract) => ({
                            ...contract,
                            key: contract.id,
                        }))}
                        columns={columns}
                    />
                </Content>
            </Layout>
            {/* MODALS */}
            <Modal
                title='Profilni tahrirlash'
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(!isEditModalOpen)}
                onOk={() => (
                    setIsEditModalOpen(!isEditModalOpen),
                    message.success("Profil muvvafaqiyatli tahrirlandi")
                )}></Modal>
            <Modal
                title="Yangi shartnoma qo'shish"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleAddContract}>
                    <Form.Item
                        name='title'
                        label='Shartnoma nomi'
                        rules={[
                            {
                                required: true,
                                message: "Iltimos, shartnoma nomini kiriting!",
                            },
                        ]}>
                        <Input placeholder='Shartnoma nomi' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Qo'shish
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default UserPage;
