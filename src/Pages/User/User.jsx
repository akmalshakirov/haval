import "./User.css";
import { Avatar, Button, Input, Layout, message, Spin } from "antd";
import {
    CheckCircleOutlined,
    CloseOutlined,
    DashboardOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FieldTimeOutlined,
    LogoutOutlined,
    PieChartOutlined,
    SearchOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Ripple from "../../Utils/Ripple";
import UserEditProfile from "./UserEditProfile";

const { Sider, Header, Content } = Layout;

function UserPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    const [selectedSidebarMenu, setSelectedSidebarMenu] = useState("1");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [selectedAgreement, setSelectedAgreement] = useState(null);
    const [downloadBtnLoading, setDownloadBtnLoading] = useState(false);
    const [deletingBtnLoading, setDeletingBtnLoading] = useState(false);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);
    const [agreements, setAgreements] = useState([]);

    const totalAgreements = agreements.length;
    const activeAgreements = agreements.filter(
        (c) => c.status === "Paid"
    ).length;
    const pendingAgreements = agreements.filter(
        (c) => c.status === "Pending"
    ).length;
    const cancelledAgreements = agreements.filter(
        (c) => c.status === "Cancelled"
    ).length;

    // USER'S DATA
    const fetchUserData = async () => {
        try {
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }
            const response = await axios.get(
                `http://localhost:3000/profil/${userID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response?.data) {
                setUserData({
                    name: response.data.name,
                    email: response.data.email,
                });
                setAgreements(response.data.orders);
            }
        } catch (error) {
            const response = error.response;
            if (error.code === "ERR_NETWORK") {
                return message.warning("Server o'chiq bo'lishi mumkin");
            } else if (response.status === 401) {
                message.info("Token vaqti tugagan!");
            } else {
                console.log(error);
                message.error(`Xatolik yuz berdi: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = (status) => {
        if (status === "Pending") {
            return "Pending (kutilmoqda)";
        } else if (status === "Paid") {
            return "Paid (to'langan)";
        } else if (status === "Cancelled") {
            return "Canceled (bekor qilingan)";
        }
        return status;
    };

    useEffect(() => {
        document.title = "HAVAL | Shaxsiy kabinet";
        fetchUserData();
    }, []);

    const deleteFunc = async () => {
        setDeletingBtnLoading(true);
        try {
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }
            const response = await axios.delete(
                `http://localhost:3000/orders/${selectedAgreement._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                await fetchUserData();
                message.success("Shartnoma muvaffaqiyatli o'chirildi");
                isVisibleModal(false);
                selectedAgreement(null);
            }
        } catch (error) {
            if (error.code === "ERR_CONNECTION_REFUSED") {
                return message.warning(
                    "Server o'chiq bo'lishi mumkin, keyinroq urinib ko'ring"
                );
            } else {
                console.log(error);
                message.error("Shartnomani o'chirishda xatolik yuz berdi");
            }
        } finally {
            setDeletingBtnLoading(false);
        }
    };
    // EDIT FUNCTION
    // const editFunc = () => {
    //     return alert("EDIT!");
    // };
    // DELETE FUNCTION

    const shortText = (e) => {
        if (e.length > 15) {
            return e.slice(0, 15) + "...";
        } else {
            return e;
        }
    };

    // LOG-OUT FUNCTION
    const handleLogOut = () => {
        localStorage.removeItem("token");
        message.success("Shaxsiy kabinetdan chiqildi");
        navigate("/");
    };

    // downloadPDF FUNCTION
    const downloadPDF = async (fileUrl) => {
        setDownloadBtnLoading(true);
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
            setDownloadBtnLoading(false);
        }
    };

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
                                    style={{ backgroundColor: "transparent" }}
                                    size={64}
                                    icon={
                                        <UserOutlined
                                            style={{ fontSize: "54px" }}
                                        />
                                    }
                                />
                                {/* <div
                                    style={{
                                        fontSize: "30px",
                                        border: "1px solid #ccc",
                                        borderRadius: "10px",
                                        padding: "0 13px",
                                        backgroundColor: "#444",
                                    }}>
                                    {userData.name.charAt(0) || "A"}
                                </div> */}
                                <h3>Ism: {loading ? "USER" : userData.name}</h3>
                                <p>
                                    Email:{" "}
                                    {loading
                                        ? "USER@GMAIL.COM"
                                        : userData.email}
                                </p>
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
                            <Ripple
                                style={{ width: "100%" }}
                                onClick={() => setSelectedSidebarMenu("1")}>
                                <DashboardOutlined
                                    style={{ marginRight: "7px" }}
                                />
                                Shartnomalarim
                            </Ripple>
                            <Ripple
                                style={{ width: "100%" }}
                                onClick={() => setSelectedSidebarMenu("2")}>
                                <EditOutlined style={{ marginRight: "7px" }} />
                                Profilim
                            </Ripple>
                            <div onClick={handleLogOut}>
                                <LogoutOutlined
                                    style={{ marginRight: "7px" }}
                                />
                                Chiqish
                            </div>
                        </div>
                    </div>
                </Sider>

                <Layout className='user-page-main'>
                    <Header className='user-page-header'>
                        <div style={{ marginLeft: "20px", color: "#fff" }}>
                            <Link to='/' style={{ marginRight: "5px" }}>
                                Bosh sahifa
                            </Link>
                            {">"}
                            <Link to='/user' style={{ marginLeft: "5px" }}>
                                Shaxsiy kabinet
                            </Link>
                        </div>
                    </Header>

                    {/* loading */}
                    {loading ? (
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
                        <Content>
                            <h2 style={{ color: "#fff", marginLeft: "30px" }}>
                                Mening shartnomalarim:
                            </h2>
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
                                            <h2>{totalAgreements}</h2>
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
                                            <h2>{activeAgreements}</h2>
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
                                            <h2>{pendingAgreements}</h2>
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
                                            <h2>{cancelledAgreements}</h2>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to='/about-gwm/haval-v-uzbekistane/how-become-dealer'
                                    className='add-agreement'>
                                    Shartnoma qo'shish
                                </Link>
                            </div>

                            <div className='agreements'>
                                <div className='agreement-cards'>
                                    {agreements &&
                                        agreements.map((agreement) => (
                                            <div
                                                className='agreement-card'
                                                key={agreement._id}
                                                onClick={() => {
                                                    setSelectedAgreement(
                                                        agreement
                                                    );
                                                    setIsVisibleModal(true);
                                                }}>
                                                <div>
                                                    <h1>
                                                        {shortText(
                                                            agreement.fullname
                                                        )}
                                                    </h1>
                                                </div>
                                                <div>
                                                    <p>{agreement.filename}</p>
                                                </div>
                                                <div>
                                                    <p
                                                        className={`agreement-card-status ${agreement.status}`}>
                                                        {agreement.status}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                {/* selectedAgreement */}
                                <div
                                    className={`custom-modal-overlay ${
                                        isVisibleModal ? "visible" : "closed"
                                    }`}
                                    onClick={() => {
                                        setIsVisibleModal(false);
                                        setSelectedAgreement(null);
                                    }}>
                                    <div
                                        className='custom-modal'
                                        onClick={(e) => e.stopPropagation()}>
                                        <span
                                            className='custom-modal-close-btn'
                                            onClick={() => {
                                                setIsVisibleModal(false);
                                                setSelectedAgreement(null);
                                            }}>
                                            <CloseOutlined />
                                        </span>
                                        <h1 style={{ marginBottom: "20px" }}>
                                            Shartnoma haqida to'liq ma'lumot
                                        </h1>
                                        <div className='custom-modal-info'>
                                            <p>
                                                Ism, familiya:{" "}
                                                <b>
                                                    {
                                                        selectedAgreement?.fullname
                                                    }
                                                </b>
                                            </p>
                                            <p>
                                                Shartnoma nomi:{" "}
                                                <b>
                                                    {
                                                        selectedAgreement?.filename
                                                    }
                                                </b>
                                            </p>
                                            <p>
                                                Telefon raqam:{" "}
                                                <b>
                                                    {selectedAgreement?.phone}
                                                </b>
                                            </p>
                                            <div>
                                                <p>
                                                    Model:{" "}
                                                    <b>
                                                        {
                                                            selectedAgreement?.model
                                                        }
                                                    </b>
                                                </p>
                                                <p>
                                                    Avtomobil rangi:{" "}
                                                    <b>
                                                        {
                                                            selectedAgreement?.color
                                                        }
                                                    </b>
                                                </p>
                                                <p>
                                                    To'lov turi:{" "}
                                                    <b>
                                                        {
                                                            selectedAgreement?.payment
                                                        }
                                                    </b>
                                                </p>
                                                <p>
                                                    Avtomobil transmissiyasi:{" "}
                                                    <b>
                                                        {
                                                            selectedAgreement?.transmission
                                                        }
                                                    </b>
                                                </p>
                                                <p>
                                                    Status:{" "}
                                                    <b>
                                                        {checkStatus(
                                                            selectedAgreement?.status
                                                        )}
                                                    </b>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='agreement-card-action-menu'>
                                            <button
                                                disabled={downloadBtnLoading}
                                                onClick={() =>
                                                    downloadPDF(
                                                        selectedAgreement?.url
                                                    )
                                                }>
                                                {downloadBtnLoading ? (
                                                    <>
                                                        Yuklanmoqda...
                                                        <Spin />
                                                    </>
                                                ) : (
                                                    "PDFni yuklash"
                                                )}
                                            </button>
                                            <button
                                                onClick={deleteFunc}
                                                disabled={deletingBtnLoading}>
                                                {deletingBtnLoading
                                                    ? "O'chirilmoqda..."
                                                    : "O'chirish"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    )}
                </Layout>
            </Layout>
        </div>
    );
}

export default UserPage;
