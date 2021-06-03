/*
 * @Author: your name
 * @Date: 2021-06-03 09:52:57
 * @LastEditTime: 2021-06-03 14:07:40
 * @LastEditors: Please set LastEditors
 * @Description: 用户表的操作
 * @FilePath: \nodeWeb\src\database\curd\usersCurd.js
 */
const usersModel = require('../model/usersModel.js');
const { isArray, isObject } = require('../../services/util/index.js')

/**
 * @description: 添加数据
 * @param {*} data：[{"name":'zhangsan',"age":21},{"name":'lisi',"age":22}];
 * @return {*}
 */
 const insert = (data) => {
    usersModel.create(data, function(err, result) {
        console.log(err, result, '-----');
    });
};

/**
 * @description: 删除数据
 * @param {*} whereStr = {"name":'wilson001'}; 满足条件
 * @return {*}
 */
 const remove = (whereStr) => {
    if (isObject(whereStr)) {
        usersModel.remove(whereStr, function(err, result) {
        
        })
    }
};

/**
 * @description: 查找数据
 * @param {*}
 * @return {*}
 */
 const find = (whereStr) => {
    if (isObject(whereStr)) {
        usersModel.find(whereStr).toArray(function(err, result) {

        })
    }
};

/**
 * @description: 更新数据
 * @param {*}
 * @return {*}
 * $set修改，$unset，删除键值对， $inc对数字进行运算， $gt大于符号
   const whereStr = {"name":'zhangsan'};
   const updateStr = {$set: { "age" : 100 }};
 */
   const update = (whereStr, updateStr) => {
    if (isObject(whereStr) && isObject(updateStr)) {
        usersModel.updateOne(whereStr, updateStr, function(err, result) {

        })
    }
};

module.exports = {
    insert,
    remove,
    find,
    update,
};