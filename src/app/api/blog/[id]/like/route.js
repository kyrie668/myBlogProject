import db from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';

// 添加like博客
export async function PUT(req, params) {
    await db.connect();

    const id = params.params.id;
    // 获取请求头的token

    const token = req.headers.get('token');
    // 判断当前用户是否登录
    // if (!token) {
    //     return new Response(
    //         JSON.stringify({
    //             code: 401,
    //             data: null,
    //             message: '请先登录！',
    //             success: false,
    //         }),
    //         {
    //             status: 401,
    //         }
    //     );
    // }

    try {
        // 找到当前博客的作者
        const curBlog = await Blog.findById(id).populate('authorId');

        const blog = await Blog.findById(id);
        // 更新当前博客like数量及like用户

        if (blog?.likes?.includes(token)) {
            blog.likes = blog.likes.filter((id) => id.toString() !== token.toString());
        } else {
            blog.likes.push(token);
        }
        await blog.save();
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
