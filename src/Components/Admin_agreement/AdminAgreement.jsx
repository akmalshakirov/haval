import { FileUnknownOutlined } from "@ant-design/icons";
import { Button, Pagination, Spin } from "antd";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./AdminAgreement.css";

function AdminAgreement() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [allContracts, setAllContracts] = useState([]);
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    const token = localStorage.getItem("authToken");

    const fetchAllContracts = async () => {
        try {
            setLoader(true);
            if (!token) {
                navigate("/");
                return;
            }
            const response = await axios.get("http://localhost:3000/orders", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setAllContracts(response.data.orders || []);
        } catch (error) {
            toast.error("Shartnomalarni yuklashda xato yuz berdi.");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchAllContracts();
    }, []);

    const sortedContracts = useMemo(() => {
        return allContracts.slice().reverse();
    }, [allContracts]);

    const paginatedContracts = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedContracts.slice(start, start + pageSize);
    }, [sortedContracts, currentPage]);

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
        marginLeft: "15px",
    });

    const makePayment = async (id) => {
        setIsLoadingBtn(true);
        try {
            const formData = new FormData();
            formData.append("id", id);
            const response = await axios.post(
                `http://localhost:3000/orders-pay`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Shartnomani statusi Paid ga o'zgardi");
                await fetchAllContracts();
            } else if (response.status === 400) {
                toast.warning(
                    "Shartnomani statusi allaqachon Paid ga o'zgartirilgan"
                );
            }
        } catch (error) {
            toast.error("To'lovni amalga oshirishda xato yuz berdi.");
        } finally {
            setIsLoadingBtn(false);
        }
    };

    return (
        <div className='admin-agreement'>
            <ToastContainer />
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
                    <Spin size='large' />
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            marginBottom: "20px",
                        }}>
                        <h2>Barcha shartnomalar</h2>
                    </div>

                    <div style={headerStyle}>
                        <div style={cellStyle()}>
                            <strong>To'liq ism, familiya</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Email</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Shartnoma nomi</strong>
                        </div>
                        <div style={cellStyle()}>
                            <strong>Status</strong>
                        </div>
                        <div style={cellStyle()}></div>
                    </div>

                    {allContracts.length > 0 ? (
                        paginatedContracts.map((contract) => (
                            <div
                                className='contract-card'
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
                                    <Button
                                        loading={isLoadingBtn}
                                        onClick={() =>
                                            makePayment(contract._id)
                                        }
                                        style={{
                                            marginRight: "10px",
                                            fontSize: "14px",
                                        }}>
                                        To'lash
                                    </Button>
                                    <Button
                                        danger
                                        style={{ marginRight: "10px" }}>
                                        O'chirish
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 style={{ textAlign: "center", marginTop: "70px" }}>
                            Shartnomalar yo'q <FileUnknownOutlined />
                        </h1>
                    )}

                    {allContracts.length > pageSize && (
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={allContracts.length}
                                onChange={(page) => setCurrentPage(page)}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminAgreement;
