var s = 'PAYPALISHIRING';
var numRows = 3;

var convert = function(s, numRows) {
  var map = {};
  var j = 0;
  if (numRows <= 1) {
      return s;
  }
  var boo = true;
  for (var i = 0; i < s.length; i++) {
      if (!map[j]) {
          map[j] = '';
      }
      map[j] = map[j] + s[i];
      if (boo) {
          j++;
          if (j >= numRows) {
              j = j - 2;
              boo = false;
          }
      } else {
          j--;
          if (j < 0) {
              boo = true;
              j = j + 2;
          }
      }
  }
  s = '';
  Object.keys(map).forEach(i => {
      s = s + map[i];
  });
  return s;
   
};

// arr.fill(value, start, end)
// value：填充值。
// start：填充起始位置，可以省略。
// end：填充结束位置，可以省略，实际结束位置是end-1。
// const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// arr3.fill(7, 2, 5)   =>  1,2,7,7,7,6,7,8,9,10,11


var convert = function(s, numRows) {
  const perGroup = numRows > 1 ? (numRows - 2) * 2 + 2 : 1
  const result = []
  let i
  for(i = 0; i < numRows; i++) {
    result[i] = []
  }
  for(i = 0; i < s.length; i++) {
    result[i % perGroup < numRows ? i % perGroup : numRows - (i % perGroup - numRows + 2)].push(s[i])
  }
  let resultStr = ''
  result.forEach(item => {
    item.forEach(str => {
      resultStr += str
    })
  })
  return resultStr
};