Array.prototype.mySome = function(fn){
    let arr = this;
    let flag = false;
    for(let i = 0; i < arr.length; i++){
        // console.log(fn.call(arr, arr[i]), arr[i])
        if(fn.call(arr, arr[i])) return flag = true;
    }
    return flag;
}
Array.prototype.myEvery = function(fn){
    let arr = this;
    let flag = true;
    for(let i = 0; i < arr.length; i++){
        // console.log(fn.call(arr, arr[i]), arr[i])
        if(!fn.call(arr, arr[i])) return flag = false;
    }
    return flag;
}


// let a = [1,2,3,4,5]
// let b = a.mySome(item => {
//     return item === 7
// })
// console.log(b)

let a = [1,2,3]
// let b = a.mySome(item => {
//     console.log(item)
//     if(item === 3) return false;
// })
// console.log(b)

let b = a.myEvery(item => {
    // console.log(item)
    // return item === 1
    if(item === 4){
        return false;
    }else {
        return true
    }
})
console.log(b)