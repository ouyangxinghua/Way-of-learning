// Object.prototype.isDeepEqual = function(obj){
// 	var data1 = Object.getOwnPropertyNames(this);
//     var data2 = Object.getOwnPropertyNames(obj);
//     if (data1.length != data2.length) {
//         return false;
//     }
//     for (var i = 0; i < data1.length; i++) {
//         var key = data1[i];
//         if (this[key] !== obj[key]) {
//             return false;
//         }
//     }
//     return true;
// }
// var obj1 = {id:1,name:"张三",}
// var obj2 = {id:2,name:"李四"}
// var obj3 = {id:1,name:"张三",age:25}
// var obj4 = {id:1,name:"张三",}
// console.log(obj1.isDeepEqual(obj2));//false
// console.log(obj1.isDeepEqual(obj3));//false
// console.log(obj1.isDeepEqual(obj4));//true

// var a = 'abcdddefddgggggs'

// function max(str){
//     if (!str) return {}
//     let count = 0
//     let maxCount = 0
//     let cur = str[0]
//     let res;
//     for(let i = 0; i < str.length; i++){
//         let s = str[i]
//         if(s === cur){
//             count++
//             if(count > maxCount){
//                 res = count
//                 maxCount = count
//             }
//             if (count === maxCount) {
//                 res = count
//             }
//         }else {
//             count = 1;
//             cur = s;
//         }
//         console.log('---',res)
//     }
//     return res
// }
// console.log(max(a))
