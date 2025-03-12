import { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    Form,
    Input,
    Layout,
    Menu,
    message,
    Modal,
} from "antd";
import {
    FileTextOutlined,
    ReloadOutlined,
    DownloadOutlined,
    FileUnknownOutlined,
} from "@ant-design/icons";
import UserImage from "../../Images/userimage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const { Header, Content, Sider } = Layout;

const UserPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [contracts, setUserContracts] = useState([]);
    const [userEditModal, setUserEditModal] = useState(false);
    const userID = localStorage.getItem("userID");
    const [loadPDF, setLoadPDF] = useState(false);

    useEffect(() => {
        document.title = "Haval | Shaxsiy kabinet";
        const token = localStorage.getItem("token");
        if (!token) {
            localStorage.removeItem("token");
            navigate("/login");
            message.info("Oldin login qiling!");
        }
    }, [navigate]);

    const fetchUserContracts = async () => {
        setLoader(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:3000/profil/${userID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // const userData = response?.data;
            // const orders = userData?.orders ? [userData.orders] : [];

            setUserContracts(response.data.orders);
        } catch (error) {
            console.log("Xato:", error);
        } finally {
            setLoader(false);
        }
    };

    const userEditFunc = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:3000/profil/${userID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                setUserEditModal(!userEditModal);
                message.success("Profil muvaffaqiyatli tahrirlandi");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserContracts();
    }, []);

    const headerStyle = {
        display: "flex",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
    };
    const cellStyle = (width) => ({
        flex: width ? `0 0 ${width}px` : 1,
        display: "flex",
        padding: "10px",
        alignItems: "center",
    });

    const downloadPdf = async (fileUrl) => {
        setLoadPDF(true);
        try {
            const response = await axios.get(fileUrl, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = fileUrl.split("/").pop();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadPDF(false);
        }
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible>
                <Menu
                    theme='dark'
                    defaultSelectedKeys={["1"]}
                    mode='inline'
                    items={[
                        {
                            key: "1",
                            icon: <FileTextOutlined />,
                            label: "Shartnomalarim",
                        },
                    ]}
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
                    <div>
                        <ul style={{ display: "flex", gap: 10 }}>
                            <li>
                                <Link
                                    className='hovered'
                                    to='/'
                                    style={{ color: "#00000090" }}>
                                    Bosh sahifa
                                </Link>
                            </li>
                            <span>{">"}</span>
                            <li>
                                <Link to='/user' className='hovered'>
                                    Shaxsiy kabinet
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Dropdown
                        menu={{
                            items: [
                                { key: "edit", label: "Profilni tahrirlash" },
                                { key: "logout", label: "Tizimdan chiqish" },
                            ],
                            onClick: (info) => {
                                if (info.key === "edit") {
                                    setUserEditModal(!userEditModal);
                                } else if (info.key === "logout") {
                                    localStorage.removeItem("token");
                                    message.success("Tizimdan chiqildi");
                                    navigate("/");
                                }
                            },
                        }}
                        trigger={["click"]}>
                        <Avatar
                            style={{
                                cursor: "pointer",
                                border: "1px solid #212121",
                                backgroundColor: "transparent",
                            }}
                            src={UserImage}
                        />
                    </Dropdown>
                </Header>
                <Content style={{ margin: "16px" }}>
                    <Link
                        className='hovered-bg'
                        style={{
                            display: "inline-block",
                            marginBottom: "20px",
                            border: "1px solid #000",
                            borderRadius: "7px",
                            padding: "10px",
                        }}
                        to='/about-gwm/haval-v-uzbekistane/how-become-dealer'>
                        Shartnoma qo'shish
                    </Link>
                    <div
                        style={{
                            display: "inline-block",
                            marginLeft: "10px",
                            border: "1px solid #000",
                            borderRadius: "8px",
                        }}>
                        <ReloadOutlined
                            style={{
                                padding: "10px",
                            }}
                            spin={loader}
                            onClick={fetchUserContracts}
                        />
                    </div>

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
                            <ReloadOutlined spin size='large' />
                        </div>
                    ) : (
                        <div>
                            <div style={headerStyle}>
                                <div style={cellStyle(250)}>
                                    <strong>To'liq ism, familiya</strong>
                                </div>
                                <div style={cellStyle(360)}>
                                    <strong>Shartnomani nomi</strong>
                                </div>
                                <div style={cellStyle()}>
                                    <strong>Shartnomani statusi</strong>
                                </div>
                                <div style={cellStyle()}>
                                    <strong>PDFni yuklab olish</strong>
                                </div>
                            </div>

                            {contracts?.length > 0 ? (
                                contracts.map(
                                    (contract) =>
                                        contract &&
                                        contract._id && (
                                            <div
                                                key={contract._id}
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#fafafa",
                                                    borderBottom:
                                                        "1px solid #ddd",
                                                    marginTop: "10px",
                                                }}>
                                                <div style={cellStyle(250)}>
                                                    {contract.fullname}
                                                </div>
                                                <div style={cellStyle(360)}>
                                                    {contract.filename}
                                                </div>
                                                <div style={cellStyle()}>
                                                    {contract.status}
                                                </div>
                                                <div style={cellStyle()}>
                                                    <Button
                                                        loading={loadPDF}
                                                        onClick={() =>
                                                            downloadPdf(
                                                                contract.url
                                                            )
                                                        }
                                                        className='hovered-bg'
                                                        style={{
                                                            display:
                                                                "inline-block",
                                                            flex: "0 0 110px",
                                                            padding: "7px 10px",
                                                            border: "1px solid #000",
                                                            borderRadius: "7px",
                                                            fontSize: "13px",
                                                        }}>
                                                        Yuklab olish{" "}
                                                        <DownloadOutlined />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                )
                            ) : (
                                <h1
                                    style={{
                                        textAlign: "center",
                                        marginTop: "70px",
                                    }}>
                                    Shartnomalar yoq <FileUnknownOutlined />
                                </h1>
                            )}
                        </div>
                    )}
                    <Modal
                        open={userEditModal}
                        onCancel={() => setUserEditModal(!userEditModal)}
                        onOk={userEditFunc}>
                        <Form onFinish={userEditFunc}>
                            <h3>{userID}</h3>
                            <Form.Item label='Ism' name='name'>
                                <Input />
                            </Form.Item>

                            <Form.Item label='Email' name='email'>
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserPage;
