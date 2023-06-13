import db from '@/lib/db';
import Comment from '@/models/Comment';
import User from '@/models/User';
import Blog from '@/models/Blog';

// 获取评论列表
export async function GET(req, params) {
    await db.connect();

    const id = params.params.id;
    try {
        // 查询当前评论列表
        const comments = await Comment.find({ blogId: id }).populate('authorId');
        return new Response(
            JSON.stringify({
                code: 200,
                data: comments,
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

// 删除评论
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
        const curComment = await Comment.findById(id).populate('authorId');

        // 判断当前的评论作者是否是登录用户
        if (curComment?.authorId?._id.toString() !== token?.toString()) {
            return new Response(
                JSON.stringify({
                    code: 403,
                    data: null,
                    message: '没有权限删除他人的评论！',
                    success: false,
                }),
                {
                    status: 403,
                }
            );
        }
        // 删除当前评论
        await Comment.findByIdAndDelete(id);
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
