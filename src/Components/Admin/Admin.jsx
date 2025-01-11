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
    Image,
    Upload,
    Tooltip,
    Switch,
    Popconfirm,
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
    UnorderedListOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AdminVideos from "./AdminVideos";
import axios from "axios";
import "./Admin.css";

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
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [actionModal, setActionModal] = useState(false);
    const [aActionModal, setAactionModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const navigate = useNavigate();
    const [isCardView, setIsCardView] = useState(true);
    const [editingCar, setEditingCar] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [carToDelete, setCarToDelete] = useState(null);

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

    const fetchAdmins = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, iltimos qayta tizimga kiring!");
                return;
            }

            const response = await axios.get("http://localhost:3000/admins", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAdmins([response.data.admins]);
            console.log("Kelgan ma'lumotlar:", response.data.admins);
        } catch (error) {
            console.error(
                "Xatolik:",
                error.response?.data || error.message || error
            );
            message.error("Adminlar yuklanishda xatolik yuz berdi!");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            fetchCars();
            fetchAdmins();
        }
    }, []);

    const handleAddAdmin = (values) => {
        setAdmins([...admins, { key: `${admins.length + 1}`, ...values }]);
        message.success("Admin muvaffaqiyatli qo'shildi!");
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleEditAdmin = async (values) => {
        try {
            const token = localStorage.getItem("authToken");
            const updateData = {
                adminName: values.adminName,
                email: values.email,
                password: values.password,
            };

            const response = await axios.put(
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
            console.error("Xatolik:", error.response?.data || error.message);
            message.error(
                error.response?.data?.message ||
                    "Admin ma'lumotlarini yangilashda xatolik yuz berdi!"
            );
        }
    };

    const handleDeleteAdmin = async (adminId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(
                `http://localhost:3000/admins/${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                await fetchAdmins();
                message.success("Admin muvaffaqiyatli o'chirildi!");
            }
        } catch (error) {
            console.error("Xatolik:", error.response?.data || error.message);
            message.error(
                error.response?.data?.message ||
                    "Adminni o'chirishda xatolik yuz berdi!"
            );
        }
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
        // localStorage.setItem("cars", JSON.stringify(updatedCars));

        setCars([...cars, newCar]);
        message.success("Avtomobil muvaffaqiyatli qo'shildi!");

        setFileList([]);
        setIsModalOpen(false);
        form.resetFields();

        URL.revokeObjectURL(file.originFileObj);
    };
    const handleFileChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 0 && newFileList[0].originFileObj) {
            const reader = new FileReader();
            reader.onload = () => {
                newFileList[0].url = reader.result;
                setFileList(newFileList);
            };
            reader.readAsDataURL(newFileList[0].originFileObj);
        } else {
            setFileList(newFileList);
        }
    };

    const handlePreviewImage = (image) => {
        setPreviewModal({
            image: image,
        });
    };

    const handleEditCar = (values) => {
        if (!editingCar) return;

        const newImage = fileList[0]?.url || editingCar.image;

        setCars(
            cars.map((car) =>
                car.key === editingCar.key
                    ? {
                          ...car,
                          ...values,
                          image: newImage,
                      }
                    : car
            )
        );
        setActionModal(false);
        setEditingCar(null);
        setFileList([]);
        form.resetFields();
        message.success("Avtomobil muvaffaqiyatli tahrirlandi!");
    };

    const handleDeleteCar = () => {
        setCars(cars.filter((car) => car.key !== carToDelete.key));
        setDeleteModal(false);
        setCarToDelete(null);
        message.success("Avtomobil muvaffaqiyatli o'chirildi!");
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
                        borderRadius: "50%",
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
        { title: "Yili", dataIndex: "year", key: "year" },
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
            title: "Admin Name",
            dataIndex: "adminName",
            key: "adminName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
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
                        onClick={() => handleDeleteAdmin(record._id)}
                        style={{ marginLeft: 8 }}>
                        {<DeleteOutlined />}
                    </a>
                </div>
            ),
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
        // localStorage.removeItem("users");
        // localStorage.removeItem("isAuthenticated");
        // window.location.reload(); ========= DON'T REMOVE
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
                    ]}
                />
            </Sider>
            <div style={{ position: "absolute", top: 0, right: 0, margin: 16 }}>
                {/* <Tooltip title='Logout'>
                    <Button
                        type='text'
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    />
                </Tooltip> */}
                <Tooltip title='Chiqish' className='tooltip-logout'>
                    <Popconfirm
                        title='Chiqish'
                        description='Haqiqatan ham chiqishni istasizmi?'
                        onConfirm={handleLogout}
                        okText='Ha'
                        cancelText='Yoq'>
                        <LogoutOutlined />
                    </Popconfirm>
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
                                    key={admins[0]?.id}
                                    columns={columnsAdmins}
                                    dataSource={admins[0]}
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
                                            name='adminName'
                                            label='Admin nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, Admin nomini kiriting!",
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
                                                {
                                                    type: "email",
                                                    message:
                                                        "Iltimos, to'g'ri email formatini kiriting! (misol: example@gmail.com)",
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
                                                        "Iltimos, parolni kiriting!",
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
                                            name='adminName'
                                            label='Admin nomi'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Iltimos, Admin nomini kiriting!",
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
                                                {
                                                    type: "email",
                                                    message:
                                                        "Iltimos, to'g'ri email formatini kiriting! (misol: example@mail.com)",
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
                                                        "Iltimos, parolni kiriting!",
                                                },
                                            ]}>
                                            <Input.Password />
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
                                    <Table
                                        dataSource={cars}
                                        columns={columnsCars}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                "repeat(auto-fill, minmax(300px, 1fr))",
                                            gap: "20px",
                                        }}>
                                        {cars.map((car) => (
                                            <div
                                                key={car.key}
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
                                                beforeUpload={() => false}
                                                maxCount={1}>
                                                {fileList.length >= 1 ? null : (
                                                    <div>
                                                        <UploadOutlined />
                                                        <div
                                                            style={{
                                                                marginTop: 8,
                                                            }}>
                                                            Yuklash
                                                        </div>
                                                    </div>
                                                )}
                                            </Upload>
                                            {editingCar && !fileList.length && (
                                                <Image
                                                    src={editingCar.image}
                                                    alt='Current image'
                                                    style={{
                                                        width: 100,
                                                        marginTop: 8,
                                                    }}
                                                    preview={true}
                                                />
                                            )}
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
                    Haval Admin Panel &copy; 2024
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
                                message: "Iltimos, yilni kiriting!",
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
                                message: "Iltimos, narxni kiriting!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Avtomobil rasmi'>
                        <Upload
                            listType='picture-card'
                            fileList={fileList}
                            onChange={handleFileChange}
                            beforeUpload={() => false}
                            maxCount={1}>
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Yuklash</div>
                                </div>
                            )}
                        </Upload>
                        {editingCar && !fileList.length && (
                            <Image
                                src={editingCar.image}
                                alt='Current image'
                                style={{ width: 100, marginTop: 8 }}
                                preview={true}
                            />
                        )}
                    </Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        Saqlash
                    </Button>
                </Form>
            </Modal>
            {/* EDIT MODAL =----=-=--=-=---=-=-==- */}
            {/* ===========================DELETE MODAL =----=-=--=-=---=-=-==- */}
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
