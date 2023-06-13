'use client';
import React from 'react';
import 'antd/dist/antd.css';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { LockOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

const Login = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        const { email, password } = values;
        const params = JSON.stringify({ email, password });
        const res = await fetch('/api/login', {
            method: 'POST',
            body: params,
        });
        // 获取接口返回的内容
        let response = await res.json();
        if (response?.success === true) {
            
            localStorage.setItem('token', response?.data._id);
            localStorage.setItem('username', response?.data.username);
            localStorage.setItem('avatar',response?.data.avatarUrl);
            router.push('/');
        } else {
            message.error(response.message);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>登录</div>
                <div className={styles.form}>
                    <Form name="normal_login" onFinish={onFinish}>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<GithubOutlined className="site-form-item-icon" />}
                                placeholder="邮箱"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className={styles.btn}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
