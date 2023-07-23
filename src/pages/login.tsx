import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { handleLogin } from '@/services/api'
import { useRouter } from 'next/router';
import { ROUTER } from '@/constants';
import { useAuthStore } from '@/store/authstorage';

// tuanpha.it@gmail.com
// admin@123
const LoginPage = () => {
    const router = useRouter();
    const { token,  setToken } = useAuthStore((state) => state);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values: { email: string, password: string }) => {
        setLoading(true)
        alert('Received values of form: ' + JSON.stringify(values));
        const res = await handleLogin(values);

        if (res) {
            setToken(res?.token, {email: values.email});
            message.success("Login successful")
            router.push(ROUTER.DASHBOARD);
        }

        setLoading(false)
    };

    useEffect(() => {
        if (token) {
            router.push(ROUTER.DASHBOARD);
        }
    }, [])


    return (
        <div className='container mx-auto h-screen center'>
            <Form
                name="normal_login"
                className="w-[300px] bg-white rounded-lg shadow-md p-6"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item className='col gap-4 center text-center'>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <div className='mt-6'>
                        Or <a href="">register now!</a>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );

};
export default LoginPage