/*
 * @Author: your name
 * @Date: 2021-06-02 10:36:08
 * @LastEditTime: 2021-06-03 10:11:52
 * @LastEditors: Please set LastEditors
 * @Description: 数据库连接
 * @FilePath: \nodeWeb\src\database\index.js
 */
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const DB_URL = 'mongodb://127.0.0.1:27017/pl';

// 连接
mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// 连接成功
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

// 连接异常
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

// 连接断开
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;