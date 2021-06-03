/*
 * @Author: your name
 * @Date: 2021-05-28 11:41:48
 * @LastEditTime: 2021-05-28 14:51:58
 * @LastEditors: Please set LastEditors
 * @Description: 用户模块
 * @FilePath: \nodeWeb\src\controllers\user.js
 */
const { log } = console;
const login = (req, res, ...arg) => {
    log('-----login', arg);
    res.writeHead(200);
};

module.exports = {
    login,
};