import db from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';

// 获取博客列表
export async function GET(req, params) {
    console.log('params', params);
    await db.connect();

    const id = params.params.id;
    try {
        // 查询当前博客内容
        const blog = await Blog.findById(id).populate('authorId').select('-password');
        return new Response(
            JSON.stringify({
                code: 200,
                data: blog,
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

// 更新博客
export async function PUT(req, params) {
    await db.connect();

    const id = params.params.id;
    // 获取请求头的token
    const token = req.headers.get('token');
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
        // 找到当前博客的作者
        const curBlog = await Blog.findById(id).populate('authorId');

        // 判断当前的博客作者是否是登录用户
        if (curBlog?.authorId?._id.toString() !== token?.toString()) {
            return new Response(
                JSON.stringify({
                    code: 403,
                    data: null,
                    message: '没有权限修改他人的博客！',
                    success: false,
                }),
                {
                    status: 403,
                }
            );
        }
        // 更新当前博客内容
        const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: { ...body } }, { new: true });
        return new Response(
            JSON.stringify({
                code: 200,
                data: updatedBlog,
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

// 删除博客
export async function DELETE(req, params) {
    await db.connect();
    const id = params.params.id;

    // 获取请求头的token
    const token = req.headers.get('token');
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
        // 找到当前博客的作者
        const curBlog = await Blog.findById(id).populate('authorId');

        // 判断当前的博客作者是否是登录用户
        if (curBlog?.authorId?._id.toString() !== token?.toString()) {
            return new Response(
                JSON.stringify({
                    code: 403,
                    data: null,
                    message: '没有权限删除他人的博客！',
                    success: false,
                }),
                {
                    status: 403,
                }
            );
        }
        // 删除当前博客内容
        await Blog.findByIdAndDelete(id);
        return new Response(
            JSON.stringify({
                code: 200,
                data: null,
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
