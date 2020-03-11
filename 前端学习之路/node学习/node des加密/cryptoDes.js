
var CryptoJS = require('./crypto-js');
// 省信处理某个接口 usercode要加密的需求 插件下载不了 故引入
// cryptoForApprApply 密钥
exports.des = {
  // 加密
  encryptByDES: function (message) {
    const keyHex = CryptoJS.enc.Utf8.parse('cryptoForApprApply');
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  // 解密
  decryptByDES: function (ciphertext, key) {
    var keyHex = CryptoJS.enc.Utf8.parse('cryptoForApprApply');
    // direct decrypt ciphertext
    var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

