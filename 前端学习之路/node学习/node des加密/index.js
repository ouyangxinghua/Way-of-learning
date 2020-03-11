var cryptoDes = require("./cryptoDes");
var userCode = 'ouyangxinghua'
var encrypt_text = cryptoDes.des.encryptByDES(userCode);  //DES加密
var decrypt_text = cryptoDes.des.decryptByDES(encrypt_text);
console.log(encrypt_text) 
console.log(decrypt_text)

