'use client';
import React, { useState, useEffect } from 'react';
import styles from './blog.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    EditTwoTone,
    DeleteTwoTone,
    LikeFilled,
    LikeOutlined,
    SendOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { Tag, Popconfirm, message, Spin, Input, Button, Empty } from 'antd';
import Link from 'next/link';

let colorList = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
];

// 获取博客图片地址
const getBlogPic = (fileName) => {
    const url = require(`../../../../public/${fileName ?? 'img1'}.png`);
    return url;
};

// 获取头像地址
const getAvatar = (fileName) => {
    const url = require(`../../../../public/avatar/${fileName ?? '1.png'}`);
    return url;
};

const BlogDetail = (props) => {
    const [blogDetails, setBlogDetails] = useState({});
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const loginId = localStorage.getItem('token');
    const picName = localStorage.getItem('avatar');
    const [commenting, setCommenting] = useState(false);
    const [commentText, setCommentText] = useState('');

    // const commentList = [
    //     {
    //         _id: '6157b49788571e4c20bf3c5a',
    //         authorId: {
    //             _id: '614d1832f8d47e4db40e9bec',
    //             username: '张三',
    //             avatarUrl: '1.png',
    //         },
    //         text: '这篇文章写的真好！',
    //         createdAt: '2023-06-13T08:00:00.000Z',
    //     },
    //     {
    //         _id: '6157b4af88571e4c20bf3c5c',
    //         authorId: {
    //             _id: '6150d647234b979a16f85661',
    //             username: '李四',
    //             avatarUrl: '2.png',
    //         },
    //         text: '学到了不少东西，谢谢作者',
    //         createdAt: '2023-06-13T09:30:00.000Z',
    //     },
    //     {
    //         _id: '6157b4d788571e4c20bf3c5f',
    //         authorId: {
    //             _id: '615255a917df15aee9445587',
    //             username: '王五',
    //             avatarUrl: '3.png',
    //         },
    //         text: '顶起来！支持作者！',
    //         createdAt: '2023-06-13T11:45:00.000Z',
    //     },
    // ];

    // 获取博客详情
    const getBlogDetails = async () => {
        setLoading(true);
        const res = await fetch(`/api/blog/${props.params.id}`, { cache: 'no-cache' });
        let response = await res.json();
        // 更新状态
        setBlogDetails(response?.data);
        setIsLike(response?.data?.likes?.includes(loginId));
        setLikeCount(response?.data?.likes?.length ?? 0);
        setLoading(false);
    };

    // 获取评论列表
    const getCommentList = async () => {
        setCommentLoading(true);
        const res = await fetch(`/api/comment/${props.params.id}`, { cache: 'no-cache' });
        let response = await res.json();
        // 更新状态
        setCommentList(response?.data || []);
        setCommentLoading(false);
    };

    useEffect(() => {
        getBlogDetails();
        getCommentList();
    }, []);

    const router = useRouter();

    // 点赞
    const onLike = async () => {
        try {
            const res = await fetch(`http://localhost:3300/api/blog/${props.params.id}/like`, {
                method: 'PUT',
                headers: {
                    token: loginId,
                },
            });
            let response = await res.json();
            if (response?.success === true) {
                setLikeCount(likeCount + 1);
                setIsLike(true);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // 取消点赞
    const onDisLike = async () => {
        try {
            const res = await fetch(`http://localhost:3300/api/blog/${props.params.id}/like`, {
                headers: { token: loginId },
                method: 'PUT',
            });
            let response = await res.json();
            if (response?.success === true) {
                setLikeCount(likeCount - 1);
                setIsLike(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {}
    };

    // 删除
    const onDelete = async () => {
        try {
            const res = await fetch(`/api/blog/${props.params.id}`, {
                method: 'DELETE',
                headers: {
                    token: loginId,
                },
            });
            let response = await res.json();
            if (response?.success === true) {
                message.success('删除成功');
                router.push('/');
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // 编辑评论内容
    const onChange = (e) => {
        setCommentText(e.target.value);
    };

    // 发布评论
    const sendComment = async () => {
        // 没有填写内容
        if (!commentText) {
            message.warn('请先输入评论内容');
            return;
        }
        setCommenting(true);
        try {
            const body = {
                blogId: props.params.id,
                authorId: loginId,
                text: commentText,
            };
            const res = await fetch(`/api/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: loginId,
                },
                body: JSON.stringify(body),
            });
            let response = await res.json();
            if (response?.success === true) {
                message.success('发布成功');
                setCommenting(false);
                setCommentText('')
                setCommentLoading();
                getCommentList();
            } else {
                setCommenting(false);
                message.error(response?.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // 删除评论
    const deleteComment = async (id) => {
        try {
            const res = await fetch(`/api/comment/${id}`, {
                method: 'DELETE',
                headers: {
                    token: loginId,
                },
            });
            let response = await res.json();
            if (response?.success === true) {
                message.success('删除成功');
                getCommentList();
            } else {
                message.error(response?.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            {loading ? (
                <Spin className={styles.spinning}></Spin>
            ) : (
                <div className={styles.container}>
                    <div
                        className={styles.back}
                        onClick={() => {
                            router.push('/');
                        }}
                    >
                        <Image alt="" src={getBlogPic('back')} width={'30'} height={'30'} />
                    </div>
                    <div className={styles.wrapper}>
                        <div className={styles.myborder}>
                            <Image
                                src={getBlogPic(blogDetails?.category)}
                                alt="图片"
                                width="400"
                                height="400"
                            ></Image>
                            <div className={styles.content}>
                                <div className={styles.top}>
                                    <h2>{blogDetails?.title}</h2>
                                    {/*判断是否为博客作者*/}
                                    {blogDetails?.authorId?._id === loginId ? (
                                        <div className={styles.iconlist}>
                                            <Link href={`/blog/edit/${props.params.id}`}>
                                                <EditTwoTone />
                                            </Link>
                                            <Popconfirm
                                                title="确定删除该博客吗？"
                                                description="删除后无法恢复，真的要删除吗？"
                                                okText="是的"
                                                cancelText="取消"
                                                onConfirm={onDelete}
                                            >
                                                <DeleteTwoTone twoToneColor="#eb2f2f" />
                                            </Popconfirm>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className={styles.detail}>
                                    <div>
                                        <span>
                                            技术分类：{' '}
                                            <Tag color="#2db7f5">{blogDetails?.category}</Tag>
                                        </span>
                                        <span>
                                            {isLike ? (
                                                <LikeFilled
                                                    style={{ color: '#1677ff' }}
                                                    onClick={onDisLike}
                                                />
                                            ) : (
                                                <LikeOutlined onClick={onLike} />
                                            )}
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    color: isLike ? '#1677ff' : '#000',
                                                }}
                                            >
                                                {likeCount}
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span>内容：{blogDetails?.desc}</span>
                                    </div>
                                    <div>
                                        <span className={styles.time}>
                                            <Tag
                                                style={{ marginRight: '5px' }}
                                                color="geekblue"
                                            >{`${blogDetails?.authorId?.username}`}</Tag>
                                            发布于：
                                            {blogDetails?.createdAt
                                                ? moment(blogDetails?.createdAt).format(
                                                      'YYYY-MM-DD HH:mm:ss'
                                                  )
                                                : '-'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.form}>
                                    <Image
                                        src={getAvatar(picName)}
                                        width={'40'}
                                        height={'40'}
                                        alt="头像"
                                        style={{ borderRadius: '50%' }}
                                    ></Image>
                                    <div>
                                        <Input.TextArea
                                            placeholder="评论"
                                            rows={3}
                                            showCount
                                            onChange={onChange}
                                            value={commentText}
                                            maxLength={30}
                                            style={{
                                                resize: 'none',
                                            }}
                                        ></Input.TextArea>
                                        <Button
                                            type="primary"
                                            onClick={sendComment}
                                            loading={commenting}
                                        >
                                            <SendOutlined />
                                        </Button>
                                    </div>
                                </div>
                                <div className={styles.list}>
                                    {commentLoading ? (
                                        <Spin></Spin>
                                    ) : commentList?.length ? (
                                        commentList.map((item, index) => {
                                            return (
                                                <div className={styles.item} key={item?._id}>
                                                    <div className={styles.itemLeft}>
                                                        <Image
                                                            src={getAvatar(
                                                                item?.authorId?.avatarUrl
                                                            )}
                                                            width={'40'}
                                                            height={'40'}
                                                            alt="头像"
                                                            style={{ borderRadius: '50%' }}
                                                        ></Image>
                                                        <div className={styles.itemLeftContent}>
                                                            <div>
                                                                <Tag color={colorList[index % 10]}>
                                                                    {item?.authorId?.username}
                                                                </Tag>
                                                                <span className={styles.time}>
                                                                    {moment(item?.createdAt).format(
                                                                        'YYYY-MM-DD HH:mm'
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div
                                                                className={
                                                                    styles.itemLeftBottomText
                                                                }
                                                            >
                                                                <span>{item?.text}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={styles.itemRight}
                                                        style={{
                                                            display:
                                                                loginId === item?.authorId?._id
                                                                    ? ''
                                                                    : 'none',
                                                        }}
                                                    >
                                                        <Popconfirm
                                                            title="确定删除该评论吗？"
                                                            description="删除后无法恢复，真的要删除吗？"
                                                            okText="是的"
                                                            cancelText="取消"
                                                            onConfirm={() => deleteComment(item._id)}
                                                        >
                                                            <DeleteTwoTone twoToneColor="#eb2f2f"></DeleteTwoTone>
                                                        </Popconfirm>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <Empty description={'暂无评论'}></Empty>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogDetail;
