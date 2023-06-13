// http://localhost:3300/api/blog
import db from '@/lib/db';
import Comment from '@/models/Comment';
import User from '@/models/User';
import Blog from '@/models/Blog';

// 获取评论列表
export async function GET(req) {
    await db.connect();

    try {
        // const blogs = await Comment.find({}).limit(16).populate('authorId');
        const blogs = await Comment.find({}).populate('authorId');
        return new Response(
            JSON.stringify({
                code: 200,
                data: blogs,
                message: '操作成功！',
                success: true,
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                code: 500,
                data: null,
                message: error.message,
                success: false,
            }),
            {
                status: 500,
            }
        );
    }
}

// 发布评论
export async function POST(req, params) {
    // 获取请求头的token
    const token = req.headers.get('token');
    await db.connect();

    if (!token) {
        return new Response(
            JSON.stringify({
                code: 401,
                data: null,
                message: '请先登录！',
                success: false,
            }),
            {
                status: 401,
            }
        );
    }
    try {
        const body = await req.json();
        let newComment = await Comment.create(body);
        newComment = await newComment.populate('authorId');
        return new Response(
            JSON.stringify({
                code: 201,
                data: newComment,
                message: '操作成功！',
                success: true,
            }),
            {
                status: 201,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                code: 500,
                data: null,
                message: error.message,
                success: false,
            }),
            {
                status: 500,
            }
        );
    }
}
