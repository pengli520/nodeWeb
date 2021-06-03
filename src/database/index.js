/*
 * @Author: your name
 * @Date: 2021-06-03 10:13:56
 * @LastEditTime: 2021-06-03 13:44:27
 * @LastEditors: Please set LastEditors
 * @Description: 出口文件,所有操作数据库的操作
 * @FilePath: \nodeWeb\src\database\index.js
 */
const usersCurd = require('./curd/usersCurd.js');
module.exports = {
    usersCurd,
};