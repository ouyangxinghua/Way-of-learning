Array.prototype.myMap = function(fn){
    let arr = this;
    let res = [];
    for(let i = 0; i < arr.length; i++){
        let data = fn.call(arr, arr[i] , i, arr, );
        res.push(data)
    }
    return res
}
var a = [1,2,3]
// let b = a.myMap((item,index) => {
//     console.log(index)
//     return item + 2 //由于return 中断的是fn的执行，所以并不能中断map的执行
// })
// console.log(b)

Array.prototype.myForEach = function(fn){
    let arr = this;
    for(let i = 0; i < arr.length; i++){
        fn.call(arr, arr[i] , i, arr)
    }
}
a.myForEach((item,index,arr) => {
    console.log(item, index, arr)
})
