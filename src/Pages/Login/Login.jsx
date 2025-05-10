import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const { Title, Text } = Typography;

const Login = () => {
    const [onClick, setOnClick] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        document.title = "Haval | Login";
    }, []);

    const handleSubmit = async (values) => {
        setOnClick(true);
        try {
            const response = await axios.post(
                "https://haval-uz.onrender.com/loginUser",
                { email: values.email, password: values.password },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data?.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userID", response.data.userId);
                toast.success("Siz muvaffaqiyatli tizimga kirdingiz");
                navigate("/user", { replace: true });
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    `Xatolik yuz berdi: ${error?.response?.data?.error}`
            );
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
                    form={form}
                    className='login-form'
                    name='login'
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}>
                    <Form.Item
                        label='Пользователь'
                        name='email'
                        rules={[
                            { required: true, message: "Введите ваш логин!" },
                            {
                                type: "email",
                                message: "Введите правильный email!",
                            },
                        ]}>
                        <Input
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
                        <Link
                            to='/registration'
                            style={{ textDecoration: "underline" }}>
                            Регистратция
                        </Link>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-button'
                            loading={onClick}>
                            Вход
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
