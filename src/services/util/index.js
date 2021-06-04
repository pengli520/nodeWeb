/*
 * @Author: your name
 * @Date: 2021-05-28 13:46:17
 * @LastEditTime: 2021-06-04 17:17:47
 * @LastEditors: Please set LastEditors
 * @Description: 工具函数
 * @FilePath: \nodeWeb\src\util\index.js
 */
const url = require('url');
const path = require('path');
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

// post请求是否携带数据
const hasBodyContent = (req) => {
    return 'content-length' in req.headers || 'transfer-encoding' in req.headers;
};

/**
 * @description: 返回文件地址
 * @param {*} name：路径
 * @return {*}
 */
const pathDealWith = (name) => {
    return path.join(process.cwd(), name)
};
module.exports = {
    parseUrl,
    parsingSuffix,
    isArray,
    isObject,
    hasBodyContent,
    pathDealWith,
};