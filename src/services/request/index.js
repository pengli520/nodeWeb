/*
 * @Author: your name
 * @Date: 2021-06-03 14:09:31
 * @LastEditTime: 2021-06-03 14:20:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\src\services\request\index.js
 */
const qs = require('qs');
const { IncomingForm } = require('formidable');
const { parseUrl, parsingSuffix } = require('../../services/util/index.js');
const MVC = require('../../services/router/router.js');
const { getFile } = require('../../services/file/file.js');
const { log, dir } = console;

// 是否携带数据
const hasBody = (req) => {
    return 'content-length' in req.headers || 'transfer-encoding' in req.headers;
};

/**
 * @description: 表单上传，字符
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const formData = (req, res) => {
    const bf = [];
    req.on('data', function(chunk){
        bf.push(chunk);
    });
    req.on('end', async function(){
        // console.log(bf);
        req.body = qs.parse(bf.toString());
        console.log(req.body);
        res.writeHead(200, {data: 'ok'});
    });  
};
/**
 * @description: 上传附件
 * @param {*} req
 * @param {keepExtensions} 是否包含原始文件的扩展名
 * @return {maxFileSize} 文件大小限制
 */
const fileData = (req, res) => {
    console.log(req.headers);
    const form = new IncomingForm({
        uploadDir: '/assets/img',
        keepExtensions: true,
        maxFileSize: 1024 * 1024 * 2,
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            return new Error(err);
        }
        res.writeHead(200);
    })
};

/**
 * @description: 数据类型
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
 const contentType = (req, res) => {
    if (hasBody(req)) {
        const type = req.headers['content-type'].split(';')[0];
        console.log(type);
        switch (type) {
            case 'application/x-www-form-urlencoded':
                formData(req, res);
                break;
            case 'multipart/form-data':
                fileData(req, res);
                break;
            default:
                break;
        }        
    } else {
        console.log('meiy 数据');
    }
};

/**
 * @description: 判断请求类型
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const reqMethodType = (req, res) => {
    const { pathname, query } = parseUrl(req);
    log(pathname, query, req.method, parsingSuffix(pathname));
    switch (req.method) {
        case 'GET':
            if (parsingSuffix(pathname)) {
                getFile(pathname, req, res);
            } else {
                MVC(req, res, pathname, query);
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
        default:
            log(111);
            res.writeHead(200);
            break;
    }
};

module.exports = reqMethodType;