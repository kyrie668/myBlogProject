const fs = require('fs');
const path = require('path');
// const icon = path.join(__dirname, 'node_modules', 'formidable');
// const formidable = require('../../../../node_modules/formidable/src/index.js');
// const formidable = require('formidable');
export async function POST(req, res) {
    console.log('req', req);

    try {
        let ws = fs.createWriteStream('./观书有感.txt');

        // let path1 = path.resolve(__dirname, './public/some.png');
        // let data = fs.createReadStream(req);
        // const ws = fs.createWriteStream(path1, data);
        // data.on('data', (chunk) => {
        //     ws.write(chunk);
        // });
        // let reader = new FileReader();
        // reader.onload = () => {
        //     // let buffer = new Buffer() // 已经被弃用的属性，推荐使用Buffer.from
        //     let buffer = Buffer.from(req);
        //     // 创建文件夹,指定缓存文件夹
        //     fs.writeFile(path.resolve(__dirname, './public/some.png'), buffer, {}, (err, res) => {
        //         if (res) {
        //             console.log(res);
        //         }
        //         if (err) return console.error(err);
        //     });
        // };
        // reader.onerror = (error) => {
        //     console.log(error);
        // };
        // const file = await req.json();
        // const data = [];
        // req.on('data', (chunk) => {
        //     data.push(chunk);
        // });
        // req.on('end', () => {
        // console.log('req', req);
        // const buffer = Buffer.concat([file]);
        // fs.writeFile(path.resolve(__dirname, './public'), buffer, (err) => {
        //     if (err) {
        //         return new Response(
        //             JSON.stringify({
        //                 code: 500,
        //                 data: null,
        //                 message: '保存失败',
        //                 success: false,
        //             }),
        //             {
        //                 status: 500,
        //             }
        //         );
        //     } else {
        //         return new Response(
        //             JSON.stringify({
        //                 code: 200,
        //                 data: null,
        //                 message: '保存成功',
        //                 success: true,
        //             }),
        //             {
        //                 status: 200,
        //             }
        //         );
        //     }
        // });
        // });
        // const convertedFile = new File([file], file.name, { type: file.type });
        // const filePath = path.resolve(__dirname, './public', convertedFile.name);
        // console.log('convertedFile', convertedFile);
        // fs.writeFile(filePath, convertedFile, (err) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(`File "${convertedFile.name}" saved successfully!`);
        //     }
        // });
        // const form = new formidable.IncomingForm();
        // form.parse(req, (err, fields, files) => {
        //     if (err) {
        //         return new Response(
        //             JSON.stringify({
        //                 code: 500,
        //                 data: null,
        //                 message: 'Internal Server Error',
        //                 success: false,
        //             }),
        //             {
        //                 status: 500,
        //             }
        //         );
        //     }

        //     // 获取上传的文件
        //     const file = files.file;
        //     console.log('file', file);
        //     // 将文件存储到本地的public目录下
        //     const filePath = path.join(__dirname, 'public', file.name);
        //     fs.copyFile(file.path, filePath, (err) => {
        //         if (err) {
        //             return new Response(
        //                 JSON.stringify({
        //                     code: 500,
        //                     data: null,
        //                     message: 'Internal Server Error',
        //                     success: false,
        //                 }),
        //                 {
        //                     status: 500,
        //                 }
        //             );
        //         }
        //         return new Response(
        //             JSON.stringify({
        //                 code: 200,
        //                 data: file.name,
        //                 message: '上传成功！',
        //                 success: true,
        //             }),
        //             {
        //                 status: 200,
        //             }
        //         );
        //     });
        // });
    } catch (error) {
        // return new Response(
        //     JSON.stringify({
        //         code: 500,
        //         data: null,
        //         message: error.message,
        //         success: false,
        //     }),
        //     {
        //         status: 500,
        //     }
        // );
    }
}
