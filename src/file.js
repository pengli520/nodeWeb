/*
 * @Author: your name
 * @Date: 2021-05-21 09:50:48
 * @LastEditTime: 2021-05-21 14:52:23
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
 const getFile = (fileName, res) => {
    fs.readFile(path.join(__dirname, '../' , fileName), (err, buffer) => {
        if (err) {
            res.writeHead(404);
            res.end('error');
            return;
        };
        res.writeHead(200);
        res.end(buffer);
    });
};

module.exports = {
    getFile,
};