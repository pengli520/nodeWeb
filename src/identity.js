/*
 * @Author: your name
 * @Date: 2021-05-21 09:50:31
 * @LastEditTime: 2021-05-21 14:57:06
 * @LastEditors: Please set LastEditors
 * @Description: sessions解析
 * @FilePath: \nodeWeb\src\identity.js
 */
const qs = require('qs');
const { log, dir } = console;
// 20分钟的有效期
const EXPIRES = 1000 * 60 * 0.1;
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
 * @return {*}
 */
const injectionCookie = async (req, res) => {
    const ContentType = {'Content-Type': 'text/plain; charset=utf-8'};
    const writeHead = res.writeHead;
    res.writeHead = function () {
        const cookie = qs.parse(req.headers.cookie);
        const session = sessions[cookie.sessionId];
        const init = () => {
            const { expires, sessionId } = generateSession();
            res.setHeader('Set-Cookie', [`sessionId=${sessionId};expires=${expires};httpOnly;secure;`]);
        };
        if (session) {
            // 判断是否过期
            if (session.expires > +new Date()) {
                res.setHeader('Set-Cookie', [`sessionId=${cookie.sessionId};expires=${+new Date() + EXPIRES};httpOnly;secure;`]);
            } else {
                delete sessions[cookie.sessionId];
                init();
                log('过期删除');
            }
        } else {
            init();
        }
        writeHead.apply(this, arguments);
    };
};

module.exports = {
    injectionCookie,
};