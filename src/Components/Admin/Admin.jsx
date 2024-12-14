import React, { useState, useEffect } from "react";
import {
    Layout,
    Menu,
    Table,
    Button,
    Modal,
    Form,
    Input,
    message,
    Avatar,
    Image,
    Upload,
    Tooltip,
} from "antd";
import {
    HomeOutlined,
    CarOutlined,
    UploadOutlined,
    DeleteOutlined,
    EditOutlined,
    VideoCameraOutlined,
    StockOutlined,
    NotificationOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AdminVideos from "./AdminVideos";
// import axios from "axios";

const { Header, Sider, Content, Footer } = Layout;

const AdminPanel = () => {
    const [selectedKey, setSelectedKey] = useState("1");
    const [cars, setCars] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [actionModal, setActionModal] = useState(false);
    const [aActionModal, setAactionModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const navigate = useNavigate();

    const fetchCars = () => {
        setCars([
            {
                key: 1,
                model: "Haval H6",
                year: 2023,
                price: "$25,000",
                image: "src/Images/haval-h6.jpg",
            },
            {
                key: 2,
                model: "Haval Jolion",
                year: 2024,
                price: "$22,000",
                image: "src/Images/haval-jolion.jpg",
            },
            {
                key: 3,
                model: "Haval Dargo",
                year: 2023,
                price: "$18,000",
                image: "src/Images/haval-dargo.jpg",
            },
            {
                key: 4,
                model: "Haval M6",
                year: 2024,
                price: "$23,500",
                image: "src/Images/haval-m6.jpg",
            },
            {
                key: 5,
                model: "GWM WINGLE 7",
                year: 2023,
                price: "$24,430",
                image: "src/Images/gwm-wingle-7.jpg",
            },
        ]);
    };

    const fetchAdmins = () => {
        setAdmins([
            { key: "1", username: "admin1", email: "admin1@example.com" },
            { key: "2", username: "admin2", email: "admin2@example.com" },
        ]);
    };

    useEffect(() => {
        fetchCars();
        fetchAdmins();
    }, []);

    const handleAddAdmin = (values) => {
        setAdmins([...admins, { key: `${admins.length + 1}`, ...values }]);
        message.success("Admin muvaffaqiyatli qo'shildi!");
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleEditAdmin = (values) => {
        setAdmins(
            admins.map((admin) =>
                admin.key === editingAdmin.key ? { ...admin, ...values } : admin
            )
        );
        message.success("Admin muvaffaqiyatli tahrirlandi!");
        setAactionModal(false);
        setEditingAdmin(null);
    };

    const handleDeleteAdmin = (key) => {
        setAdmins(admins.filter((admin) => admin.key !== key));
        message.success("Admin muvaffaqiyatli o'chirildi!");
    };

    const handleAddCar = (values) => {
        if (fileList.length === 0) {
            message.error("Iltimos, avtomobil rasmni yuklang!");
            return;
        }

        const file = fileList[0];
        if (!file.originFileObj) {
            message.error(
                "Noto'g'ri fayl formati yoki fayl obyekti mavjud emas!"
            );
            console.log(fileList);
            return;
        }

        const newCar = {
            ...values,
            key: `${cars.length + 1}`,
            image: file.url || URL.createObjectURL(file.originFileObj),
        };

        const updatedCars = [...cars, newCar];
        localStorage.setItem("cars", JSON.stringify(updatedCars));

        setCars([...cars, newCar]);
        message.success("Avtomobil muvaffaqiyatli qo'shildi!");

        setFileList([]);
        setIsModalOpen(false);
        form.resetFields();

        URL.revokeObjectURL(file.originFileObj);
    };
    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const columnsCars = [
        {
            title: "Rasm",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Avatar
                    src={image}
                    size={64}
                    onClick={() => {
                        setHoveredImage(image);
                        setIsImageModalOpen(true);
                    }}
                    style={{ cursor: "pointer" }}
                />
            ),
        },
        { title: "Model", dataIndex: "model", key: "model" },
        { title: "Yili", dataIndex: "year", key: "year" },
        { title: "Narxi", dataIndex: "price", key: "price" },
        {
            title: "Harakat",
            dataIndex: "",
            key: "x",
            render: () => (
                <div className='action'>
                    <a onClick={() => setActionModal(true)}>
                        {<EditOutlined />}
                        <Modal
                            title={"Tahrirlash"}
                            open={actionModal}
                            onCancel={() => setActionModal(false)}
                            footer={null}>
                            <h1>Tahrirlash oynasi</h1>
                        </Modal>
                    </a>
                    <a onClick={(e) => console.log(`delete: ${e.type}`)}>
                        {<DeleteOutlined />}
                    </a>
                </div>
            ),
        },
    ];

    const columnsAdmins = [
        { title: "Foydalanuvchi nomi", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
                <div>
                    <a
                        onClick={() => {
                            setEditingAdmin(record);
                            setAactionModal(true);
                            form.setFieldsValue(record);
                        }}>
                        {<EditOutlined />}
                    </a>
                    <a
                        onClick={() => handleDeleteAdmin(record.key)}
                        style={{ marginLeft: 8 }}>
                        {<DeleteOutlined />}
                    </a>
                </div>
            ),
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("users");
        localStorage.removeItem("isAuthenticated");
        navigate("/register");
        window.location.reload();
    };

    return (
        <Layout style={{ minHeight: "100vh" }} className='admin'>
            <Sider collapsible>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={["1"]}
                    onClick={(e) => setSelectedKey(e.key)}
                    items={[
                        { key: "1", icon: <HomeOutlined />, label: "Adminlar" },
                        {
                            key: "2",
                            icon: <CarOutlined />,
                            label: "Avtomobil modellari",
                        },
                        {
                            key: "3",
                            icon: <NotificationOutlined />,
                            label: "Yangiliklar",
                        },
                        {
                            key: "4",
                            icon: <VideoCameraOutlined />,
                            label: "Videolar",
                        },
                        {
                            key: "5",
                            icon: <StockOutlined />,
                            label: "Savdo statistikasi",
                        },
                    ]}
                />
            </Sider>
            <div style={{ position: "absolute", top: 0, right: 0, margin: 16 }}>
                <Tooltip title='Logout'>
                    <Button
                        type='text'
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    />
                </Tooltip>
            </div>
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }} />
                <Content style={{ margin: "16px" }}>
                    <div
                        style={{
                            padding: 24,
                            background: "#fff",
                            minHeight: 360,
                        }}>
                        {selectedKey === "1" && (
                            <>
                                <Button
                                    type='primary'
                                    style={{ marginBottom: 16 }}
                                    onClick={() => setIsModalOpen(true)}>
                                    Admin qo'shish
                                </Button>
                                <Table
                                    columns={columnsAdmins}
                                    dataSource={admins}
                                />
                                <Modal
                                    title='Yangi Admin Qoshish'
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    footer={null}>
                                    <Form
                                        form={form}
                                        onFinish={handleAddAdmin}
                                        layout='vertical'>
                                        <Form.Item
                                            name='username'
                                            label='Foydalanuvchi nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, foydalanuvchi nomini kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='email'
                                            label='Email'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, emailni kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                                <Modal
                                    title='Adminni Tahrirlash'
                                    open={aActionModal}
                                    onCancel={() => setAactionModal(false)}
                                    footer={null}>
                                    <Form
                                        form={form}
                                        onFinish={handleEditAdmin}
                                        layout='vertical'>
                                        <Form.Item
                                            name='username'
                                            label='Foydalanuvchi nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, foydalanuvchi nomini kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='email'
                                            label='Email'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, emailni kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                            </>
                        )}
                        {selectedKey === "2" && (
                            <>
                                <Button
                                    type='primary'
                                    style={{ marginBottom: 16 }}
                                    onClick={() => setIsModalOpen(true)}>
                                    Avtomobil qo'shish
                                </Button>
                                <Table
                                    columns={columnsCars}
                                    dataSource={cars}
                                />
                                <Modal
                                    title='Yangi Avtomobil Qoshish'
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    footer={null}>
                                    <Form
                                        form={form}
                                        onFinish={handleAddCar}
                                        layout='vertical'>
                                        <Form.Item
                                            name='model'
                                            label='Model'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, avtomobil modelini kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='year'
                                            label='Yili'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, yilni kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='price'
                                            label='Narxi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, narxni kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label='Avtomobil rasmi'>
                                            <Upload
                                                listType='picture-card'
                                                fileList={fileList}
                                                onChange={handleFileChange}
                                                beforeUpload={() => false}>
                                                {fileList.length >= 1
                                                    ? null
                                                    : "Yuklash "}
                                                <UploadOutlined />
                                            </Upload>
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                                <Modal
                                    open={isImageModalOpen}
                                    footer={null}
                                    onCancel={() => setIsImageModalOpen(false)}>
                                    <Image
                                        src={hoveredImage}
                                        alt='Avtomobil rasmi'
                                        style={{ width: "100%" }}
                                    />
                                </Modal>
                            </>
                        )}
                        {selectedKey === "3" && <h1>Yangiliklar</h1>}
                        {selectedKey === "4" && (
                            <div>
                                <AdminVideos />
                            </div>
                        )}
                        {selectedKey === "5" && <h1>Savdo statistikasi</h1>}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Haval Admin Panel ©2024
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminPanel;
