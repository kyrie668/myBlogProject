'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Blogs } from '@/lib/data';
import Image from 'next/image';
import BlogCard from '@/components/blogCard/BlogCard';
import { Empty, Spin } from 'antd';

export default function Home() {
    const [blogList, setBlogList] = useState([]);
    const [loading, setLoading] = useState(false);
    // 获取博客列表
    const getBlogs = async () => {
        setLoading(true);
        const res = await fetch(`http://localhost:3300/api/blog`);
        let response = await res.json();
        setBlogList(response?.data);
        setLoading(false);
    };
    useEffect(() => {
        getBlogs();
    }, []);
    return (
        <div className={styles.container}>
            <h2>博客列表</h2>
            {loading ? (
                <Spin style={{ width: '100%' }}></Spin>
            ) : blogList?.length ? (
                <div className={styles.wrapper}>
                    {blogList?.map((item) => {
                        return <BlogCard key={item._id} blog={item} />;
                    })}
                </div>
            ) : (
                <Empty></Empty>
            )}
        </div>
    );
}
