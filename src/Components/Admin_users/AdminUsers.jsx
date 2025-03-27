import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <div>
            {/* {loading ? (
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
            ) : ( */}
            <h1 style={{ marginBottom: "20px" }}>Users</h1>
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
                    <button className='users-card-button'>O'chirish</button>
                </div>
            ))}
            {/* )} */}
        </div>
    );
}

export default AdminUsers;
