import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import "./AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");
    const navigate = useNavigate();
    const [onClick, setOnClick] = useState(false);
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleShowPassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    useEffect(() => {
        document.title = "Haval | Admin Login";
    }, []);

    const handleSubmit = async () => {
        setOnClick(true);
        try {
            const response = await axios.post(
                // "https://haval-uz.onrender.com/login",
                "http://localhost:3000/login-Admin",
                { email, password: inputPasswordValue },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data?.token) {
                localStorage.setItem("authToken", response.data.token);
                message.success("Admin panelga muvaffaqiyatli kirildi!");
                navigate("/admin");
            } else if (response.status === 500) {
                message.error(response.error);
            } else {
                message.error("Username yoki password noto'g'ri!");
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                message.warning("Server o'chiq bo'lishi mumkin");
            } else {
                message.error("Username yoki password noto'g'ri!");
            }
        } finally {
            setOnClick(false);
        }
    };

    return (
        <div className='admin-login-container'>
            <Card className='admin-login-card'>
                <Title level={4} className='admin-login-title'>
                    Войдите в свой аккаунт
                </Title>
                <Text className='admin-login-text'>Ваши учетные данные</Text>
                <Form
                    className='admin-login-form'
                    name='login'
                    layout='vertical'
                    initialValues={{ remember: true }}>
                    <Form.Item
                        label='Пользователь'
                        name='admin'
                        rules={[
                            { required: true, message: "Введите ваш логин!" },
                            {
                                type: "email",
                                message: "Введите правильный email!",
                            },
                        ]}>
                        <Input
                            value={email}
                            onChange={handleChange}
                            type='email'
                            placeholder='john@doe.com'
                            className='admin-login-name-input'
                            prefix={
                                <UserOutlined className='admin-login-name-icon' />
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label='Пароль'
                        name='password'
                        rules={[
                            { required: true, message: "Введите ваш пароль!" },
                        ]}>
                        <Input.Password
                            value={inputPasswordValue}
                            onChange={handleShowPassword}
                            className='admin-login-password-input'
                            placeholder='********'
                            prefix={
                                <LockOutlined className='admin-login-password-icon' />
                            }
                        />
                    </Form.Item>

                    <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='admin-login-button'
                            loading={onClick}
                            onClick={handleSubmit}>
                            Вход в админ-панель
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
