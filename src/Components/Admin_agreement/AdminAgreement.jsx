import axios from "axios";
import "./AdminAgreement.css";
import { Button, message } from "antd";
import { ReloadOutlined, FileUnknownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminAgreement() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const token = localStorage.getItem("token");
    // const [loadPDF, setLoadPDF] = useState(false);
    const [allContracts, setAllContracts] = useState([]);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);

    const fetchAllContracts = async () => {
        try {
            setLoader(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/");
                message.error("Bu sahifa faqat adminlar uchun!");
                return;
            }
            const response = await axios.get("http://localhost:3000/orders", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllContracts(response.data.orders);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    // const downloadPdf = async (fileUrl) => {
    //     setLoadPDF(true);
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
    //         console.log(error);
    //     } finally {
    //         setLoadPDF(false);
    //     }
    // };

    useEffect(() => {
        fetchAllContracts();
    }, []);

    const headerStyle = {
        display: "flex",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        borderRadius: "10px 10px 0 0",
        padding: "7px",
    };

    const cellStyle = (width) => ({
        flex: width ? `0 0 ${width}px` : 1,
        display: "flex",
        padding: "10px",
        alignItems: "center",
    });

    const makePayment = async (id) => {
        setIsLoadingBtn(false);
        try {
            const response = await axios.post(
                `http://localhost:3000/orders-pay/${id}`,
                id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            message.error(error);
            console.log(error);
        } finally {
            setIsLoadingBtn(false);
        }
    };

    return (
        <div className='admin-agreement'>
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}>
                        <h2>Barcha shartnomalar</h2>
                        <div>
                            <ReloadOutlined
                                style={{
                                    padding: "10px",
                                    margin: "5px 0 0 0",
                                }}
                                spin={loader}
                                onClick={fetchAllContracts}
                            />
                        </div>
                    </div>
                    <div style={headerStyle}>
                        <div style={cellStyle()}>
                            <strong>To'liq ism, familiya</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Email</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Shartnomani nomi</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Shartnomani statusi</strong>
                        </div>
                        <div style={cellStyle()}></div>
                    </div>

                    {allContracts && allContracts.length > 0 ? (
                        allContracts.map((contract) => (
                            <div
                                className='contact-card'
                                key={contract._id}
                                style={{
                                    display: "flex",
                                    borderBottom: "1px solid #ddd",
                                    marginTop: "10px",
                                }}>
                                <div style={cellStyle()}>
                                    {contract.fullname}
                                </div>
                                <div style={cellStyle()}>{contract.email}</div>
                                <div style={cellStyle()}>
                                    {contract.filename}
                                </div>
                                <div style={cellStyle()}>{contract.status}</div>
                                <div style={cellStyle()}>
                                    <div>
                                        <Button
                                            style={{ marginRight: "10px" }}
                                            onClick={() => {
                                                makePayment(contract._id);
                                            }}>
                                            {isLoadingBtn
                                                ? "To'lanmoqda..."
                                                : "To'lash"}
                                        </Button>
                                        <Button
                                            danger
                                            style={{ marginRight: "10px" }}>
                                            O'chirish
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{ textAlign: "center", marginTop: "70px" }}>
                            Shartnomalar yo'q <FileUnknownOutlined />
                        </h1>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminAgreement;
