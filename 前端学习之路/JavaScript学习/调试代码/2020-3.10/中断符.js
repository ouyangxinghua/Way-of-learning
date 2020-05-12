// https://www.cnblogs.com/zhangym118/p/6438702.html    return、continue、break 的区别
// https://blog.csdn.net/adley_app/article/details/84584943
// for(let i = 0; i < 10; i++){
//     console.log(i)
//     if(i === 5) continue; //本次循环后面的代码不会执行了, 但是break和return是终止本次循环
//     console.log('ouyang')
// }

// var a = [[1,2,3],[4,5,6],[7,8,9]]
// for(let i = 0; i < a.length; i++){
//     for(let j = 0; j < a[i].length; j++){
//         console.log(a[i][j]);
//         if(a[i][j] === 1){
//             return;
//         }
//     }
// }
var a = [1, 2, 3, 4, 5, 6]
var b = a.map(item => {
    console.log(item)
    if(item === 2) return; //不能退出
})
console.log(a)

// for(let item of a){
//     console.log(item)
//     if(item === 2) continue; // for of return可退出
//     console.log('ouyang')
// }


// let b = a.some(item => {
//     console.log(item)
//     if(item === 3) return false;
// })
// console.log(b)

// let b = a.every(item => {
//     console.log(item)
//     if(item === 2){
//         return false; 
//     }else {
//         return true
//     }
// })
// console.log(b)

// try {
//     a.forEach((item, index) => {
//         console.log(item)
//         if (item === 3) {
//             throw new Error('error') //用从方法中断forEach的执行
//         }
//     })
// } catch (error) {
//     console.log(error)
// }

// console.log('ouyang')


// 数组的some和every可解决forEach无法中断的缺点

