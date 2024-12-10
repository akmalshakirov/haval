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
    VideoCameraAddOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
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

    const [data, setData] = useState();

    // useEffect(() => {
    //     axios
    //         .get(
    //             `https://66def146de4426916ee30952.mockapi.io/haval/headerLinks`
    //         )
    //         .then((response) => {
    //             setData(response.data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, []);
    // console.log(data);

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
                year: 2022,
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
                year: 2023,
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
        message.success("Admin added successfully!");
        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        const storedCars = localStorage.getItem("cars");
        if (storedCars) {
            setCars(JSON.parse(storedCars));
        }
    }, []);

    const handleAddCar = (values) => {
        if (fileList.length === 0) {
            message.error("Please upload a car image!");
            return;
        }

        const file = fileList[0];
        if (!file.originFileObj) {
            message.error("Invalid file format or missing file object!");
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
        message.success("Car added successfully!");

        setFileList([]);
        setIsModalOpen(false);
        form.resetFields();

        URL.revokeObjectURL(file.originFileObj);
    };
    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // const handleDelete = (key) => {const newData = };

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
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => (
                <div className='action'>
                    <a onClick={() => setActionModal(true)}>
                        {<EditOutlined />}
                        <Modal
                            title={"Edit"}
                            open={actionModal}
                            // onCancel={() => setActionModal(false)}
                            onCancel={() =>
                                console.log("clodeModal:", actionModal)
                            }
                            footer={null}>
                            <h1>adijugio</h1>
                        </Modal>
                        {/* {actionModal && (
                            <Modal
                                title='Edit Car'
                                open={actionModal}
                                onOk={() => setActionModal(false)}
                                onCancel={() => setActionModal(false)}
                                onClose={() => setActionModal(false)}
                                footer={null}
                                width={600}
                                centered
                                // maskClosable={false}
                                // closable={false}
                            >
                                aaiuweghaiuwghiu
                            </Modal>
                        )} */}
                    </a>
                    <a onClick={() => console.log("delete: ")}>
                        {<DeleteOutlined />}
                    </a>
                </div>
            ),
        },
    ];

    const columnsAdmins = [
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
    ];

    return (
        <Layout style={{ minHeight: "100vh" }} className='admin'>
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
                        // {
                        //     key: "3",
                        //     icon: <SettingOutlined />,
                        //     label: "Settings",
                        // },
                        {
                            // key: "4",
                            key: "3",
                            icon: <VideoCameraAddOutlined />,
                            label: "News",
                        },
                        {
                            key: "4",
                            // key: "5",
                            icon: <SettingOutlined />,
                            label: "Video",
                        },
                        {
                            key: "5",
                            // key: "5",
                            icon: <SettingOutlined />,
                            label: "Savdo statistikasi",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ background: "#fff", padding: 0 }} />
                <Content style={{ margin: "16px" }}>
                    {" "}
                    {/* Admins======================== */}
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
                                    dataSource={admins}></Table>
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
                        )}{" "}
                        {/* CARS============================= */}
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
                                                listType='picture-card'
                                                fileList={fileList}
                                                onChange={handleFileChange}
                                                beforeUpload={() => false}>
                                                {fileList.length >= 1
                                                    ? null
                                                    : "Upload "}
                                                <UploadOutlined />
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
                        {selectedKey === "4" && <h1>News</h1>}
                        {selectedKey === "4" && <h1>Video add / video edit</h1>}
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
