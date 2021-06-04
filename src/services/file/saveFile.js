/*
 * @Author: your name
 * @Date: 2021-06-04 16:37:25
 * @LastEditTime: 2021-06-04 17:51:01
 * @LastEditors: Please set LastEditors
 * @Description: 处理上传的文件
 * @FilePath: \nodeWeb\src\services\file\saveFile.js
 */
const { IncomingForm } = require('formidable');
const { pathDealWith } = require('../util/index');
/**
 * @description: 上传附件
 * @param {*} req
 * @param {keepExtensions} 是否包含原始文件的扩展名
 * @return {maxFileSize} 文件大小限制
 */
 const fileData = (req, res) => {
    const form = new IncomingForm({
        uploadDir: pathDealWith('./assets/img'),
        keepExtensions: true,
        maxFileSize: 1024 * 1024 * 2,
    });
    return new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) {
                return reject(false);
            }
            return resolve({
                fields,
                files,
            });
        })
    })

};

module.exports = fileData;