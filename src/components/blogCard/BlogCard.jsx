'use client';
import React, { useState,useEffect } from 'react';
import styles from './blogCard.module.css';
import Link from 'next/link';
import { LikeOutlined, LikeTwoTone, LikeFilled } from '@ant-design/icons';
import Image from 'next/image';
import { message } from 'antd';

const getBlogPic = (fileName) => {
    const url = require(`../../../public/${fileName ?? 'no-login'}.png`);
    return url;
};

const BlogCard = ({ blog }) => {
    const loginId = localStorage.getItem('token');

    const { title, desc, authorId, time = '2023-06-02 18:00:00', category, _id,likes } = blog;
    const [isLike, setIsLike] = useState(likes?.includes(loginId));
    const [count, setCount] = useState(likes?.length ?? 0);
    // 点赞
    const onLike = async () => {
        try {
            const res = await fetch(`http://localhost:3300/api/blog/${_id}/like`, {
                method: 'PUT',
                headers: {
                    token: loginId,
                },
            });
            let response = await res.json();
            if (response?.success === true) {
                setCount(count + 1);
                setIsLike(true);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.log('error',error);
        }
    };

    // 取消点赞
    const onDisLike = async () => {
        try {
            const res = await fetch(`http://localhost:3300/api/blog/${_id}/like`, {
                headers: { token: loginId },
                method: 'PUT',
            });
            let response = await res.json();
            if (response?.success === true) {
                setCount(count - 1);
                setIsLike(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {}
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.img} href={`/blog/${_id}`}>
                    <Image
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '300px' }}
                        src={getBlogPic(category)}
                        width="300"
                        height="300"
                        alt="博客图片"
                    ></Image>
                </Link>
                <div className={styles.detail}>
                    <div className={styles.left}>
                        <h3>{title}</h3>
                        <span>{desc}</span>
                        <span>
                            <span className={styles.title}>发布时间：</span>
                            {time}
                        </span>
                    </div>
                    <div className={styles.right}>
                        {count}
                        {isLike ? (
                            <LikeFilled style={{ color: '#1677ff' }} onClick={onDisLike} />
                        ) : (
                            <LikeOutlined onClick={onLike} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
