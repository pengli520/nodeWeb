/*
 * @Author: your name
 * @Date: 2021-05-21 09:50:48
 * @LastEditTime: 2021-06-04 15:44:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\src\file.js
 */
const fs = require('fs');
const path = require('path');
/**
 * @description: 获取静态文件
 * @param {*} fileName
 * @param {*} res
 * @return {*}
 */
 const getFile = (req, res) => {
     const fileName = req.pathname;
    if (req.headers['if-none-match']) {
        res.writeHead(304);
    } else {
        console.log(path.join(process.cwd(), fileName));
        fs.readFile(path.join(process.cwd(), fileName), (err, buffer) => {
            if (err) {
                res.writeHead(404);
                return;
            };
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'cache-control': 'max-age=90',
                'Etag': '12345678',
            }, true);
            res.end(buffer);
        });
    }
};

module.exports = {
    getFile,
};