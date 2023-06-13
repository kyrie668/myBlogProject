// 导入 mongoose
const mongoose = require('mongoose');

//  mongoose.connect('mongodb://127.0.0.1:27017/my-blog-project');

const connection = {};

async function connect() {
    if (connection.isConnected) {
        return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            return;
        }
        await mongoose.disconnect();
    }
    // 连接数据库
    const dataBase = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = dataBase.connections[0].readyState;
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        }
    }
}

export default { connect, disconnect };
