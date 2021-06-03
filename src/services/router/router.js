/*
 * @Author: your name
 * @Date: 2021-05-28 10:58:32
 * @LastEditTime: 2021-05-31 17:30:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\src\router.js
 */

const MVC = (req, res, pathName, query) => {
    const paths = pathName.split('/');
    if (paths.length < 3) {
        res.writeHead(500);
        return;
    }
    const c = paths[1];
    const a = paths[2];
    const args = paths.slice(3);
    let module;
    try {
        module = require('./controll/' + c);
    } catch {
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

module.exports = MVC;