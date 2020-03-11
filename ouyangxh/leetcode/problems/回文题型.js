// var str = "abccccdd"

// 最长回文子串
// var longestPalindrome = function (s) {
//   let n = s.length;
//   if(n == 0) return ''; //字符串为空则返回空
//   if(n == 1) return s;  //字符串为一个字符, 显然返回自身
//   let result = ''
//   for (let i = 0; i < n; i++) { //字符串长度超过2
//     for (let j = i + 1; j <= n; j++) {
//       let str = s.slice(i, j); //可得到所有子串
//       let f = str.split('').reverse().join(''); //对字符串利用数组方法倒序

//       if (str == f) { //判断是否为回文
//         result = str.length > result.length ? str : result;
//       }
//     }
//   }
//   return result;
// }
// console.log(longestPalindrome(str))
// let a = str.split('').reverse()
// let aa = a.join('')
// console.log(a,aa)、

// 动态规划
// var longestPalindrome = function(s) {
//   let len = s.length;
//   let result;
//   let i,j,L;
//   let dp=Array(len).fill(0).map(x=>Array(len).fill(0));
//   //console.log(dp);
//   if(len<=1){
//       return s
//   }
//   // 只有一个字符的情况是回文
//   for(i = 0;i<len;i++){
//       dp[i][i] = 1
//       result = s[i]
//   }

//   // L是i和j之间的间隔数（因为间隔数从小到大渐增，所以大的间隔数总能包含小的间隔数）
//   // i     j
//   // abcdcba.length = L   所以 L = j-i+1; => j = i+L-1;
//   for ( L = 2; L <= len; L++) {
//       // 从0开始
//       for ( i = 0; i <= len - L; i++) {
//               j = i + L - 1;
//           if(L == 2 && s[i] == s[j]) {
//               dp[i][j] = 1;
//               result = s.slice(i, i + L);
//           }else if(s[i] == s[j] && dp[i + 1][j - 1] == 1) {
//               dp[i][j] = 1
//               result = s.slice(i, i + L);
//           }

//       }
//   }
//   //console.log(result);
//   return result;
// }
// console.log(longestPalindrome(str))

// 最长的回文
// 1.
// var str = "abccccdd"
// const longestPalindrome = s => {
//   const words = new Map()
//   const max = s.length
//   let ans = 0
//   if (max === 0) {
//     return ans
//   }
//   for (let i = 0; i < s.length; i++) {
//     const w = s[i]
//     if (!words.get(w)) {
//       words.set(w, 0)
//     }
//     words.set(w, words.get(w) + 1)
//   }
//   console.log(words) //Map { 'a' => 1, 'b' => 1, 'c' => 4, 'd' => 2 }
//   let isOdd = false
//   for (let [key, value] of words) {
//     console.log( [key, value] )
//     if (value % 2 === 0) {
//       ans += value
//     } else {
//       isOdd = true
//       ans += (value - 1)
//     }
//   }

//   return isOdd ? ans + 1 : ans
// }
// console.log(longestPalindrome(str))//7

// 2. 
// function longestPalindrome(str) {
//   let palindromeStr = "";               //记录最长回文串
//   let tempPalindrome = "";              //记录当前回文串
//   for (let i = 0; i < str.length; i++) {      //i记录当前遍历字符串的开始位置，循环依次向后遍历
//     tempPalindrome = "";              //每次新的一轮开始时，将临时记录回文串的变量清空
//     for (let j = i; j < str.length; j++) {  //每次开始循环是以当前i所在的下标位置为开始遍历字符串的起始位置，直到遍历到结束位置
//       tempPalindrome += str.charAt(j);          //逐个增加字符串的长度
//       //将当前的字符串传入isPalindrome进行回文判断，如果是回文串，则判断当前回文串长度是否大于之前记录的最长回文串的长度，
//       // 如果大于之前的回文串，则更新之前的记录即可
//       if (isPalindrome(tempPalindrome) && tempPalindrome.length > palindromeStr.length) {         
//         palindromeStr = tempPalindrome;       //更新回文串
//       }
//     }
//   }
//   return palindromeStr;               //返回最终的最长的回文串
// }
// function isPalindrome(s) {               //判断是否为回文串
//   let rev = s.split('').reverse().join('');         //字符串逆转操作
//   return rev === s;
// }

// //测试
// console.log(longestPalindrome("ddabbade"));     //输出dabbad


// Manacher算法
// var str = 'ddabbade'
// const longestPalindrome = function (s) {
//   if (s.length == 1) {
//     return s
//   }
//   let str = '#' + s.split('').join('#') + '#'
//   let rl = []
//   let mx = 0
//   let pos = 0
//   let ml = 0
//   for (let i = 0; i < str.length; i++) {
//     if (i < mx) {
//       rl[i] = Math.min(rl[2 * pos - i], mx - i)
//     } else {
//       rl[i] = 1
//     }
//     while (i - rl[i] > 0 && i + rl[i] < str.length && str[i - rl[i]] == str[i + rl[i]]) {
//       rl[i]++
//     }
//     if (rl[i] + i - 1 > mx) {
//       mx = rl[i] + i - 1
//       pos = i
//     }
//     if (ml < rl[i]) {
//       ml = rl[i]
//       sub = str.substring(i - rl[i] + 1, i + rl[i])
//     }
//   }
//   return sub.split('#').join('').trim()
// }
// console.log(longestPalindrome(str))
// abccccdd
// a -> bccccdd
// b -> accccdd
