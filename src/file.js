/*
 * @Author: your name
 * @Date: 2021-05-21 09:50:48
 * @LastEditTime: 2021-05-26 09:37:27
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
 const { log, dir } = console;
 const getFile = (fileName, req, res) => {
    if (req.headers['if-none-match'] && false) {
        log('304');
        res.writeHead(304);
        res.end()
    } else {
        fs.readFile(path.join(__dirname, '../' , fileName), (err, buffer) => {
            if (err) {
                res.writeHead(404);
                res.end('error');
                return;
            };
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'cache-control': 'max-age=90',
                'Etag': '12345678',
            });
            console.log(fileName);
            res.end(buffer);
        });
    }
};

module.exports = {
    getFile,
};