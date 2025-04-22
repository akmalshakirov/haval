// try {
//     if (!token) {
//         message.error("Token topilmadi, qayta tizimga kiring!");
//         return;
//     }
//     const response = await axios.get(
//         `http://localhost:3000/profil/${userID}`,
//         {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     if (response?.data) {
//         setUserData({
//             name: response.data.name,
//             email: response.data.email,
//         });
//         setAgreements(response.data.orders);
//     }
// } catch (error) {
//     const response = error.response;
//     if (error.code === "ERR_NETWORK") {
//         return message.warning("Server ishlamayotgan bo'lishi mumkin");
//     } else if (response.status === 401) {
//         message.info("Token vaqti tugagan!");
//     } else {
//         console.log(error);
//         message.error(`Xatolik yuz berdi: ${error.message}`);
//     }
// } finally {
//     setLoading(false);
// }import { Layout, Menu, message, Spin, Switch } from "antd";
import {
    DashboardOutlined,
    LogoutOutlined,
    MoonOutlined,
    OrderedListOutlined,
    SunOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message, Switch } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../Images/haval.svg";
import "./User.css";
import UserAgreement from "./UserAgreement.jsx";
import UserEditProfile from "./UserEditProfile.jsx";
import UserMainMenu from "./UserMainMenu.jsx";
import { UserService } from "./UserService";

const UserPage = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState("Oq");
    const [selectedKey, setSelectedKey] = useState("1");
    const [data, setData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!UserService.TOKEN) {
            message.error("Token topilmadi, qayta tizimga kiring!");
            navigate("/login");
        }
        document.title = "HAVAL | Shaxsiy kabinet";
        fetchUserData();
    }, [location]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/profil/${UserService.USER_ID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${UserService.TOKEN}`,
                    },
                }
            );

            if (response?.data) {
                const userInfo = [
                    { name: response.data.name, email: response.data.email },
                ];
                localStorage.setItem("userData", JSON.stringify(userInfo));
                setData(response.data.orders);
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                return message.warning("Server ishlamayotgan bo'lishi mumkin");
            } else if (
                error.message === "Token has expired!" ||
                error.status === 401
            ) {
                return message.warning("Token vaqti tugagan!");
            } else {
                message.error(error.message || "Ma'lumotlarni olishda xatolik");
            }
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("userData");
        message.success("Shaxsiy kabinetdan chiqildi");
        navigate("/");
    };

    return (
        <div className='user-page-wrapper'>
            <Layout style={{ minHeight: "100vh" }} className='user-page-layout'>
                <Sider
                    style={{
                        borderRight: "1px solid #565555",
                    }}>
                    <div className='user-sidebar-top-logo'>
                        <Link
                            to='/'
                            style={{
                                display: "inline-block",
                                width: "100%",
                                padding: "24px 20px 20px 30px",
                                borderBottom: "1px solid #565555",
                            }}>
                            <img src={Logo} alt='logo' />
                        </Link>
                    </div>
                    <Menu
                        style={{
                            marginTop: "15px",
                        }}
                        theme='dark'
                        mode='inline'
                        selectedKeys={[selectedKey]}
                        onClick={(e) => setSelectedKey(e.key)}
                        items={[
                            {
                                key: "1",
                                icon: <DashboardOutlined />,
                                label: "Asosiy menyu",
                            },
                            {
                                key: "2",
                                icon: <UserOutlined />,
                                label: "Profilim",
                            },
                            {
                                key: "3",
                                icon: <OrderedListOutlined />,
                                label: "Shartnomalarim",
                            },
                        ]}
                    />
                    <div>
                        <Menu
                            theme='dark'
                            mode='inline'
                            selectedKeys={[]}
                            onClick={handleLogOut}
                            items={[
                                {
                                    key: "4",
                                    icon: <LogoutOutlined />,
                                    label: "Chiqish",
                                    style: {
                                        border: "1px solid red",
                                    },
                                },
                            ]}
                        />
                    </div>
                </Sider>

                <Layout
                    style={{
                        backgroundColor:
                            theme === "To'q ko'k" ? "#00152a" : "#f7f7f7",
                        transition: "444ms",
                    }}>
                    <Header
                        style={{
                            padding: 0,
                            color: "#fff",
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor:
                                theme === "To'q ko'k"
                                    ? "rgba(1,28,56,0.3)"
                                    : "rgba(230,230,230,0.6)",
                            transition: "inherit",
                        }}>
                        <div
                            style={{
                                padding: "0 10px",
                                marginLeft: "20px",
                                color: "#1890ff",
                            }}>
                            <Link
                                to='/'
                                style={{
                                    marginRight: "5px",
                                }}>
                                Bosh sahifa
                            </Link>
                            {">"}
                            <Link
                                to='/user'
                                style={{
                                    marginLeft: "5px",
                                }}>
                                Shaxsiy kabinet
                            </Link>
                        </div>
                        <div style={{ marginRight: "30px" }}>
                            <Switch
                                checkedChildren={<MoonOutlined />}
                                unCheckedChildren={<SunOutlined />}
                                checked={theme === "To'q ko'k"}
                                onChange={(checked) =>
                                    setTheme(checked ? "To'q ko'k" : "Oq")
                                }
                                title="Mavzuni o'zgartirish"
                            />
                        </div>
                    </Header>

                    <Content
                        style={{
                            margin: "16px",
                        }}>
                        <div
                            style={{
                                padding: 24,
                                color: theme === "To'q ko'k" ? "#fff" : "#000",
                                minHeight: 360,
                            }}>
                            {selectedKey === "1" && (
                                <UserMainMenu data={data} theme={theme} />
                            )}
                            {selectedKey === "2" && (
                                <UserEditProfile theme={theme} />
                            )}
                            {selectedKey === "3" && (
                                <>
                                    <UserAgreement data={data} theme={theme} />
                                </>
                            )}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default UserPage;
