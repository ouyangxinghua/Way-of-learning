// 给定一个整数数组，返回两个数字的索引，使它们相加到特定目标。
// 您可以假设每个输入只有一个解决方案，并且您可能不会两次使用相同的元素。
var NUMS = [2, 7, 11, 15]
var twoSum = function(nums, target) {
    var len = nums.length;
    for(i = 0; i < len; i++){
      for(j = i + 1; j < len; j++){
        if(nums[i] + nums[j] == target){
          return [i,j]
        }
      }
    }
    return false;
};
console.log(twoSum(NUMS, 8))
