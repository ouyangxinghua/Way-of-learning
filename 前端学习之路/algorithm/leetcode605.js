// 种花问题
// 示例 1:
// 输入: flowerbed = [1,0,0,0,1], n = 1  [0,1,0,1,0,1,0,1,0]
// 输出: True
// 示例 2:
// 输入: flowerbed = [1,0,0,0,1], n = 2
// 输出: False
function flower1(arr, n) {
    // 计数器
    let max = 0
    if(arr.length === 1 && arr[0] === 0){
        return max = 1;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            console.log('1111', i)
            if (i === 0 && arr[1] === 0) {
                console.log('2222', i);
                max++;
                i++
            } else if (arr[i - 1] === 0 && (arr[i + 1] === 0 || arr[i + 1] === undefined)) {
                max++;
                i++
                console.log('3333', i);
            }
        }
    }
    return max >= n
}
// console.log(flower1([0,0], 1))

function flower2(arr, n) {
    arr.unshift(0);
    arr.push(0);
    let max = 0;
    for (let i = 1; i < arr.length - 1; i++)  {
        if (arr[i - 1] === 0 && arr[i] === 0 && arr[i + 1] === 0)  {
            max++;
            i++;
        }
    }
    return max >= n;
}
console.log(flower2([0,0,0], 2))
