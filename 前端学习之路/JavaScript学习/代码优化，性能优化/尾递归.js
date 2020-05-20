// // 普通写法， 缺点是n太大会内存溢出
// function leijia(n){
//     return n <= 1 ? 1 : arguments.callee(n-1) + arguments.callee(n-2)
// }
// console.log(leijia(31))
// // 尾递归该进版
// function leijia2(n, a1, a2){
//     if(n < 1){ return a1};
//     return arguments.callee(n-1, a2, a1 + a2)
// }
// console.log(leijia2(200, 1, 1))

// 阶乘普通递归写法
// function jiecheng(n){
//     return n === 1 ? 1 : n * arguments.callee(n-1)
// }
// console.log(jiecheng(300))
// 阶乘尾递归改进版
function jiecheng2(n, total){
    if(n === 1){ return total};
    return arguments.callee(n - 1, n * total)
}
console.log(jiecheng2(5, 1))
