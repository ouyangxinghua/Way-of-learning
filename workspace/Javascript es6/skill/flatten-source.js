function flatten(arr){
    if(!Array.isArray(arr)){
        return false;
    }
    // 1.递归将多层数组的扁平化分为 多个一维数组跟旁边的数字 concat 小问题
    // 2.递归退出条件 是不再有数组了
    const flattenArr = arr.reduce((prev,cur) => {
        return prev.concat(
            Array.isArray(cur) ? flatten(cur) : cur
        );
    },[])
    return flattenArr;
}
const arr1 = [99,0,33,[101,202,[303,404,[308]]],1,2];
console.log(flatten(arr1))