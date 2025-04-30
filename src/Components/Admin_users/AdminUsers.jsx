import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminUsers.css";
import { toast } from "react-toastify";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const token = localStorage.getItem("authToken");
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const resposne = await axios.get("http://localhost:3000/users", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(resposne.data);
            console.log("Kelgan ma'lumotlar (users)", resposne.data);
        } catch (error) {
            console.log(error);
            message.error(error.data?.message);
        } finally {
            setLoading(false);
        }
    };

    async function deleteUser(id) {
        setLoadingStates((prev) => ({ ...prev, [id]: true }));
        try {
            const resposne = await axios.delete(
                `http://localhost:3000/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (resposne.status === 200) {
                toast.success(resposne.data && resposne.data.message);
            } else {
                toast.error(resposne.statusText, resposne.data);
            }
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
            <h1 style={{ marginBottom: "20px" }}>Users</h1>
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
                        <div style={{ flex: "0 0 200px" }}>
                            <strong>Name:</strong>
                        </div>
                        <div style={{ flex: "0 0 200px" }}>
                            <strong>Email:</strong>
                        </div>
                        <div
                            style={{
                                flex: "0 0 200px",
                            }}>
                            <strong>Shartnomalari:</strong>
                        </div>
                        <div>
                            <strong>Harakat:</strong>
                        </div>
                    </div>
                    {users.map((user, index) => (
                        <div
                            key={user.id || index}
                            style={{ display: "flex", margin: "7px 0" }}>
                            <div style={{ flex: "0 0 200px" }}>
                                <span>{user.name}</span>
                            </div>
                            <div style={{ flex: "0 0 200px" }}>
                                <span>{user.email}</span>
                            </div>
                            <div style={{ flex: "0 0 200px" }}>
                                {user.orders.length}
                            </div>
                            <Button
                                danger
                                loading={loadingStates}
                                disabled={loadingStates}
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
