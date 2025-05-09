import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminLogin.css";

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
                "https://haval-uz.onrender.com/login-Admin",
                { email, password: inputPasswordValue },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data?.token) {
                toast.success(response.data.message);
                localStorage.setItem("authToken", response.data.token);
                navigate("/admin");
            } else if (response.status === 500 || response.status === 400) {
                toast.error(response.error);
            }
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                toast.warning("Server ishlamayotgan bo'lishi mumkin");
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                toast.error(error.response.data.error);
            } else if (error.status === 429) {
                toast.error(
                    "Juda ko'p so'rov yubordingiz, keyinroq urinib ko'ring!"
                );
            } else {
                toast.error(error.status);
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
                    onFinish={handleSubmit}
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
                            loading={onClick}>
                            Вход в админ-панель
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
