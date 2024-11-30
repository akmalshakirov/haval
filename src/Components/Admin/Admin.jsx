import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import HeaderNavBar from "../Header/HeaderNavBar";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    CarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import AdminContent from "./AdminContent";

const { Header, Sider, Content } = Layout;

function AdminPanel() {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const renderContent = () => {
        switch (selectedKey) {
            case "1":
                return (
                    <div>
                        <AdminContent />
                    </div>
                );
            case "2":
                return <div>Models content</div>;
            case "3":
                return <div>NAVBAR 3 content</div>;
            default:
                return <div>Default content</div>;
        }
    };

    return (
        <div className='admin'>
            <div>
                <HeaderNavBar />
            </div>
            <Layout className='layout'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className='sider'>
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={["1"]}
                        onClick={(e) => setSelectedKey(e.key)}
                        items={[
                            {
                                key: "1",
                                icon: <UserOutlined />,
                                label: "Admin",
                            },
                            {
                                key: "2",
                                icon: <CarOutlined />,
                                label: "Models",
                            },
                            {
                                key: "3",
                                icon: <UploadOutlined />,
                                label: "NAVBAR 3",
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}>
                        <Button
                            type='text'
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}>
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AdminPanel;
