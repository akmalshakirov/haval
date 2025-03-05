import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
    const [email, setEmail] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");
    const [onClick, setOnClick] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleShowPassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    useEffect(() => {
        document.title = "Haval | Login";
    }, []);

    const handleSubmit = async () => {
        setOnClick(true);
        try {
            const response = await axios.post(
                // "https://haval-uz.onrender.com/loginUser",
                "http://localhost:3000/loginUser",
                { email, password: inputPasswordValue },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data?.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                message.error("Username yoki password noto'g'ri!");
            }
        } catch (error) {
            message.error("Username yoki password noto'g'ri!");
        } finally {
            setOnClick(false);
        }
    };

    return (
        <div className='login-container'>
            <Card className='login-card'>
                <Title level={4} className='login-title'>
                    Войдите в свой аккаунт
                </Title>
                <Text className='login-text'>Ваши учетные данные</Text>
                <Form
                    className='login-form'
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
                            className='login-name-input'
                            prefix={
                                <UserOutlined className='login-name-icon' />
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
                            className='login-password-input'
                            prefix={
                                <LockOutlined className='login-password-icon' />
                            }
                        />
                    </Form.Item>

                    <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <p style={{ fontSize: "14px" }}>
                            У вас ещё нет аккаунта?
                        </p>
                        <a
                            href='/registration'
                            style={{ textDecoration: "underline" }}>
                            Регистратция
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-button'
                            loading={onClick}
                            onClick={handleSubmit}>
                            Вход
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
