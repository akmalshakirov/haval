import { Button, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const token = localStorage.getItem("authToken");
    const fetchUsers = async () => {
        setLoading(true);
        try {
            if (!token) {
                toast.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const resposne = await axios.get(
                "https://haval-uz.onrender.com/users",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUsers(resposne.data);
        } catch (error) {
            toast.error(error.data?.message);
        } finally {
            setLoading(false);
        }
    };

    async function deleteUser(id) {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            const resposne = await axios.delete(
                `https://haval-uz.onrender.com/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(
                (resposne.data && resposne.data.message) ||
                    "Foydalanuvchi muvaffaqiyatli o'chirildi"
            );
            fetchUsers();
        } catch (error) {
            toast.error(
                error?.resposne?.data?.message || error?.resposne?.data?.error
            );
        } finally {
            setLoadingStates((prev) => ({
                ...prev,
                [id]: false,
            }));
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div>
            <h1 style={{ marginBottom: "20px" }}>Foydalanuvchilar</h1>
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
                <>
                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "1", marginLeft: "10px" }}>
                            <strong>Ism:</strong>
                        </div>
                        <div style={{ flex: "1" }}>
                            <strong>Email:</strong>
                        </div>
                        <div
                            style={{
                                flex: "1",
                            }}>
                            <strong>Shartnomalari:</strong>
                        </div>
                        <div
                            style={{
                                marginRight: "20px",
                            }}>
                            <strong>Harakat:</strong>
                        </div>
                    </div>
                    {users.map((user, index) => (
                        <div
                            className='admin-users-list'
                            key={user.id || index}>
                            <div>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <span>{user.email}</span>
                            </div>
                            <div>{user.orders.length}</div>
                            <Button
                                danger
                                loading={loadingStates[user._id]}
                                disabled={loadingStates[user._id]}
                                className='users-card-button'
                                onClick={() => deleteUser(user._id)}>
                                O'chirish
                            </Button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default AdminUsers;
