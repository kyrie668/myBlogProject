// http://localhost:3300/api/blog
import db from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';

// 获取博客列表
export async function GET(req) {
    try {
        await db.connect();
        const blogs = await Blog.find({});
        // const blogs = await Blog.find({}).limit(16).populate('authorId');
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

// 发布博客
export async function POST(req) {
    try {
        await db.connect();
        const body = await req.json();
        const data = await Blog.create({ ...body });
        const { ...newBlog } = data._doc;

        return new Response(
            JSON.stringify({
                code: 201,
                data: newBlog,
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
