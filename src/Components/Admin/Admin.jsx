import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    Layout,
    Menu,
    message,
    Modal,
    Popconfirm,
    Spin,
    Switch,
    Table,
    Tooltip,
} from "antd";
import {
    ArrowRightOutlined,
    CarOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined,
    IdcardOutlined,
    LogoutOutlined,
    NotificationOutlined,
    OrderedListOutlined,
    StockOutlined,
    UnorderedListOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import AdminVideos from "../Admin_videos/AdminVideos";
import axios from "axios";
import "./Admin.css";
import AdminNews from "../Admin_news/AdminNews";
import AdminUsers from "../Admin_users/AdminUsers";
import AdminAgreement from "../Admin_agreement/AdminAgreement";

const { Header, Sider, Content, Footer } = Layout;

const AdminPanel = () => {
    const [selectedKey, setSelectedKey] = useState("1");
    const [cars, setCars] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewModal, setPreviewModal] = useState({
        isOpen: false,
        image: "",
    });
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [actionModal, setActionModal] = useState(false);
    const [aActionModal, setAactionModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [isCardView, setIsCardView] = useState(true);
    const [editingCar, setEditingCar] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);
    const [loader, setLoader] = useState(true);
    const [onClickBtn, setOnClickBtn] = useState(false);
    const [changePass, setChangePass] = useState(false);
    const [changePassInputValue, setChangePassInputValue] = useState("");
    const [deleteAdminModal, setDeleteAdminModal] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(null);
    const navigate = useNavigate();

    const handleChangePassInput = (e) => {
        setChangePassInputValue(e.target.value);
    };
    const handleChangePassRight = () => {
        setChangePass(true);
    };

    const fetchCars = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const response = await axios.get(
                "https://haval-uz.onrender.com/cars",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCars([response.data.cars]);
            console.log(
                "Kelgan ma'lumotlar (avtomobillar):",
                response.data.cars
            );
        } catch (error) {
            const response = error.response;
            if (response?.message === "Invalid token!") {
                localStorage.removeItem("authToken");
                navigate("/");
            }
            if (response.status === 401) {
                message.info("Token vaqti tugagan!");
            } else {
                message.error(
                    `Avtomobillarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}` ||
                        error.message
                );
            }
        } finally {
            setLoader(false);
        }
    };

    const handleAddCar = async (values) => {
        try {
            const token = localStorage.getItem("authToken");

            const formData = new FormData();
            formData.append("model", values.model);
            formData.append("year", values.year);
            formData.append("price", values.price);
            formData.append("image", fileList[0]);

            const response = await axios.post(
                `http://localhost:3000/add-car`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchCars();
            setCars([...cars, { key: `${cars.length + 1}`, ...values }]);
            message.success("Avtomobil muvaffaqiyatli qo'shildi!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Avtomobil qoshishda xatolik yuz berdi:", error);
            message.error(
                `Avtomobil qo'shishda xatolik yuz berdi: ${
                    error.response?.data?.message || error.message
                }`
            );
        } finally {
            setOnClickBtn(false);
        }
    };

    const handleEditCar = async (values) => {
        try {
            const token = localStorage.getItem("authToken");
            const formData = new FormData();
            formData.append("model", values.model);
            formData.append("year", values.year);
            formData.append("price", values.price);
            formData.append("image", fileList[0]);

            const response = await axios.put(
                // `https://haval-uz.onrender.com/cars/${editingCar._id}`,
                `http://localhost:3000/cars/${editingCar._id}` /* LOCLA EDIT CAR */,
                formData,
                {
                    headers: {
                        "Content-Type": "Formdata",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                await fetchCars();
                setActionModal(false);
                setEditingCar(null);
                form.resetFields();
                message.success("Avtomobil muvaffaqiyatli o'zgartirildi!");
            }
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                "Avtomobil ma'lumotlarini yangilashda xatolik yuz berdi!";
            console.error(
                "Avtomobil ma'lumotlarini yangilashda xatolik yuz berdi!:",
                errorMessage
            );
            message.error(errorMessage);
        } finally {
            setOnClickBtn(false);
        }
    };

    const handleDeleteCar = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(
                `http://localhost:3000/cars/${carToDelete._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchCars();
            setDeleteModal(false);
            form.resetFields();
            message.success("Avtomobil muvaffaqiyatli o'chirildi!");
        } catch (error) {
            console.error(
                "Avtomobilni o'chirishda xatolik yuz berdi:",
                error.response?.data || error.message
            );
            message.error(
                `Avtomobilni o'chirishda xatolik yuz berdi: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    // FETCH_ADMINS===========

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const response = await axios.get(
                // "https://haval-uz.onrender.com/admins",
                "http://localhost:3000/admins",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // if (response.data.message === "Invalid token!") {
            //     navigate("/");
            // }
            setAdmins([response.data.admins]);
            console.log("Kelgan ma'lumotlar (admin):", response.data.admins);
        } catch (error) {
            const response = error.response;
            if (response?.status === 401) {
                message.info("Token vaqti tugagan!");
            } else {
                message.error(
                    `Adminlarni yuklashda xatolik yuz berdi: ${error.response?.data?.message}` ||
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
            fetchCars();
            fetchAdmins();
        }
        document.title = "Haval | Admin Panel";
    }, []);

    const handleAddAdmin = async (values) => {
        try {
            const token = localStorage.getItem("authToken");
            const addAdmin = {
                adminName: values.adminName,
                email: values.email,
                password: values.password,
            };
            const response = await axios.post(
                // `https://haval-uz.onrender.com/add-admin`,
                `http://localhost:3000/add-admin`,
                addAdmin,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await fetchAdmins();
            setAdmins([...admins, { key: `${admins.length + 1}`, ...values }]);
            message.success("Admin muvaffaqiyatli qo'shildi!");
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            message.error(
                `Admin qoshishda xatolik yuz berdi: ${error.response?.data?.message}`
            );
        } finally {
            setOnClickBtn(false);
        }
    };

    const handleEditAdmin = async (values) => {
        // EDIT
        try {
            const token = localStorage.getItem("authToken");
            const updateData = {
                adminName: values.adminName,
                email: values.email,
                password: changePassInputValue,
            };

            const response = await axios.put(
                // `https://haval-uz.onrender.com/admins/${editingAdmin._id}`,
                `http://localhost:3000/admins/${editingAdmin._id}`,
                updateData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                await fetchAdmins();
                setAactionModal(false);
                setEditingAdmin(null);
                form.resetFields();
                message.success("Admin muvaffaqiyatli o'zgartirildi!");
            }
        } catch (error) {
            console.error(
                "Adminni yangilashda xatolik yuz berdi:",
                error.response?.data || error.message
            );
            message.error(
                `Adminni yangilashda xatolik yuz berdi: ${error.response?.data?.message}`
            );
        } finally {
            setOnClickBtn(false);
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(
                // `https://haval-uz.onrender.com/admins/${adminId}`,
                `http://localhost:3000/admins/${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setDeleteAdminModal(false);
            if (response.status === 200) {
                await fetchAdmins();
                message.success("Admin muvaffaqiyatli o'chirildi!");
            }
        } catch (error) {
            console.error(
                "Adminni o'chirishda xatolik yuz berdi:",
                error.response?.data || error.message
            );
            message.error(
                `Adminni o'chirishda xatolik yuz berdi: ${error.response?.data?.message}`
            );
        }
    };

    const columnsCars = [
        {
            title: "Rasm",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Image
                    src={image}
                    style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                    }}
                    preview={{
                        mask: (
                            <div>
                                <span className='custom-mask-text'>
                                    Rasmni ko'rish
                                </span>
                            </div>
                        ),
                        maskClassName: `custom-mask ${
                            isCardView ? "custom-mask-list" : "custom-mask-card"
                        }`,
                    }}
                />
            ),
        },
        { title: "Model", dataIndex: "model", key: "model" },
        {
            title: "Yili",
            dataIndex: "year",
            key: "year",
        },
        { title: "Narxi", dataIndex: "price", key: "price" },
        {
            title: "Amallar",
            key: "actions",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                        onClick={() => {
                            setEditingCar(record);
                            setActionModal(true);
                            form.setFieldsValue(record);
                        }}
                        icon={<EditOutlined />}>
                        Tahrirlash
                    </Button>
                    <Button
                        danger
                        onClick={() => {
                            setCarToDelete(record);
                            setDeleteModal(true);
                        }}
                        icon={<DeleteOutlined />}>
                        O'chirish
                    </Button>
                </div>
            ),
        },
    ];

    const columnsAdmins = [
        {
            title: "Admin nomi",
            dataIndex: "adminName",
            key: "adminName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <div>
                    <span
                        onClick={() => {
                            setEditingAdmin(record);
                            setAactionModal(true);
                            form.setFieldsValue(record);
                        }}
                        style={{ cursor: "pointer" }}>
                        {<EditOutlined />}
                    </span>
                    <span
                        onClick={() => {
                            setAdminToDelete(record);
                            setDeleteAdminModal(true);
                        }}
                        style={{ marginLeft: 8, cursor: "pointer" }}>
                        {<DeleteOutlined />}
                    </span>
                </div>
            ),
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        message.info("BYE BYE🤫");
    };

    const handleClickBtn = () => {
        setOnClickBtn(true);
    };

    return (
        <Layout style={{ minHeight: "100vh" }} className='admin'>
            <Sider collapsible collapsedWidth={90}>
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
                        {
                            key: "6",
                            icon: <UserOutlined />,
                            label: "Foydalanuvchilar",
                        },
                        {
                            key: "7",
                            icon: <OrderedListOutlined />,
                            label: "Shartnomalar",
                        },
                    ]}
                />
            </Sider>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 16,
                }}>
                <Button type='primary'>Day/night</Button>
                <Tooltip title='Chiqish' className='tooltip-logout'>
                    <Popconfirm
                        title='Chiqish'
                        description='Haqiqatan ham chiqishni istaysizmi?'
                        onConfirm={handleLogout}
                        okText='Ha'
                        cancelText='Yoq'>
                        <LogoutOutlined />
                    </Popconfirm>
                </Tooltip>
            </div>
            <Layout>
                <Header style={{ padding: 0 }}>
                    <div
                        style={{
                            paddingLeft: "20px",
                            backgroundColor: "#fff",
                        }}>
                        <Link
                            className='hovered'
                            to='/'
                            style={{ color: "#1890ff", marginRight: "5px" }}>
                            Bosh sahifa
                        </Link>
                        {">"}
                        <Link
                            className='hovered-selected-border'
                            to='/admin'
                            style={{ color: "#1890ff", marginLeft: "5px" }}>
                            Admin panel
                        </Link>
                    </div>
                </Header>

                <Content style={{ margin: "16px", backgroundColor: "white" }}>
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
                                    <Table
                                        key={admins[0]?.id}
                                        columns={columnsAdmins}
                                        dataSource={admins[0]}
                                    />
                                )}
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
                                            name='adminName'
                                            label='Admin nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Admin nomini kiriting!",
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
                                                        "emailni kiriting!",
                                                },
                                                {
                                                    // type: "email",
                                                    message:
                                                        "to'g'ri email formatini kiriting! (misol: example@gmail.com)",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name='password'
                                            label='Parol'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "parolni kiriting!",
                                                },
                                                {
                                                    min: 6,
                                                    message:
                                                        "Parol kamida 6 ta belgi bo'lishi kerak!",
                                                },
                                            ]}>
                                            <Input.Password />
                                        </Form.Item>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block
                                            loading={onClickBtn}
                                            onClick={handleClickBtn}>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                                <Modal
                                    // EDITADMIN
                                    title='Adminni Tahrirlash'
                                    open={aActionModal}
                                    onCancel={() => setAactionModal(false)}
                                    footer={null}>
                                    <Form
                                        form={form}
                                        onFinish={handleEditAdmin}
                                        layout='vertical'>
                                        <Form.Item
                                            name='adminName'
                                            label='Admin nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Admin nomini kiriting!",
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
                                                        "emailni kiriting!",
                                                },
                                                {
                                                    type: "email",
                                                    message:
                                                        "to'g'ri email formatini kiriting! (misol: example@mail.com)",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <div className='admin-change-password'>
                                            <p
                                                onClick={handleChangePassRight}
                                                className='admin-change-password-text'>
                                                Parolni o'zgartirish
                                                {changePass && (
                                                    <ArrowRightOutlined
                                                        style={{
                                                            marginLeft: "5px",
                                                        }}
                                                    />
                                                )}
                                            </p>
                                            {changePass && (
                                                <>
                                                    <Input.Password
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "parolni kiriting!",
                                                            },
                                                            {
                                                                min: 6,
                                                                message:
                                                                    "Parol kamida 6 ta belgi bo'lishi kerak!",
                                                            },
                                                        ]}
                                                        value={
                                                            changePassInputValue
                                                        }
                                                        onChange={
                                                            handleChangePassInput
                                                        }
                                                        className='admin-change-password-input'></Input.Password>
                                                </>
                                            )}
                                        </div>
                                        <Button
                                            type='primary'
                                            htmlType='submit'
                                            block
                                            loading={onClickBtn}
                                            onClick={handleClickBtn}>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                            </>
                        )}
                        {selectedKey === "2" && (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}>
                                    <Button
                                        type='primary'
                                        style={{ marginBottom: 16 }}
                                        onClick={() => setIsModalOpen(true)}>
                                        Avtomobil qo'shish
                                    </Button>
                                    <Switch
                                        checkedChildren={
                                            <UnorderedListOutlined />
                                        }
                                        unCheckedChildren={<IdcardOutlined />}
                                        checked={isCardView}
                                        onChange={(checked) =>
                                            setIsCardView(checked)
                                        }
                                    />
                                </div>
                                {isCardView ? (
                                    loader ? (
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
                                        <Table
                                            key={cars[0]?.id}
                                            columns={columnsCars}
                                            dataSource={cars[0]}
                                        />
                                    )
                                ) : (
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(300px, 1fr))",
                                            gap: "20px",
                                        }}>
                                        {/* {cars.map((car) => ( */}
                                        {cars[0].map((car) => (
                                            <div
                                                key={car.id}
                                                style={{
                                                    padding: "15px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #eee",
                                                }}>
                                                <Image
                                                    src={car.image}
                                                    style={{
                                                        width: "100%",
                                                        height: "240px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                        marginBottom: "10px",
                                                    }}
                                                    preview={{
                                                        mask: (
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        "14px",
                                                                    color: "#fff",
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                    height: "100%",
                                                                }}>
                                                                Rasmni ko'rish
                                                            </div>
                                                        ),
                                                        maskClassName: `custom-mask ${
                                                            isCardView
                                                                ? ""
                                                                : "custom-mask-card"
                                                        }`,
                                                    }}
                                                />
                                                <h3>{car.model}</h3>
                                                <p>Yili: {car.year}</p>
                                                <p>Narxi: {car.price}</p>
                                                <div
                                                    className='action'
                                                    style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                    }}>
                                                    <Button
                                                        onClick={() => {
                                                            setEditingCar(car);
                                                            setActionModal(
                                                                true
                                                            );
                                                            form.setFieldsValue(
                                                                car
                                                            );
                                                        }}
                                                        icon={<EditOutlined />}>
                                                        Tahrirlash
                                                    </Button>
                                                    <Button
                                                        danger
                                                        onClick={() => {
                                                            setCarToDelete(car);
                                                            setDeleteModal(
                                                                true
                                                            );
                                                        }}
                                                        icon={
                                                            <DeleteOutlined />
                                                        }>
                                                        O'chirish
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Modal
                                    title='Yangi Avtomobil Qoshish'
                                    open={isModalOpen}
                                    onCancel={() => setIsModalOpen(false)}
                                    onFinish={handleAddCar}
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
                                                        "avtomobil modelini kiriting!",
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
                                                    message: "yilni kiriting!",
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
                                                    message: "narxni kiriting!",
                                                },
                                            ]}>
                                            <Input />
                                        </Form.Item>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            id='add-car'
                                            className='add-car-input edit-car-input'
                                            onChange={(e) =>
                                                setFileList(e.target.files)
                                            }
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
                                                src={URL.createObjectURL(
                                                    fileList[0]
                                                )}
                                                alt='Rasm'
                                                style={{
                                                    width: 100,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        )}
                                        <Button
                                            className='edit-car-button-submit'
                                            type='primary'
                                            htmlType='submit'
                                            block
                                            loading={onClickBtn}
                                            onClick={handleClickBtn}>
                                            Tasdiqlash
                                        </Button>
                                    </Form>
                                </Modal>
                                <Modal
                                    open={previewModal.isOpen}
                                    footer={null}
                                    onCancel={() =>
                                        setPreviewModal({
                                            isOpen: false,
                                            image: "",
                                        })
                                    }>
                                    <Image
                                        src={previewModal.image}
                                        alt='Avtomobil rasmi'
                                        style={{ width: "100%" }}
                                    />
                                </Modal>
                            </>
                        )}
                        {selectedKey === "3" && (
                            <>
                                <AdminNews />
                            </>
                        )}
                        {selectedKey === "4" && (
                            <div>
                                <AdminVideos />
                            </div>
                        )}
                        {selectedKey === "5" && <h1>Savdo statistikasi</h1>}
                        {selectedKey === "6" && (
                            <>
                                <AdminUsers />
                            </>
                        )}
                        {selectedKey === "7" && (
                            <>
                                <AdminAgreement />
                            </>
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Haval Admin Panel &copy; 2025
                </Footer>
            </Layout>
            {/* LAYOUT END +-=-=-=-=-=-=-+_+_+-==-+_+=-=-=-=-=+_+_+ */}

            {/* EDIT MODAL =----=-=--=-=---=-=-==- */}
            <Modal
                title='Avtomobilni tahrirlash'
                open={actionModal}
                onCancel={() => {
                    setActionModal(false);
                    setEditingCar(null);
                    setFileList([]);
                    form.resetFields();
                }}
                footer={null}>
                <Form
                    form={form}
                    onFinish={handleEditCar}
                    layout='vertical'
                    initialValues={editingCar}>
                    <Form.Item
                        name='model'
                        label='Model'
                        rules={[
                            {
                                required: true,
                                message: "avtomobil modelini kiriting!",
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
                                message: "yilni kiriting!",
                            },
                        ]}>
                        <InputNumber min={2020} className='full-w-input' />
                    </Form.Item>
                    <Form.Item
                        name='price'
                        label='Narxi'
                        rules={[
                            {
                                required: true,
                                message: "narxni kiriting!",
                            },
                        ]}>
                        <InputNumber min={19000} className='full-w-input' />
                    </Form.Item>
                    <Form.Item label='Avtomobil rasmi:'>
                        <input
                            type='file'
                            accept='image/*'
                            id='edit-car'
                            className='edit-car-input'
                            onChange={(e) => setFileList(e.target.files)}
                        />
                        <label
                            htmlFor='edit-car'
                            title='Rasm tanlash'
                            className='edit-car-label'>
                            Rasm tanlash
                        </label>
                        {fileList.length > 0 && (
                            <Image
                                src={URL.createObjectURL(fileList[0])}
                                alt='Rasm'
                                style={{ width: 100, borderRadius: 5 }}
                            />
                        )}
                    </Form.Item>
                    <Button
                        className='edit-car-button-submit'
                        type='primary'
                        htmlType='submit'
                        block
                        loading={onClickBtn}
                        onClick={handleClickBtn}>
                        Saqlash
                    </Button>
                </Form>
            </Modal>
            {/* EDIT MODAL =----=-=--=-=---=-=-==- */}
            {/* ===========================DELETE MODAL =----=-=--=-=---=-=-==- */}
            <Modal
                title="Adminni o'chirish"
                open={deleteAdminModal}
                onOk={() => handleDeleteAdmin(adminToDelete?._id)}
                onCancel={() => {
                    setDeleteAdminModal(false);
                    setAdminToDelete(null);
                }}
                okText="O'chirish"
                okButtonProps={{
                    style: {
                        backgroundColor: "red",
                        color: "white",
                    },
                }}
                cancelText='Bekor qilish'>
                <p style={{ textAlign: "center" }}>
                    Haqiqatan ham bu adminni o'chirmoqchimisiz?
                </p>
                {adminToDelete && (
                    <div style={{ marginLeft: "90px" }}>
                        <p>
                            Admin nomi:{" "}
                            <strong>{adminToDelete.adminName}</strong>
                        </p>
                        <p>
                            Admin emaili: <strong>{adminToDelete.email}</strong>
                        </p>
                    </div>
                )}
            </Modal>

            <Modal
                title="Avtomobilni o'chirish"
                open={deleteModal}
                onOk={handleDeleteCar}
                onCancel={() => {
                    setDeleteModal(false);
                    setCarToDelete(null);
                }}
                okText="O'chirish"
                okButtonProps={{
                    style: {
                        backgroundColor: "red",
                        color: "white",
                    },
                }}
                cancelText='Bekor qilish'>
                <p style={{ textAlign: "center" }}>
                    Haqiqatan ham bu avtomobilni o'chirmoqchimisiz?
                </p>
                {carToDelete && (
                    <div style={{ textAlign: "center" }}>
                        <Image
                            src={carToDelete.image}
                            alt={carToDelete.model}
                            className='custom-preview-image'
                            style={{ width: 190, marginBottom: 8 }}
                            preview={{
                                maskClassName: "custom-preview-mask",
                                mask: (
                                    <div className='custom-preview-tex'>
                                        Preview
                                    </div>
                                ),
                            }}
                        />
                        <p>
                            <strong>{carToDelete.model}</strong>
                        </p>
                    </div>
                )}
            </Modal>
            {/* DELETE MODAL =----=-=--=-=---=-=-==- */}
        </Layout>
    );
};

export default AdminPanel;
