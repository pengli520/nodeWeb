/*
 * @Author: your name
 * @Date: 2021-05-26 15:08:51
 * @LastEditTime: 2021-05-26 15:09:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nodeWeb\src\sign.js
 */
import crypto from 'crypto';
import moment from 'moment';
class SignApi {
    constructor(data, c, act){
        console.log(moment().format('YYYYMMDDHHmmss'), crypto);
        this.data = data
        this.params = {
            c: c,
            act: act,
            partnerCodeKey: '993e15e328dbc766dcc2218725130c0d'
        }

    }
    // 字典排序 return data串
    ksort() {
        const arr = [];
        let str = '';
        for (const b in this.data) {
            arr.push({
                key: b,
                value: this.data[b]
            });
        }
        const sort = (a, b) =>{
            return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
        }
        arr.sort(sort);
        arr.map(item => {
            str+=`${item.key}=${item.value}&`
        });
        // 处理URL编码和java、PHP不一致的问题
        str = str.replace(/%20/g, '+')
        
        return str.substr(0, str.lastIndexOf('&'))
    }

    getSign() {
        // 时间 + md5秘钥 + 控制器 + 方法 + data串
        let str = '';
        const timestamp = moment().format('YYYYMMDDHHmmss');
        str = timestamp + crypto.createHash('md5').update(this.params.partnerCodeKey)
        .digest('hex') +
        this.params.c +
        this.params.act +
        this.ksort();

        this.params.timestamp = timestamp;
        this.params.signature = crypto
        .createHash('md5')
        .update(str)
        .digest('hex')
        .toUpperCase();
        delete this.params['partnerCodeKey'];
        return this.params;
    }
}

export default SignApi;