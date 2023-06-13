'use client';
import React, { useState, useEffect } from 'react';
import styles from './editBlog.module.css';
import { useRouter } from 'next/navigation';

import { LockOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Upload, Select, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const fs = require('fs');
const path = require('path');

const EditBlog = (props) => {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(async (values) => {
            const { title, desc, category } = values;
            const curId = localStorage.getItem('token');
            const params = JSON.stringify({
                title,
                desc,
                category,
                curId,
            });
            setLoading(true);
            const res = await fetch(`/api/blog/${props.params.id}`, {
                method: 'PUT',
                body: params,
                headers: {
                    token: curId,
                },
            });
            // 获取接口返回的内容
            let response = await res.json();
            if (response?.success === true) {
                router.push(`/blog/${response?.data?._id}`);
            } else {
                message.error(response.message);
                setLoading(false);
            }
        });
    };

    // 获取博客详情
    const getBlogDetails = async () => {
        setPageLoading(true);
        const res = await fetch(`/api/blog/${props.params.id}`, { cache: 'no-cache' });
        let response = await res.json();
        form.setFieldsValue(response?.data);
        // 更新状态
        setPageLoading(false);
    };

    // 获取博客内容，填充表单
    useEffect(() => {
        getBlogDetails();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>编辑博客</h2>
                {pageLoading ? (
                    <Spin style={{ width: '100%' }}></Spin>
                ) : (
                    <>
                        <Form name="normal_publish" form={form}>
                            <Form.Item
                                name="title"
                                label="标题"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入标题!',
                                    },
                                ]}
                            >
                                <Input placeholder="标题" />
                            </Form.Item>
                            <Form.Item
                                name="desc"
                                label="描述"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入描述!',
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder="描述" rows={4} />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                label="类型"
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择分类!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="类型"
                                    rows={4}
                                    options={[
                                        { label: 'React', value: 'React' },
                                        { label: 'Vue', value: 'Vue' },
                                        { label: 'Angular', value: 'Angular' },
                                        { label: 'Flutter', value: 'Flutter' },
                                        { label: 'JavaScript', value: 'JavaScript' },
                                    ]}
                                />
                            </Form.Item>
                        </Form>

                        <div className={styles.btnlist}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.btn}
                                onClick={onFinish}
                                loading={loading}
                            >
                                修改
                            </Button>
                            <Button
                                className={styles.btn}
                                onClick={() => {
                                    router.push('/');
                                }}
                            >
                                取消
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditBlog;
