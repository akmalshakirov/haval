import React from "react";
import "./User.css";
import { Layout, Avatar, Input } from "antd";
import {
    DashboardOutlined,
    EditOutlined,
    LogoutOutlined,
    SearchOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// Ant Design Layout komponentlarini ajratib olish
const { Sider, Header, Content } = Layout;

function AAAAAAAAAAAAAAAAAAAAAAAAAA() {
    return (
        <Layout className='user-page-layout' style={{ minHeight: "100vh" }}>
            <Sider
                style={{
                    backgroundColor: "#081027",
                    borderRight: "1px solid #0B1739",
                }}
                className='user-page-sider'>
                <div className='user-page-sidebar-content'>
                    <div style={{ marginBottom: "10px" }}>
                        <div
                            className='user-page-sidebar-info'
                            style={{ marginBottom: "10px" }}>
                            <Avatar
                                size={64}
                                icon={
                                    <UserOutlined
                                        style={{ fontSize: "54px" }}
                                    />
                                }
                            />
                            <h3>Ism: User</h3>
                            <p>Email: user@gmail.com</p>
                        </div>
                        <Input
                            type='search'
                            placeholder='Izlash...'
                            prefix={<SearchOutlined />}
                            style={{
                                borderColor: "#343B4F",
                                backgroundColor: "#0a1739",
                                color: "#fff",
                            }}
                        />
                    </div>
                    <div className='user-page-sidebar-menu'>
                        <div>
                            <DashboardOutlined style={{ marginRight: "7px" }} />
                            Shartnomalarim
                        </div>
                        <div>
                            <EditOutlined style={{ marginRight: "7px" }} />
                            Profilim
                        </div>
                        <div>
                            <LogoutOutlined style={{ marginRight: "7px" }} />
                            Chiqish
                        </div>
                    </div>
                </div>
            </Sider>

            <Layout>
                <Header
                    style={{
                        backgroundColor: "transparent",
                        borderBottom: "1px solid #0B1739",
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <div style={{ marginLeft: "20px", color: "#fff" }}>
                        <Link
                            to='/'
                            style={{ marginRight: "5px", color: "#fff" }}>
                            Bosh sahifa
                        </Link>
                        {">"}
                        <Link
                            to='/user'
                            style={{ marginLeft: "5px", color: "#fff" }}>
                            Shaxsiy kabinet
                        </Link>
                    </div>
                </Header>

                <Content style={{ padding: "20px", color: "#fff" }}>
                    <h2>Shaxsiy kabinetga xush kelibsiz!</h2>
                    <p>
                        Bu yerda shartnomalar, profil ma'lumotlari va boshqa
                        amallarni boshqarishingiz mumkin.
                    </p>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AAAAAAAAAAAAAAAAAAAAAAAAAA;
