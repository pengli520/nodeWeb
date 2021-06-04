/*
 * @Author: your name
 * @Date: 2021-05-21 09:50:31
 * @LastEditTime: 2021-06-04 14:31:04
 * @LastEditors: Please set LastEditors
 * @Description: sessions解析中间件
 * @FilePath: \nodeWeb\src\identity.js
 */
const qs = require('qs');
// 90分钟的有效期
const EXPIRES = 1000 * 60 * 90;
const sessions = {};
/**
 * @description: 生成session
 * @param {*}
 * @return {*} session
 */
const generateSession = () => {
    const session = {
        sessionId: +new Date() + Math.random(),
        expires : +new Date() + EXPIRES,
    };
    sessions[session.sessionId] = session;
    return session;
};


/**
 * @description: 注入cookie，hack res.writeHead
 * @param {*}
 * @return {*} secure https才生效
 */
const injectionCookie = async (req, res, next) => {
    const contentType = {'Content-Type': 'text/plain; charset=utf-8'};
    const writeHead = res.writeHead;
    res.writeHead = function () {
        const cookie = qs.parse(req.headers.cookie);
        const session = sessions[cookie.sessionId];
        const init = () => {
            const { expires, sessionId } = generateSession();
            res.setHeader('Set-Cookie', [`sessionId=${sessionId};expires=${expires};httpOnly;`]);
        };
        if (session) {
            // 判断是否过期
            if (session.expires > +new Date()) {
                res.setHeader('Set-Cookie', [`sessionId=${cookie.sessionId};expires=${+new Date() + EXPIRES};httpOnly;`]);
            } else {
                delete sessions[cookie.sessionId];
                init();
                log('过期删除');
            }
        } else {
            init();
        }
        const data = Array.from(arguments);
        writeHead.call(this, ...arguments, contentType);
        // log(...arguments, data);
        if (!data[2]) {
            res.end(JSON.stringify(data[1]));
        }
    };
    next();
};

module.exports = injectionCookie;