
// var str = 'abcabcbb'
// var lengthOfLongestSubstring = function (s) {
//   var len = s.length;
//   var result = null;
//   var arr = s.split('');
//   // console.log(arr)
//   for (i = 0; i < len; i++) {
//     var newArr = [arr[i]];
//     console.log(newArr)
//     if (arr[i] !== arr[++i]) {
//       newArr.push(arr[++i])
//     } else {
//       // return newArr
//     }
//   }
//   return newArr

// };
// console.log(lengthOfLongestSubstring(str))
// lengthOfLongestSubstring(str)

// var str = 'abcabcbb'
// var lengthOfLongestSubstring = function(s) {
//   var str="" //存放无重复子串
//   var size=0 //当前最长无重复子串的长度
//   for(var i=0,len=s.length;i<len;i++){
//       var char=s.charAt(i)
//       // console.log(char);
//       var index=str.indexOf(char)
//       console.log(index)
//       if(index==-1){
//           str+=char
//           size=size<str.length?str.length:size
//       }else{
//         console.log(str,char, index)
//           str=str.substr(index+1)+char
//       }
//   }
//   return size
// };
// console.log(lengthOfLongestSubstring(str))

// str.indexOf(searchString,startIndex);  返回子字符串第一次出现的位置，从startIndex开始查找，找不到时返回-1
// str.lastIndexOf(searchString,startIndex);  从右往左找子字符串，找不到时返回-1

var lengthOfLongestSubstring = function(s) {
  let resultLength = 0
  function hasEchoChar(str){
    return new Set(str).size !== str.length ? true : false
  }
  let begin = 0, end = 1;
  while(end <= s.length) {
    if (!hasEchoChar(s.slice(begin, end))) {
      end - begin > resultLength ? resultLength = end - begin : null;
      end++
    } else {
      begin++ 
    }
  }
  return resultLength
};