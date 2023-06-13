'use client';
import React, { useState, useEffect, useReducer, useLayoutEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Avatar from '../../../public/avatar.png';
import Simple from '../../../public/no-login.png';

import { Button, Dropdown, Modal } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { WeekOptions } from './contants';

const getAvatar = (fileName) => {
    const url = require(`../../../public/avatar/${fileName ?? '1.png'}`);
    return url;
};

const NavBar = ({ detail }) => {
    const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
        time: '',
        date: '',
        week: 0,
        userName: 'kyrie',
        logIn: false,
        picture: '',
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            const avatar = localStorage.getItem('avatar');
            if (token) {
                dispatch({
                    logIn: true,
                    userName: username,
                    picture: getAvatar(avatar),
                });
            }
        }, 1000);
    }, [token]);

    const { time, date, week, logIn, picture, userName } = state;

    // 获取当前时间
    const setTime = () => {
        const time = moment().format('HH:mm:ss');
        const date = moment().format('YYYY-MM-DD');
        const week = moment().day();
        dispatch({
            time,
            date,
            week,
        });
        setTimeout(setTime, 1000);
    };

    const items = [
        {
            key: '1',
            label: <Link href="/addBlog">发布</Link>,
        },
        {
            key: '2',
            label: (
                <Link
                    href="/login"
                    onClick={() => {
                        localStorage.clear();
                        dispatch({ userName: '', logIn: false, picture: '' });
                    }}
                >
                    退出登录
                </Link>
            ),
        },
    ];

    const [showMemu, setShowMemu] = useState(false);

    useEffect(() => {
        setTime();
        return () => {};
    }, []);

    const showDropMemu = () => {
        setShowMemu(true);
    };
  
    return (
        <div className={styles.container}>
            <div className={styles.left}>MyBlog</div>
            <div className={styles.right}>
                <div className={styles.usercard}>
                    {logIn ? (
                        <Dropdown
                            menu={{ items }}
                            placement="bottom"
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <div style={{ borderRadius: '50%' }}>
                                <Image
                                    src={picture}
                                    width="45"
                                    height="45"
                                    alt="头像"
                                    style={{ cursor: 'pointer', border: 'solid 2px #fff',borderRadius:'50%' }}
                                />
                            </div>
                        </Dropdown>
                    ) : (
                        <div className={styles.buttonlist}>
                            <Button type="primary">
                                <Link href="/login">登录</Link>
                            </Button>
                            <Button>
                                <Link href="/register">注册</Link>
                            </Button>
                        </div>
                    )}

                    <div className={styles.detail}>
                        {logIn ? (
                            <>
                                <span className={styles.nologin}>{`您好！${userName}`}</span>
                                <div className={styles.timebox}>
                                    <span className={styles.date}>{date}</span>
                                    <span className={styles.week}>星期{WeekOptions[week]}</span>
                                    <span className={styles.time}>{time}</span>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    let detail = {};
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    if (token) {
        detail.logIn = true;
        detail.userName = username;
        detail.picture = getAvatar(avatar);
    }
    return {
        props: {
            detail,
        },
    };
}

export default NavBar;
