import { useEffect, useState } from "react";
import { Form, Input, Layout, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content } = Layout;

const UserEditProfile = () => {
    const navigate = useNavigate();
    const [name, password] = useState();
    const [userInfo, setUserInfo] = useState([]);
    useEffect(() => {
        document.title = "Haval | Profilni tahrirlash";
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
            message.info("Oldin login qiling!");
        }
    });

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(
                `http:localhost:3000/users/`,
                { name },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data) {
                message.success("Profil muvaffaqiyatli o'zgartirildi");
                setUserInfo([response.data]);
            } else {
                message.error("");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        padding: "0 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <div>
                        <ul style={{ display: "flex", gap: 10 }}>
                            <li>
                                <Link
                                    className='hovered'
                                    to='/'
                                    style={{
                                        color: "#00000090",
                                    }}>
                                    Bosh sahifa
                                </Link>
                            </li>
                            <span>{">"}</span>
                            <li>
                                <Link to='/user' className='hovered'>
                                    Shaxsiy kabinet
                                </Link>
                            </li>
                            <span>{">"}</span>
                            <li>
                                <Link
                                    to='/user/edit-profile'
                                    className='hovered'>
                                    Profilni tahrirlash
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <div></div>
                    <Form>
                        <Form.Item name='name' label="Ismni o'zgartirish">
                            <Input />
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserEditProfile;
