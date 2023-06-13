// http://localhost:3300/api/register
import db from '@/lib/db';
import User from '@/models/User';
// const User = require('../../../models/User');

export async function POST(req) {
    try {
        await db.connect();
        const { username, email, password: curPsw, avatarUrl } = await req.json();
        // 判断邮箱是否已经注册
        const isExisting = await User.findOne({ email });
        if (isExisting) {
            throw new Error(`邮箱 ${email} 已注册！`);
        }
        // 存入数据库
        const newUser = await User.create({ username, password: curPsw, email, avatarUrl });

        const { password, ...user } = newUser._doc;
        // 返回响应数据
        return new Response(
            JSON.stringify({
                code: 201,
                data: user,
                message: '注册成功',
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
