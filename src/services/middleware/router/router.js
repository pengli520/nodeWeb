/*
 * @Author: your name
 * @Date: 2021-05-28 10:58:32
 * @LastEditTime: 2021-06-04 17:05:37
 * @LastEditors: Please set LastEditors
 * @Description: 自动化匹配路由：http//2222.22.0/controll/a/m
 * @FilePath: \nodeWeb\src\router.js
 */
const fs = require('fs');
const path = require('path');
const router = (req, res) => {
    const pathname = req.pathname;
    const query = req.query;
    const paths = pathname.split('/');
    console.log(pathname, paths);

    if (paths.length < 3) {
        res.writeHead(500);
        return;
    }
    const c = paths[1];
    const a = paths[2];
    const args = paths.slice(3);
    let module;
    try {
        module = require(path.join(process.cwd(), './controll/' + c));
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        return;
    }
    const method = module[a];
    if (method) {
        method.apply(null, [req, res].concat(query));
    } else {
        res.writeHead(500);
    }
};

module.exports = router;