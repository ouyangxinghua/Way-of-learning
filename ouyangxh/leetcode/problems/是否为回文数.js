var num = 121;
var isPalindrome = function (x) {
  return String(x) == String(x).split('').reverse().join('') ? true : false
};
console.log(isPalindrome(num))