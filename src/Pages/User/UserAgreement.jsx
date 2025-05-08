import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    FieldTimeOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./UserAgreement.css";

const UserAgreement = ({ data, theme }) => {
    const [loadingStates, setLoadingStates] = useState({});
    const paidAgreements = data.filter((s) => s.status === "Paid").length;
    const pendingAgreements = data.filter((s) => s.status === "Pending").length;
    const canceledAgreements = data.filter(
        (s) => s.status === "Cancelled"
    ).length;

    const downloadPDF = async (fileUrl, id) => {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
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
            toast.error(error.message || "PDFni yuklab olishda xatolik");
        } finally {
            setLoadingStates((prev) => ({ ...prev, [id]: false }));
        }
    };
    return (
        <>
            <ToastContainer limit={3} />
            <div
                style={{
                    marginBottom: "30px",
                }}>
                <Link
                    to='/models'
                    style={{
                        border: "1px solid",
                        padding: "7px",
                        borderRadius: "5px",
                        display: "inline-block",
                        color: theme === "To'q ko'k" ? "inherit" : "#000",
                        borderColor: theme === "To'q ko'k" ? "#ccc" : "#000",
                    }}>
                    Shartnoma olish
                </Link>
            </div>
            <div className='user-main-cards'>
                <div className='user-main-card'>
                    <div>
                        <PieChartOutlined />
                        Jami shartnomalarim: <b>{data.length}</b>
                    </div>
                </div>
                {/* PAID */}
                <div
                    className='user-main-card paid'
                    style={{
                        backgroundColor:
                            theme === "Oq" ? "#1ca70a52" : "#09363b",
                    }}>
                    <div>
                        <CheckCircleOutlined />
                        To'langan:{" "}
                        <b>{paidAgreements ? paidAgreements : "Yo'q"}</b>
                    </div>
                </div>
                {/* PENDING */}
                <div
                    className='user-main-card pending'
                    style={{
                        backgroundColor:
                            theme === "Oq" ? "#ff990067" : "#e79d2e2d",
                    }}>
                    <div>
                        <FieldTimeOutlined />
                        Kutilayotgan:{" "}
                        <b>{pendingAgreements ? pendingAgreements : "Yo'q"}</b>
                    </div>
                </div>
                {/* CANCELED */}
                <div
                    className='user-main-card canceled'
                    style={{
                        backgroundColor:
                            theme === "Oq" ? "#ff00008c" : "#ff00004d",
                    }}>
                    <div>
                        <CloseCircleOutlined />
                        Bekor qilingan:{" "}
                        <b>
                            {canceledAgreements ? canceledAgreements : "Yo'q"}
                        </b>
                    </div>
                </div>
            </div>
            <div className='user-main-wrapper'>
                <main
                    className='user-main'
                    style={{
                        color: theme === "To'q ko'k" ? "inherit" : "#000",
                    }}>
                    <table className='user-main-table'>
                        <thead className='user-main-head'>
                            <tr className='user-main-tr'>
                                <th
                                    style={{
                                        padding: "8px",
                                    }}>
                                    To'liq ism, familiya
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                    }}>
                                    Status
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                    }}>
                                    Telefon raqam
                                </th>
                                <th>Model</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='user-main-body'>
                            {Array.isArray(data) && data.length > 0 ? (
                                data.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.fullname}</td>
                                        <td
                                            className={`user-main-body-status ${item.status}`}>
                                            <span>{item.status}</span>
                                        </td>
                                        <td>{item.phone}</td>
                                        <td>{item.model}</td>
                                        <td>
                                            <button
                                                disabled={
                                                    loadingStates[item._id]
                                                }
                                                onClick={() =>
                                                    downloadPDF(
                                                        item.url,
                                                        item._id
                                                    )
                                                }
                                                style={{
                                                    color:
                                                        theme === "To'q ko'k"
                                                            ? "#fff"
                                                            : "#000",
                                                    borderColor:
                                                        theme === "To'q ko'k"
                                                            ? "#fff"
                                                            : "#242424",
                                                }}>
                                                {loadingStates[item._id] ? (
                                                    <>
                                                        Yuklanmoqda{" "}
                                                        <Spin size='small' />
                                                    </>
                                                ) : (
                                                    "PDFni yuklab olish"
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan='5'
                                        style={{
                                            textAlign: "center",
                                            padding: "20px",
                                        }}>
                                        Ma'lumotlar yo'q
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};

export default UserAgreement;
