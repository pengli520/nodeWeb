/*
 * @Author: your name
 * @Date: 2021-05-28 11:41:48
 * @LastEditTime: 2021-06-04 17:51:27
 * @LastEditors: Please set LastEditors
 * @Description: 用户模块
 * @FilePath: \nodeWeb\src\controllers\user.js
 */
const { log } = console;
const saveFile = require('../services/file/saveFile.js');
const postLogin = (req, res, ...arg) => {
    log('-----login', arg);
    res.writeHead(200);
};
const postFile = async (req, res, ...arg) => {
    const { fields, files } = await saveFile(req, res);
    console.log(fields, files, 'fields');
    res.writeHead(200);
};
module.exports = {
    postLogin,
    postFile,
};