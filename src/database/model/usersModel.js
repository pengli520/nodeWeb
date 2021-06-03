/*
 * @Author: your name
 * @Date: 2021-06-03 09:47:05
 * @LastEditTime: 2021-06-03 13:43:28
 * @LastEditors: Please set LastEditors
 * @Description: 用户模型
 * @FilePath: \nodeWeb\src\database\model\usersModel.js
 */
const mongoose = require('../db/connect.js');
const table = 'users';
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        nick_name: {
            type: String,
            required: true,
        },
        // sex: {
        //     type: Number,
        //     required: true,
        //     min: 0,
        //     max: 1,
        // },
        // age: {
        //     type: Number,
        //     required: true,
        //     min: 18,
        //     max: 100,
        // },
        // wx: {
        //     type: String,
        // },
        // qq: {
        //     type: String,
        // },
        // head_photo: {
        //     type: String,
        //     required: true,
        // },
        // photo_gallery: {
        //     type: [String],
        // },
        // personalized_signature: {
        //     type: String,
        // },
        // vip: {
        //     type: Number,
        //     default: 0,
        // },
        // work: {
        //     type: String,
        // },
        // height: {
        //     type: String,
        // },
        // measurements: {
        //     type: String,
        // },
        // hobby: {
        //     type: String,
        // },
        // tel: {
        //     type: String,
        // },
        // ip: {
        //     type: String,
        // },
        // address: {
        //     type: String,
        // },
        // register_time: {
        //     type: Date,
        //     default: Date.now(),
        // },
        // last_login_time: {
        //     type: Date,
        //     default: Date.now(),
        // },
        // enable_flag: {
        //     type: Number,
        //     default: 1,
        // }
    }
);

module.exports = mongoose.model(table, userSchema);