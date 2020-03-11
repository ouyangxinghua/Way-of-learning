// 1. 因为整数不可遍历（not iterable），故先需将整数转换为字符串，从而为可遍历（iterable）对象，然后倒序遍历字符串，依次将值压入（push）结果数组中。
// 2. 然后，我们需要判断是否包含符号位。如果有符号位，就将该符号位放入结果数组的头部（head），若无符号位，则将最后一位压入结果数组中。
// 3. 将结果数组转换为整数，并判定其是否在指定范围内，若在，则返回该值，否则返回0。

var x = 1534236469
var reverse = function(x) {
    var num = Math.abs(x);
    var str = String(num)
    var result = str.split('').reverse().join('');
    for(i = 0; i < result.length; i++){
      if(result[i] !== 0){
        var index = i;
      }
    }
    console.log(index)
    console.log(result)
    if(x > 0 && str.slice(-1) !== 0) {
      return Number(result);
    }
    if(x > 0 && str.slice(-1) == 0){
      return Number(result.slice(0,index))
    }
    if(x < 0 && str.slice(-1) !== 0){
      return Number(result) / -1
    }
    if (x < 0 && str.slice(-1) == 0){
      return Number(result.slice(0,index)) / -1
    }
    if (x == 0) {
      return 0;
    }
    if(x >= 2^31-1 || x <= -2^31 ){
      return 0;
    }
};
var reverse = function(x) {
  var symbol = '+';
  var arr = (x + '').split('');
  if(arr[0] == '-'){
      symbol = arr.shift(); 
  }
  arr = arr.reverse();
  while(arr[0] == 0){
      arr.shift(); //如果最后一位是0, 则一直做
  }
  arr.unshift(symbol);
  var y = parseInt(arr.join(''));
  return y >= -Math.pow(2,31) && y <= Math.pow(2,31) - 1 ? y : 0;
  
};
console.log(reverse(x))
