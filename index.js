/*
 * @Author: your name
 * @Date: 2021-05-19 15:48:16
 * @LastEditTime: 2021-05-27 14:59:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
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
const url = require('url');
const { getFile } = require('./src/file');
const { injectionCookie } = require('./src/identity');
const uploadType = require('./src/dataUpload.js');
const { log, dir } = console;

const reqMethodType = (req, res) => {
    const { pathname, query } = parseUrl(req);
    switch (req.method) {
        case 'GET':
            getFile(pathname, req, res);
            break;
        case 'POST':
            uploadType(req, res);
            break;
        case 'DELETE':

            break;
        case 'PUT':

            break;
    }
};
/**
 * @description: 解析url，回去路径，查询参数
 * @param {*} req
 * @return {*}
 */
const parseUrl = (req) => {
    const { pathname, query } = url.parse(req.url, true);
    return {
        query,
        pathname,
    };
};

http.createServer((req, res) => {
    injectionCookie(req, res);
    reqMethodType(req, res);
}).listen(9999);