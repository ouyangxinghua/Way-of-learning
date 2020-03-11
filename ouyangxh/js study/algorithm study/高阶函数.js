// 用高阶函数
// const arr = [5,2,7,9,4,342,42,23,13]
// const newArr = arr.reduce((qqq,www) => {
//     return qqq + www;
// },100)
// console.log(newArr);



// 不用高阶函数
// const arr = [5,2,7,9,4,342,42,23,13]
// const arr1 = [5,2,7,9,4]
// const newArr = []
// let sum = 0;
// function number(arr){
//     for(let i = 0;i <arr.length;i++){
//         sum = sum + arr[i];
//     }
//     console.log(sum);
// }
// number(arr1)



// 函数作为参数
// function c(n,m){
//     return n + m;
// }
// function d(n,m){
//     return n*m;
// }
// function sum(a,b){
//     console.log(a/b)
// }
// sum(c(5,5),d(2,5));

// 将函数赋值给变量
// const aa = function(x){
//     return x * x;
// }
// console.log(aa(9))

// 创建自己的高阶函数map()函数
// const strArray = ['javascript','python','php','java','c']
// const numArray = [2,5,1,9,6]
// function mapArray(arr,fn){
//     const newArr = []
//     for(let i = 0;i < arr.length;i++){
//         newArr.push(fn(arr[i]))
//     }
//     return newArr;
// }
// const string = mapArray(strArray,function(item){
//     return item.length;
// })
// const number = mapArray(numArray,function(item){
//     return item*2
// })
// console.log(string)
// console.log(number)

// 闭包  变量提升 函数提升
function fn(){
    var a = 10;
    return function(){
        a++;
        console.log(a);
    }

}
console.log(fn());
var log = fn();
log();//11
log();//12
log();//13

function fnc(){
    var a = 10;
    // return function(){
        a++;
        console.log(a);
    // }
}
fnc();//11  执行完后变量立即销毁
fnc();//11
fnc();//11


// 立即执行函数和
(function aa(a){
    console.log(a);
}(100));

(function bb(a){
    console.log(a);
})(100);

var fnName=function(){
    console.log('Hello World1');
}();

(function fnName(){
    console.log('Hello World2');
})();

(function(){
    console.log('Hello World3');    
}());

-function(a){
    console.log(a);   //firebug输出123456,使用+运算符
}(123456);


var sum = (function() {
    var cache = {};     // 将cache放入函数内部，避免被其他地方修改
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        var a = 0;
        for (var i = 0; i < arguments.length; i++) {
            a += arguments[i];
        }
        return cache[args] = a;
    }
})();


// 函数的上下文就是函数中的this 函数的上下文是在函数调用的时候决定的

// 1 定时器调用函数（内部的this是window对象）
// 2 函数+圆括号直接调用（内部的this是window对象）
// 3 函数作为事件处理函数（内部的this是触发事件的元素）
// 4 对象 . 函数  this是这个对象
// 5 数组内的函数  this是这个数组

// tips： js 中定义的全局变量都是window的标量
//            arguments 调用函数时所传入的参数