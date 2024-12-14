import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import "./AdminLogin.css";
import axios from "axios";

const { Title, Text } = Typography;

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setInputPasswordValue(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "https://192.168.0.111/login",
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

            console.log("Login successful:", response.data);
        } catch (error) {
            console.error("Login failed:", error);
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
                        ]}>
                        <Input
                            value={email}
                            onChange={handleChange}
                            type='email'
                            placeholder='john@doe.com'
                            className='admin-login-name-input'
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
                            onChange={handleChangePassword}
                            placeholder='********'
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
