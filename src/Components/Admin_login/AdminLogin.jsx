import React from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import "./AdminLogin.css";

const { Title, Text } = Typography;

const AdminLogin = () => {
    const onFinish = (values) => {
        console.log("Submitted values:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label='Пользователь'
                        name='username'
                        rules={[
                            { required: true, message: "Введите ваш логин!" },
                        ]}>
                        <svg
                            className='admin-login-name-icon'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'>
                            <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                        </svg>

                        <Input
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
                        <Input.Password placeholder='********' />
                    </Form.Item>

                    <Form.Item name='remember' valuePropName='checked'>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='admin-login-button'>
                            Вход в админ-панель
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AdminLogin;
