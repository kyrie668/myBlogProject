## 项目介绍

使用Next.js（基于 React 的轻量级框架）作为开发框架、ant-design作为UI框架开发的SSR项目
Next.js官方文档：[https://www.nextjs.cn/docs/getting-started]
第一次接触Next.js和开发后端api，写得不好请见谅....
项目功能有：登录、注册、发布博客(鼠标悬浮在头像上可以操作该功能)、修改博客、删除博客、查询博客、点赞、评论等功能



## 安装依赖

1.先确保安装好依赖:

```bash
npm install
# or
yarn 

```

2.本地启动mongod服务

下载mongondb下载地址：[https://www.mongodb.com/try/download/community]

启动mongodb 服务
```bash
mongod
```

连接本地mongodb 服务
```bash
mongo
```
请确保mongodb服务下存在my-blog-project名称的数据库
.env配置文件中：MONGODB_URI=mongodb://localhost:27017/my-blog-project


## 运行项目

```bash
npm run dev
# or
yarn dev

```


