import React from 'react';
import styles from './footer.module.css';
import { GithubOutlined, WechatOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.detail}>
                    <div className={styles.title}>主要运用到的技术栈</div>
                    <span>Next.js</span>
                    <span>Node</span>
                    <span>mongoDB</span>
                </div>
                <div className={styles.detail}>
                    <div className={styles.title}>相关资源</div>
                    <a href="https://www.nextjs.cn" target="_blank">
                        https://www.nextjs.cn/
                    </a>
                    <a href="https://www.mongodb.com/startups" target="_blank">
                        https://www.mongodb.com/startups
                    </a>
                </div>
                <div className={styles.detail}>
                    <div className={styles.contact}>联系我</div>
                    <span>
                        微信：
                        A2275804521
                    </span>
                    <span>
                        GitHub：
                        <a href="https://github.com/kyrie668" target="_blank">
                            https://github.com/kyrie668
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
