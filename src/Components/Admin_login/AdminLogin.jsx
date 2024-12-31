import React, { useState } from "react";
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

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleShowPassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                {
                    email: email,
                    password: inputPasswordValue,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin");
                message.success("Admin panelga muvaffaqiyatli kirildi!");
                const token = response.data.token;
                localStorage.setItem("authToken", token);
            } else {
                message.error("Username yoki password noto'g'ri!");
            }
        } catch (error) {
            message.error("Username yoki password noto'g'ri!");
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
