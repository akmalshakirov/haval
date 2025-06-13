import {
    LockOutlined,
    ScheduleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

const { Title, Text } = Typography;

const Registration = () => {
    const [email, setEmail] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");
    const [onClick, setOnClick] = useState(false);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleShowPassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    useEffect(() => {
        document.title = "LIMON-AUTO | Register";
    }, []);

    const handleSubmit = async () => {
        if (name === "" && email === "" && inputPasswordValue === "") {
            return toast.error("Заполните все поля");
        }
        setOnClick(true);
        try {
            const response = await axios.post(
                "https://haval-uz.onrender.com/register",
                { name, email, password: inputPasswordValue },
                { headers: { "Content-Type": "application/json" } }
            );
            toast.success(response.data.message);
            navigate("/login", { replace: true });
        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                toast.warning("Server ishlamayotgan bo'lishi mumkin");
            } else if (error.response && error.response.data) {
                toast.error(
                    (error.response.data && error.response.data.error) ||
                        error.response.data.error[0] ||
                        error.response.data.error
                );
            }
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <Link
                            to='/login'
                            style={{ textDecoration: "underline" }}>
                            Войти
                        </Link>
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
