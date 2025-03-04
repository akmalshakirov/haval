import { message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                message.error("Token topilmadi, qayta tizimga kiring!");
                return;
            }

            const resposne = await axios.get("http://localhost:3000/users", {
                headers: {
                    "Content-Type": "applicatoin/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers([resposne.data]);
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
            <h1 style={{ marginBottom: "20px" }}>Users:</h1>
            {users.map((user) => (
                <div style={{ display: "flex", gap: " 20px" }}>
                    {/* <p>Name: {user[1].name}</p>
                    <p>Email: {user[1].email}</p> */}
                    <div>
                        <p>Name:</p>
                        <br />
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <p>Email:</p>
                        <br />
                        <span>{user.email}</span>
                    </div>
                </div>
            ))}
            {/* )} */}
        </div>
    );
}

export default AdminUsers;
