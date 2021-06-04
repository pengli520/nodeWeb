/*
 * @Author: your name
 * @Date: 2021-06-03 15:02:20
 * @LastEditTime: 2021-06-04 16:57:32
 * @LastEditors: Please set LastEditors
 * @Description: 中间件集合
 * @FilePath: \nodeWeb\src\services\middleware\imdex.js
 */
// 设置Cookie，统一返回
const injectionCookie = require('./injectionCookie/injectionCookie.js');
const reqMethodType = require('./reqMethodType/index.js');
const router = require('./router/router.js');


const app = (req, res) => {
    // 中间件集合
    const middlewares = [injectionCookie, reqMethodType, router];
    const next = () => {
        const fn = middlewares.shift();
        console.log(fn, middlewares);
        if (fn) {
           fn(req, res, next);
        } else {
            res.writeHead(500);
            res.end();
        }
    };
    next();
};
module.exports = app;