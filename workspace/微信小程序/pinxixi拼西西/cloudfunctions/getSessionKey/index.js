// 云函数入口文件
const cloud = require('wx-server-sdk');
const request = require('request');
// 加密的模块
const crypto = require('crypto')
const env = 'vant-cloud-s8796'
cloud.init()
const db = cloud.database({ env })
const getSessionKey = function(code) {
  return new Promise((resolve, reject) => {
    // GET https://api.weixin.qq.com/sns/jscode2session
    // ?appid=APPID&secret=SECRET
    // &js_code=JSCODE
    // &grant_type=authorization_code

    // json true 响应体 转为 json 格式的
    request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      qs: {
        appid: 'wx67d280fad061e04d',
        secret: 'dfb2b4921880f558a32ec22ce6303dde',
        js_code: code,
        grant_type: 'authorization_code'
      },
      json: true
    }, (err, res, body) => {
      if (err) {
        reject(err)
      }
      resolve(body)
    })
  })
}
// 云函数入口函数
exports.main = async (event, context) => {
  // 捕获代码错误
  try {
    const { code } = event;
    const weixinRes = await getSessionKey(code);
    const { openid, session_key } = weixinRes;
    // 1. 创建一个 哈希加密算法
    // 2. 对谁加密
    // 3. 以什么格式输出 hex 16进制
    const skey = crypto.createHash('sha1')
    .update(session_key, 'utf8')
    .digest('hex')
    // 保存在服务端的一个信息
    // 返回 session key
    return {
      skey: session_key
    }
  } catch (error) {
    return {
      error
    }
  }
}
