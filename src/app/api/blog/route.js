// http://localhost:3300/api/blog
import db from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';

// 获取博客列表
export async function GET(req) {
    try {
        await db.connect();
        const contentType = req.headers.get('content-type');
        if (contentType !== 'application/json') {
            const blogs = await Blog.find({});
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
        }
        const authorId = req.headers.get('token');

        // 若req传入了authorId，则获取该用户的博客列表
        if (authorId) {
            const user = await User.findById(authorId);
            // 校验是否存在有效的authorId
            if (!user) {
                return new Response(
                    JSON.stringify({
                        code: 400,
                        data: null,
                        message: '用户不合法',
                        success: false,
                    }),
                    {
                        status: 400,
                    }
                );
            }

            const blogs = await Blog.find({ authorId });
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
        }
    } catch (error) {
        console.log('error', error);
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

        console.log('body', body);
        // 校验是否存在有效的authorId
        if (!body.authorId) {
            return new Response(
                JSON.stringify({
                    code: 400,
                    data: null,
                    message: '用户不合法',
                    success: false,
                }),
                {
                    status: 400,
                }
            );
        }

        const user = await User.findById(body.authorId);
        if (!user) {
            return new Response(
                JSON.stringify({
                    code: 400,
                    data: null,
                    message: '用户不合法',
                    success: false,
                }),
                {
                    status: 400,
                }
            );
        }
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
        console.log('error', error);
        return new Response(
            JSON.stringify({
                code: 500,
                data: null,
                message: error,
                success: false,
            }),
            {
                status: 500,
            }
        );
    }
}
