import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, message } from "antd";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    UserOutlined,
    LockOutlined,
    ScheduleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Registration = () => {
    const [email, setEmail] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");
    const [onClick, setOnClick] = useState(false);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleShowPassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    useEffect(() => {
        document.title = "Haval Register";
    }, []);

    const handleSubmit = async () => {
        if (username === "" && email === "" && inputPasswordValue === "") {
            return message.error("Заполните все поля");
        }
        setOnClick(true);
        try {
            const response = await axios.post(
                // "https://haval-uz.onrender.com/register",
                "http://localhost:3000/register",
                { username, email, password: inputPasswordValue },
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.status === 200 && response.data?.token) {
                localStorage.setItem("authToken", response.data.token);
                message.success("Shaxsiz kabinetga muvaffaqiyatli kirildi!");
                navigate("/user");
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
        <div className='register-container'>
            <Card className='register-card'>
                <Title level={4} className='register-title'>
                    Регистрация
                </Title>
                <Text className='register-text'>Создайте аккаунт</Text>
                <Form
                    className='register-form'
                    name='register'
                    layout='vertical'
                    initialValues={{ remember: true }}>
                    <Form.Item
                        name='username'
                        label='Имя'
                        className='register-name-input'
                        rules={[
                            { required: true, message: "Не возможно!" },
                            {
                                type: "string",
                                message: "Введите правильный имя!",
                            },
                        ]}>
                        <Input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            prefix={
                                <ScheduleOutlined className='register-username-icon' />
                            }
                        />
                    </Form.Item>
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
                            className='register-name-input'
                            prefix={
                                <UserOutlined className='register-name-icon' />
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
                            className='register-password-input'
                            prefix={
                                <LockOutlined className='register-password-icon' />
                            }
                        />
                    </Form.Item>

                    <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <p style={{ fontSize: "14px" }}>
                            У вас уже есть аккаунта?
                        </p>
                        <a
                            href='/login'
                            style={{ textDecoration: "underline" }}>
                            Войти
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='register-button'
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

export default Registration;
