/*
 * @Author: your name
 * @Date: 2021-05-26 15:46:38
 * @LastEditTime: 2021-05-27 14:52:31
 * @LastEditors: Please set LastEditors
 * @Description: 数据上传
 * @FilePath: \nodeWeb\src\dataUpload.js
 */
const qs = require('qs');
const { IncomingForm } = require('formidable');
// 是否携带数据
const hasBody = (req) => {
    return 'content-length' in req.headers || 'transfer-encoding' in req.headers;
};
/**
 * @description: 请求类型
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const uploadType = (req, res) => {
    if (hasBody(req)) {
        const type = req.headers['content-type'].split(';')[0];
        console.log(type);
        switch (type) {
            case 'application/x-www-form-urlencoded':
                formUpload(req, res);
                break;
            case 'multipart/form-data':
                fileUpload(req, res);
                break;
            default:
                break;
        }        
    } else {
        console.log('meiy 数据');
    }
};

/**
 * @description: 表单上传，字符
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const formUpload = (req, res) => {
    const bf = [];
    req.on('data', function(chunk){
        bf.push(chunk);
    });
    req.on('end', function(){
        // console.log(bf);
        req.body = qs.parse(bf.toString());
        console.log(req.body);
        res.writeHead(200);
        res.end();
    });  
};
/**
 * @description: 上传附件
 * @param {*} req
 * @param {keepExtensions} 是否包含原始文件的扩展名
 * @return {maxFileSize} 文件大小限制
 */
const fileUpload = (req, res) => {
    console.log(req.headers);
    const form = new IncomingForm({
        uploadDir: './src/img',
        keepExtensions: true,
        maxFileSize: 1024 * 1024 * 2,
    });
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
            return new Error(err);
        }
        res.writeHead(200);
        res.end();
    })
};

module.exports = uploadType;
