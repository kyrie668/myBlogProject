// http://localhost:3300/api/register
import db from '@/lib/db';
import User from '@/models/User';
// const User = require('@/models/User');

// 登录
export async function POST(req) {
    try {
        await db.connect();
        const { email: curEmail, password: curPsw } = await req.json();
        // 判断邮箱是否已经注册
        let data = await User.findOne({ email: curEmail });
        if (!data) {
            return new Response(
                JSON.stringify({
                    code: 401,
                    data: null,
                    message: '邮箱或密码错误！',
                    success: false,
                }),
                {
                    status: 401,
                }
            );
        }
        const { password, email, ...other } = data._doc;
        // // 比对密码和邮箱
        let bol = password === curPsw && email === curEmail;

        if (bol) {
            return new Response(
                JSON.stringify({
                    code: 200,
                    data: { email, ...other },
                    message: '操作成功！',
                    success: true,
                }),
                {
                    status: 200,
                }
            );
        } else {
            return new Response(
                JSON.stringify({
                    code: 401,
                    data: data,
                    message: '邮箱或密码错误！',
                    success: false,
                }),
                {
                    status: 401,
                }
            );
        }
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
