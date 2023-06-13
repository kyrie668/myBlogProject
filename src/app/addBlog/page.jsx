'use client';
import React, { useState, useEffect } from 'react';
import styles from './addBlog.module.css';
import { useRouter } from 'next/navigation';

import { LockOutlined, GithubOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message, Upload, Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const fs = require('fs');
const path = require('path');

const AddBlog = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [form] = Form.useForm();

    const beforeUpload = async (file) => {
        try {
            // fs.writeFileSync('./座右铭.txt', '三人行，必有我师焉。')
            const res = await fetch('/api/upload', {
                headers: { 'Content-Type': 'application/octet-stream' },
                method: 'POST',
                // body: reader.result,
            });
        } catch (e) {
            console.log(e);
        }
        // return new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.readAsArrayBuffer(file);
        //     reader.onload = async () => {
        //         // const xhr = new XMLHttpRequest();
        //         // xhr.open('POST', '/api/upload');
        //         // xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        //         // xhr.onreadystatechange = () => {
        //         //     if (xhr.readyState === 4) {
        //         //         if (xhr.status === 200) {
        //         //             message.success('上传成功');
        //         //             resolve();
        //         //         } else {
        //         //             message.error('上传失败');
        //         //             reject();
        //         //         }
        //         //     }
        //         // };
        //         // xhr.send(reader.result);
        //         const res = await fetch('/api/upload', {
        //             headers:{'Content-Type':'application/octet-stream'},
        //             method: 'POST',
        //             body: reader.result,
        //         });
        //     };
        // });
        // const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
        // if (!isJpgOrPng) {
        //     message.error('只支持上传png、jpg格式的图片!');
        // }
        // return isJpgOrPng && isLt2M;
        // const formData = new FormData();
        // formData.append('files', file);
        // const convertedFile = new File([file], file.name, { type: file.type });
        // const filePath = path.resolve(__dirname, './public', convertedFile.name);
        // console.log('convertedFile', convertedFile);
        // fs.writeFile(filePath, convertedFile, (err) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(`File "${convertedFile.name}" saved successfully!`);
        //     }
        // });

        // const res = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: file,
        // });
        // // 获取接口返回的内容
        // let response = await res.json();
        // console.log('response',response);
    };

    const handleChange = (info) => {
        console.log('info', info);
        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, (url) => {
        //         setLoading(false);
        //         setImageUrl(url);
        //     });
        // }
    };

    const onFinish = () => {
        form.validateFields().then(async (values) => {
            const { title, desc, category } = values;
            const authorId = localStorage.getItem('token');
            const params = JSON.stringify({
                title,
                desc,
                category,
                authorId,
                // imageUrL: 'name.png',
            });
            setLoading(true)
            const res = await fetch('/api/blog', {
                method: 'POST',
                body: params,
            });
            // 获取接口返回的内容
            let response = await res.json();
            if (response?.success === true) {
                router.push(`/blog/${response?.data?._id}`);
            } else {
                message.error(response.message);
            }
            setLoading(false)

        });
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2>发布博客</h2>
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

                    {/* <Form.Item
                        // name="imageUrL"
                        label="图片"
                        rules={[
                            {
                                required: true,
                                message: '请上传图片!',
                            },
                        ]}
                    >
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            // onChange={handleChange}
                            beforeUpload={beforeUpload}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item> */}
                </Form>

                <div className={styles.btnlist}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.btn}
                        onClick={onFinish}
                        loading={loading}
                    >
                        发布
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
            </div>
        </div>
    );
};

export default AddBlog;
