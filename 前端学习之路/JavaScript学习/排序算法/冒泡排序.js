// 改进前
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        // 第i轮仅需比较length-1-i次
        for (var j = 0; j < arr.length - 1 - i; j++) {
            console.log(i,j)
            if (arr[j] > arr[j+1]) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    // 或者
    // for(let i = 0; i < len; i++){
    //     for(let j =  i + 1; j < len; j++){
    //         if (arr[i] > arr[j]) {        //相邻元素两两对比
    //             var temp = arr[j];        //元素交换
    //             arr[j] = arr[i];
    //             arr[i] = temp;
    //         }
    //     }
    // }
    return arr;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr));

// 改进后
// https://juejin.im/post/57dcd394a22b9d00610c5ec8#heading-16  排序算法文章