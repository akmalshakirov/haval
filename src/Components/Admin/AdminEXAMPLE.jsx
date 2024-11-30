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
} from "antd";
import {
    HomeOutlined,
    CarOutlined,
    SettingOutlined,
    UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

const AdminLayout = () => {
    const [selectedKey, setSelectedKey] = useState("1");
    const [cars, setCars] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(""); // Modalda ko'rsatiladigan rasm
    const [fileList, setFileList] = useState([]); // Rasmni saqlash uchun
    const [form] = Form.useForm();

    const fetchCars = () => {
        setCars([
            {
                key: "1",
                model: "Haval H6",
                year: 2023,
                price: "$25,000",
                image: "src/Images/haval-h6.jpg",
            },
            {
                key: "2",
                model: "Haval Jolion",
                year: 2022,
                price: "$22,000",
                image: "src/Images/haval-jolion.jpg",
            },
            {
                key: "3",
                model: "Haval Dargo",
                year: 2023,
                price: "$18,000",
                image: "src/Images/haval-dargo.jpg",
            },
            {
                key: "4",
                model: "Haval M6",
                year: 2023,
                price: "$23,500",
                image: "src/Images/haval-m6.jpg",
            },
            {
                key: "5",
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
        message.success("Admin added successfully!");
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleAddCar = (values) => {
        if (fileList.length === 0) {
            message.error("Please upload a car image!"); // Rasmsiz qabul qilinmasin
            return;
        }

        const newCar = {
            ...values,
            key: `${cars.length + 1}`,
            image:
                fileList[0].url ||
                URL.createObjectURL(fileList[0].originFileObj),
        };

        setCars([...cars, newCar]);
        message.success("Car added successfully!");
        setFileList([]); // Fayllar ro'yxatini tozalash
        setIsModalOpen(false); // Modalni yopish
        form.resetFields(); // Formani tozalash
    };

    const uploadProps = {
        beforeUpload: (file) => {
            setFileList([file]);
            return false; // Faylni serverga yuborilmasin
        },
        onRemove: () => setFileList([]),
        fileList,
    };

    const columnsCars = [
        {
            title: "Image",
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
        { title: "Year", dataIndex: "year", key: "year" },
        { title: "Price", dataIndex: "price", key: "price" },
    ];

    const columnsAdmins = [
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={["1"]}
                    onClick={(e) => setSelectedKey(e.key)}
                    items={[
                        { key: "1", icon: <HomeOutlined />, label: "Admin" },
                        {
                            key: "2",
                            icon: <CarOutlined />,
                            label: "Car models",
                        },
                        {
                            key: "3",
                            icon: <SettingOutlined />,
                            label: "Settings",
                        },
                    ]}
                />
            </Sider>
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
                                    Add Admin
                                </Button>
                                <Table
                                    columns={columnsAdmins}
                                    dataSource={admins}
                                />
                                <Modal
                                    title='Add New Admin'
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    footer={null}>
                                    <Form
                                        form={form}
                                        onFinish={handleAddAdmin}
                                        layout='vertical'>
                                        <Form.Item
                                            name='username'
                                            label='Username'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input admin username!",
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
                                                        "Please input admin email!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block>
                                            Submit
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
                                    Add Car
                                </Button>
                                <Table
                                    columns={columnsCars}
                                    dataSource={cars}
                                />
                                <Modal
                                    title='Add New Car'
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
                                                        "Please input car model!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='year'
                                            label='Year'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input year!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='price'
                                            label='Price'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input price!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label='Car Image'>
                                            <Upload
                                                {...uploadProps}
                                                listType='picture'>
                                                <Button
                                                    icon={<UploadOutlined />}>
                                                    Upload
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block>
                                            Submit
                                        </Button>
                                    </Form>
                                </Modal>
                                <Modal
                                    open={isImageModalOpen}
                                    footer={null}
                                    onCancel={() => setIsImageModalOpen(false)}>
                                    <Image
                                        src={hoveredImage}
                                        alt='Car Image'
                                        style={{ width: "100%" }}
                                    />
                                </Modal>
                            </>
                        )}
                        {selectedKey === "3" && <h1>Settings Page</h1>}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Haval Admin Panel ©2024
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
