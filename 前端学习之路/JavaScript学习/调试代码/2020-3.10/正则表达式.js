function mobile(text) {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    return reg.test(text);
}
function mobile1(val) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return reg.test(val);
}
function mobile2(val) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(val);
}
console.log(mobile2('12345678986'))
// 15797955826
// 17611111111
// 12345678986