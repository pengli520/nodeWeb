/*
 * @Author: your name
 * @Date: 2021-05-19 15:48:16
 * @LastEditTime: 2021-05-21 15:40:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\index.js
 */
"use strict"
const http = require('http');
const url = require('url');
const { getFile } = require('./src/file');
const { injectionCookie } = require('./src/identity');
const { log, dir } = console;

const reqMethodType = (req, res) => {
    switch (req.method) {
        case 'GET':
            const { pathname, query } = parseUrl(req);
            getFile(pathname, res);
            break;
        case 'POST':

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