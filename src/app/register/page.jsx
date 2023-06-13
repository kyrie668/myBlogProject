'use client';
import React from 'react';
import 'antd/dist/antd.css';
import { useRouter } from 'next/navigation';

import styles from './register.module.css';
import { LockOutlined, GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

const Register = () => {
    const router = useRouter();

    const onFinish = async (values) => {
        const { email, password, username } = values;
         // 获取1-8的随机数,并作为头像名称存入localStorage
         const random = Math.floor(Math.random() * 8 + 1);
        const params = JSON.stringify({ email, password, username,avatarUrl:`${random}.png` });
       
        const res = await fetch('/api/register', {
            method: 'POST',
            body: params,
        });
        // 获取接口返回的内容
        let response = await res.json();
        if (response?.success === true) {
            message.success('注册成功');
            router.push('/login');
        } else {
            message.error(response.message);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>注册</div>
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
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="用户名"
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
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
