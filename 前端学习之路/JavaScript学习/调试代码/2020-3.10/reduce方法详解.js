// var num = [1,2,3,4,5];
// var res = num.reduce(function(total,num){
//     console.log(total)
//     return total-num;
//     //return total + Math.round(num);//对数组元素四舍五入并计算总和
// },18);
// console.log(res)//15
// 统计一个数组中有多少个不重复的单词：
// var arr = ["apple","orange","apple","orange","pear","orange"];
// function a(arr){
//     let newArr = [];
//     // for(let i = 0; i < arr.length; i++){
//     //     if(newArr.indexOf(arr[i]) === -1){
//     //         newArr.push(arr[i])
//     //     }
//     // }
//     newArr = [...new Set(arr)]
//     // return `该数组中有${newArr.length}个不重复的单词`;
//     return newArr
// }

// console.log(a(arr))

// var arr1 = ["apple","orange","apple","orange","pear","orange",'sd','sd'];
// function a(arr){
//     var obj = {};
//     for(let i = 0; i < arr.length; i++){
//         let key = arr[i];
//         obj[key] = (obj[key] + 1) || 1;
//     }
//     console.log(obj)
//     var arr2 = [];
//     for(key in obj){  //for in 遍历的是下标
//         if(obj[key] === 1){
//             arr2.push(key)
//         }
//     }
//     console.log(arr2)
// }
// a(arr1)
// 用js reduce累加器方法会代码会更简单且简洁
// var arr1 = ["apple", "orange", "apple", "orange", "pear", "orange", 'sd', 'sd'];
// function a(arr) {
//     var ouyang = arr.reduce((prev, next) => {
//         console.log("prev:", prev);
//         console.log("next:", next);
//         prev[next] = (prev[next] + 1) || 1
//         return prev;
//     }, {})
//     return ouyang
// }
// console.log(a(arr1))


// reduce源码解析
// var arr1 = ["apple", "orange", "apple", "orange", "pear", "orange", 'sd', 'sd'];
// Array.prototype.myReduce = function(fn, init){
//     var len = this.length; //数组实例长度
//     var prev = init; //reduce的第二个参数，即累加器的初始值
//     var i = 0; //下标
//     if(init == undefined){
//         prev = this[0];
//         i = 1;
//     }
//     for(i; i < len; i++){
//         prev = fn(prev, this[i], i, this);
//     }
//     return prev;
// }
// var res = arr1.reduce((a,b,c,d) => {
//     // console.log(a,b,c,d)
//     a[b] = (a[b] + 1) || 1
//     return a;
// },{});
// console.log(res)

var arr1=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// sort源码解析  
// 1.srot()如果不带参数，是将按字母顺序对数组中的元素进行排序，也就是是按照字符编码的顺序进行排序
// 2.如果数组中为数字。JS中sort实现算法居然是O(n^2)的冒泡排序
Array.prototype.mySort = function(fn){
    var arr = this;
    var len = this.length;
    // for(let i = 0; i < len; i++){
    //     for(let j = 0; j < len-1-i; j++){
    //         if (arr[j] > arr[j+1]) {        //相邻元素两两对比
    //             var temp = arr[j+1];        //元素交换
    //             arr[j+1] = arr[j];
    //             arr[j] = temp;
    //         }
    //     }
    // }
    for(let i = 0; i < len; i++){
        for(let j =  i + 1; j < len; j++){
            console.log(i,j)
            if (arr[i] > arr[j]) {        //相邻元素两两对比
                var temp = arr[j];        //元素交换
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    if(fn(arr[0], arr[1]) < 0) return arr;
    if(fn(arr[0], arr[1]) > 0) return arr.reverse();

}
var res = arr1.mySort((a, b) => {
    return a - b
})
console.log(res)


