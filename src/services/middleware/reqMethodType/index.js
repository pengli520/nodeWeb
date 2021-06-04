/*
 * @Author: your name
 * @Date: 2021-06-03 14:09:31
 * @LastEditTime: 2021-06-04 17:07:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\src\services\request\index.js
 */
const qs = require('qs');
const { parseUrl, parsingSuffix, hasBodyContent } = require('../../util/index.js');
const { getFile } = require('../../file/file.js');
const { log, dir } = console;



/**
 * @description: post请求
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const formData = (req) => {
    const bf = [];
    req.on('data', function(chunk){
        bf.push(chunk);
    });
    req.on('end', async function(){
        // console.log(bf);
        req.body = qs.parse(bf.toString());
        console.log(req.body);
        // post数据解析完成，开始匹配路由
        req.next();
    });  
};

/**
 * @description: 数据类型
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
 const contentType = (req, res) => {
    if (hasBodyContent(req)) {
        const type = req.headers['content-type'].split(';')[0];
        console.log(type);
        switch (type) {
            case 'application/x-www-form-urlencoded':
                formData(req, res);
                break;
            case 'multipart/form-data':
                req.next();
                break;
            default:
                break;
        }        
    } else {
        res.writeHead(500, {data: '请上传数据'});
    }
};

/**
 * @description: 判断请求类型
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const reqMethodType = (req, res, next) => {
    const { pathname, query } = parseUrl(req);
    req.pathname = pathname;
    req.query = query;
    req.next = next;
    log('请求url', pathname, query, req.method, parsingSuffix(pathname));
    switch (req.method) {
        case 'GET':
            if (parsingSuffix(pathname)) {
                getFile(req, res);
            } else {
                next();
            }
            break;
        case 'POST':
            contentType(req, res);
            break;
        case 'DELETE':
            res.writeHead(200);
            break;
        case 'PUT':
            res.writeHead(200);
            break;
    }
};

module.exports = reqMethodType;