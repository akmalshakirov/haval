import React, { useEffect, useState } from "react";
import {
    Layout,
    Menu,
    Avatar,
    Dropdown,
    Card,
    Row,
    Col,
    Modal,
    Form,
    Input,
    message,
    List,
    Button,
    Spin,
} from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserImage from "../../Images/userimage.png";

const { Header, Sider, Content } = Layout;

const UserPage = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuKey, setSelectedMenuKey] = useState("dashboard");
    const [contracts, setContracts] = useState([]);
    const [loadingContracts, setLoadingContracts] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    // const [downloadLoading, setDownloadLoading] = useState(false);
    const [user, setUser] = useState({ name: "", email: "" });
    const [form] = Form.useForm();
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    useEffect(() => {
        document.title = "Haval | Shaxsiy kabinet";
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
            message.info("Iltimos, avval login qiling!");
        } else {
            fetchUserData();
        }
    }, [navigate]);

    const fetchUserData = async () => {
        setLoadingContracts(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/profil/${userID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUser({ name: response.data.name, email: response.data.email });
            setContracts(response.data.orders);
        } catch (error) {
            console.error("Ma'lumotlarni yuklashda xato:", error);
            message.error("Ma'lumotlarni yuklashda xato yuz berdi");
        } finally {
            setLoadingContracts(false);
        }
    };

    const handleProfileUpdate = async (values) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/profil/${userID}`,
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                message.success("Profil muvaffaqiyatli yangilandi");
                setProfileModalVisible(false);
                fetchUserData();
            }
        } catch (error) {
            console.error("Profilni tahrirlashda xato:", error);
            message.error("Profilni yangilashda xatolik yuz berdi");
        }
    };

    // const downloadPdf = async (fileUrl) => {
    //     setDownloadLoading(true);
    //     try {
    //         const response = await axios.get(fileUrl, {
    //             responseType: "blob",
    //         });
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = fileUrl.split("/").pop();
    //         document.body.appendChild(a);
    //         a.click();
    //         document.body.removeChild(a);
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error("PDF yuklab olishda xato:", error);
    //         message.error("PDF yuklab olishda xatolik yuz berdi");
    //     } finally {
    //         setDownloadLoading(false);
    //     }
    // };

    const menuItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Shartnomalarim",
        },
    ];

    const dropdownMenu = {
        items: [
            {
                key: "edit",
                icon: <EditOutlined />,
                label: "Profilni tahrirlash",
            },
            { key: "logout", icon: <LogoutOutlined />, label: "Chiqish" },
        ],
        onClick: ({ key }) => {
            if (key === "edit") {
                setProfileModalVisible(true);
            } else if (key === "logout") {
                localStorage.removeItem("token");
                message.success("Tizimdan chiqildi");
                navigate("/login");
            }
        },
    };

    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(
        (c) => c.status === "Active"
    ).length;
    const pendingContracts = contracts.filter(
        (c) => c.status === "Pending"
    ).length;
    const recentActivities = contracts.slice(0, 5);

    const renderDashboard = () => (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <Link
                    to='/'
                    className='hovered'
                    style={{ color: "#1890ff", marginRight: "5px" }}>
                    Bosh sahifa
                </Link>
                {">"}
                <Link
                    className='hovered-selected-border'
                    to='/user'
                    style={{ color: "#1890ff", marginLeft: "5px" }}>
                    Shaxsiy kabinet
                </Link>
            </div>
            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                <Col xs={24} sm={8}>
                    <Card>
                        <h3>Umumiy shartnomalar</h3>
                        <p style={{ fontSize: "24px" }}>{totalContracts}</p>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <h3>Aktiv shartnomalar</h3>
                        <p style={{ fontSize: "24px", color: "#52c41a" }}>
                            {activeContracts}
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <h3>Kutilayotgan shartnomalar</h3>
                        <p style={{ fontSize: "24px", color: "#faad14" }}>
                            {pendingContracts}
                        </p>
                    </Card>
                </Col>
            </Row>
            <div style={{ marginTop: "30px" }}>
                <h2>Mening shartnomalarim</h2>
                {loadingContracts ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <h1>Yuklanmoqda...</h1>
                        <Spin size='large' />
                    </div>
                ) : recentActivities && recentActivities.length > 0 ? (
                    <List
                        itemLayout='horizontal'
                        dataSource={recentActivities}
                        renderItem={(activity) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ism, familiya: ${activity.fullname}`}
                                    description={`Status: ${activity.status}`}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <p>Hozirlikcha shartnomalar yoq</p>
                )}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (selectedMenuKey) {
            case "dashboard":
                return renderDashboard();
            default:
                return renderDashboard();
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <Avatar size={collapsed ? 40 : 80} src={UserImage} />
                    {!collapsed && (
                        <div style={{ color: "#fff", marginTop: "10px" }}>
                            <p>
                                <strong>Ism:</strong>{" "}
                                {loadingContracts ? "Misol" : user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {loadingContracts
                                    ? "misol@gmail.com"
                                    : user.email}
                            </p>
                        </div>
                    )}
                </div>
                <Menu
                    theme='dark'
                    mode='inline'
                    selectedKeys={[selectedMenuKey]}
                    onClick={(e) => setSelectedMenuKey(e.key)}
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}>
                        <Input
                            placeholder='Izlash...'
                            prefix={<SearchOutlined />}
                            style={{ width: "300px" }}
                        />
                    </div>
                    <Dropdown menu={dropdownMenu} trigger={["click"]}>
                        <Avatar style={{ cursor: "pointer" }} src={UserImage} />
                    </Dropdown>
                </Header>
                <Content style={{ margin: "20px" }}>{renderContent()}</Content>
            </Layout>

            <Modal
                title='Profilni tahrirlash'
                open={profileModalVisible}
                onCancel={() => setProfileModalVisible(false)}
                footer={null}>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleProfileUpdate}>
                    <Form.Item
                        label="To'liq ism"
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: "Iltimos, ismingizni kiriting",
                            },
                        ]}>
                        <Input placeholder='Ismingiz' />
                    </Form.Item>
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Iltimos, to'g'ri email kiriting",
                            },
                        ]}>
                        <Input placeholder='Email manzilingiz' />
                    </Form.Item>
                    <Form.Item label='Parol (ixtiyoriy)' name='password'>
                        <Input.Password placeholder='Parolingiz' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            Profilni yangilash
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default UserPage;
