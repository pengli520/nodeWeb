/*
 * @Author: your name
 * @Date: 2021-05-19 15:48:16
 * @LastEditTime: 2021-06-04 16:26:49
 * @LastEditors: Please set LastEditors
 * @Description: 服务入口文件
 * @FilePath: \nodeWeb\index.js
 * node
       在箭头函数中的this为空对象（严格和非严格模式）
       正常函数下（非严格模式）this为global，（严格模式）为undefined
       使用apply(null)（非严格模式）,this为global;（严格模式）为null
 * 在浏览器中
 *     箭头函数中的this为window（严格和非严格模式）
 *     正常函数下（非严格模式）this为window，（严格模式）为undefined
 *     使用apply(null)（非严格模式）,this为window;（严格模式）为null
 */
// "use strict"
const http = require('http');
// const DB = require('./database/index.js');
const app = require('./services/middleware/index.js');


// DB.usersCurd.insert([{nick_name: 'wer456u00'}, {nick_name: '66'}])
http.createServer((req, res) => {
    app(req, res);
}).listen(9999);