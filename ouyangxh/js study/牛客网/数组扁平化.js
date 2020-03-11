var arr = [1,2,[3,4,5,[6,7,8],9],10,[11,12]];

var newArr = [];
function fn(arr) {
  arr.forEach(item => {
    // console.log(item)
    if(typeof item == 'number'){
      newArr.push(item)
    } else if(item instanceof Array){
      newArr.concat(fn(item))
    }
  });
  return newArr
}
console.log(fn(arr))
