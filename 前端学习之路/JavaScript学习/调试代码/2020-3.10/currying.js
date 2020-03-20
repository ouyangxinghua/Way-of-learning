// Function.prototype.bind = function (context) {
//     var _this = this
//     var args = Array.prototype.slice.call(arguments, 1)
 
//     return function() {
//         return _this.apply(context, args)
//     }
// }
function add(){
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    let _args = Array.prototype.slice.call(arguments)
    console.log(arguments, _args);
}

// add(1)(2)(3)             // 6
// add(1, 2, 3)   // 10
// add(1)(2)(3)(4)(5)          // 15
// add(2, 6)(1)  
// add('1')('2')