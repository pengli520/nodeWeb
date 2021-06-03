/*
 * @Author: your name
 * @Date: 2021-05-28 13:46:17
 * @LastEditTime: 2021-06-03 14:32:23
 * @LastEditors: Please set LastEditors
 * @Description: 工具函数
 * @FilePath: \nodeWeb\src\util\index.js
 */
const url = require('url');
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
/**
 * @description: 获取字符串最后是不是文件形式
 * @param {*} str
 * @param {*} arr
 * @return {*}
 */
const parsingSuffix = (str, arr = ['html', 'css']) => {
    if (!str) { 
        return;
    }
    return arr.includes(str.slice(str.lastIndexOf('.') + 1));
};

const isArray = (data) => {
    if (Array.isArray(data)) {
        return true;
    } else {
        return false;
    }
};

const isObject = (whereStr) => {
    if (Object.prototype.toString.call(whereStr) === "[object Object]") {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    parseUrl,
    parsingSuffix,
    isArray,
    isObject,
};