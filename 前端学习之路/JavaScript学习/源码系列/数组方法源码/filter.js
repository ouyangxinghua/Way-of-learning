let a = [1,2,3,4,5,6]
Array.prototype.myFilter = function(fn){
    let arr = this;
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        if(fn.call(arr, arr[i])){
            newArr.push(arr[i])
        }
    }
    return newArr
}

let b = a.myFilter((item) => {
    return item > 3
})
console.log(b)
