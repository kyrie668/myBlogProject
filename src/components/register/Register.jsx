'use client';
import React from 'react';
import 'antd/dist/antd.css';

import styles from './register.module.css';
import { LockOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'next/link';


const Register = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>注册</div>
                <div className={styles.form}>
                    <Form
                        name="normal_login"
                        onFinish={onFinish}
                    >
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
                                prefix={<UserOutlined  className="site-form-item-icon" />}
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
                            <Button type="primary" htmlType="submit"  className={styles.btn}>
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
