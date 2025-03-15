import "./User.css";
import { Avatar, Card, Col, Input, Layout, Row } from "antd";
import {
    CheckCircleOutlined,
    DashboardOutlined,
    DollarOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FieldTimeOutlined,
    HeartOutlined,
    LogoutOutlined,
    PieChartOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider, Header, Content } = Layout;

function UserPage() {
    return (
        <div className='user-page-wrapper'>
            <Layout className='user-page-layout'>
                <Sider
                    style={{
                        minHeight: "100vh",
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
                                    src={
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
                                <DashboardOutlined
                                    style={{ marginRight: "7px" }}
                                />
                                Shartnomalarim
                            </div>
                            <div>
                                <EditOutlined style={{ marginRight: "7px" }} />
                                Profilim
                            </div>
                            <div>
                                <LogoutOutlined
                                    style={{ marginRight: "7px" }}
                                />
                                Chiqish
                            </div>
                        </div>
                    </div>
                </Sider>

                <Layout>
                    <Header>
                        <div style={{ marginLeft: "20px", color: "#fff" }}>
                            <Link to='/' style={{ marginRight: "5px" }}>
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
                    </Header>
                    <Content>
                        <h2 style={{ color: "#fff", marginLeft: "30px" }}>
                            Mening shartnomalarim:
                        </h2>
                        {/* <Row gutter={16} style={{ padding: "20px" }}>
                            <Col span={6}>
                                <Card
                                    className='user-page-card'
                                    variant='borderless'
                                    style={{
                                        backgroundColor: "#fff",
                                    }}>
                                    <h2 style={{ display: "inline-block" }}>
                                        <span
                                            style={{
                                                marginRight: "5px",
                                            }}>
                                            <PieChartOutlined />
                                        </span>
                                        Jami:{" "}
                                        <span
                                            style={{
                                                fontWeight: "500",
                                            }}>
                                            20
                                        </span>
                                    </h2>
                                </Card>
                            </Col>
                            <div>
                                <div
                                    className='user-page-card user-page-first-card-wrapper'
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minWidth: "249px",
                                        minHeight: "81px",
                                        height: "100%",
                                        border: "1px solid #fff",
                                        borderRadius: "8px",
                                    }}>
                                    <h2
                                        className='user-page-first-card'
                                        style={{
                                            display: "inline-block",
                                            width: "100%",
                                            height: "100%",
                                        }}>
                                        <span
                                            style={{
                                                marginRight: "5px",
                                            }}>
                                            <FieldTimeOutlined />
                                        </span>
                                        Kutilayotgan:{" "}
                                        <span
                                            style={{
                                                fontWeight: "500",
                                            }}>
                                            4
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <Col span={6}>
                                <Card
                                    className='user-page-card'
                                    variant='borderless'
                                    style={{
                                        backgroundColor: "#fff",
                                    }}>
                                    <h2
                                        className='user-page-second-card'
                                        style={{ display: "inline-block" }}>
                                        <span>
                                            <ExclamationCircleOutlined
                                                style={{
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </span>
                                        Bekor qilingan:{" "}
                                        <span
                                            style={{
                                                fontWeight: "500",
                                            }}>
                                            3
                                        </span>
                                    </h2>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    className='user-page-card'
                                    variant='borderless'
                                    style={{
                                        backgroundColor: "#fff",
                                    }}>
                                    <h2
                                        className='user-page-third-card'
                                        style={{ display: "inline-block" }}>
                                        <span>
                                            <CheckCircleOutlined
                                                style={{
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </span>
                                        To'langan:{" "}
                                        <span
                                            style={{
                                                fontWeight: "500",
                                            }}>
                                            8
                                        </span>
                                    </h2>
                                </Card>
                            </Col>
                        </Row> */}
                        <div className='user-page-content-wrapper'>
                            <div className='user-page-content-cards'>
                                <div className='user-page-content-card'>
                                    <span className='user-page-content-card-icon'>
                                        <PieChartOutlined />
                                    </span>
                                    <div
                                        style={{
                                            backgroundColor:
                                                "transparent !important",
                                            display: "flex",
                                            gap: "5px",
                                        }}>
                                        <h2>Jami:</h2>
                                        <h2>94</h2>
                                    </div>
                                </div>
                                <div className='user-page-content-card'>
                                    <span className='user-page-content-card-icon'>
                                        <FieldTimeOutlined />
                                    </span>
                                    <div
                                        style={{
                                            backgroundColor:
                                                "transparent !important",
                                            display: "flex",
                                            gap: "5px",
                                        }}>
                                        <h2>Kutilayotgan:</h2>
                                        <h2>23</h2>
                                    </div>
                                </div>
                                <div className='user-page-content-card'>
                                    <span className='user-page-content-card-icon'>
                                        <ExclamationCircleOutlined />
                                    </span>
                                    <div
                                        style={{
                                            backgroundColor:
                                                "transparent !important",
                                            display: "flex",
                                            gap: "5px",
                                        }}>
                                        <h2>Bekor qilingan:</h2>
                                        <h2>787</h2>
                                    </div>
                                </div>
                                <div className='user-page-content-card'>
                                    <span className='user-page-content-card-icon'>
                                        <CheckCircleOutlined />
                                    </span>
                                    <div
                                        style={{
                                            backgroundColor:
                                                "transparent !important",
                                            display: "flex",
                                            gap: "5px",
                                        }}>
                                        <h2>To'langan:</h2>
                                        <h2>234567</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default UserPage;
