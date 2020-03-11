// codewars

// function getMiddle(s)
// {
//     var style = 0;
//     var len = s.length;
//     var index = 0;
//     len % 2 === 0 ? style = 0 : style = 1;
//     if(style === 0){
//         index = len/2 - 1;
//         return s.substr(index,2)
//     }else{
//         index = parseInt(len/2);
//         return s.substr(index,1);
//     }
// }
// var str = 'ouyaqpng'
// console.log(getMiddle(str));



// var data = new Date();
// const arr = [1,2,3,3,2,1,1,1,2]
// const strArray = ['javascript','python','php','java','c']
// const arr1 = 12345
// function findOdd(A) {
//     return A.reduce((l, r) => l ^ r);
// }
// console.log(arr1.toString().length);
// console.log(findOdd(arr))
// console.log(strArray.reverse());

// console.log(('str'+'ing').toString());

// console.log(("01|15|59").split("|"));

// function stat(strg) {
//     var len = strg.length;
//     var hour = [];
//     var min = [];
//     var sec = [];
//     for(let i =0;i<len;i++){
//         var str = strg[i].split("|");
//         var aa = hour.push(Number(str[0]));
//         var bb = hour.push(Number(str[1]));
//         var cc = hour.push(Number(str[2]));
//     } 

//     // return ("Range:" + "" + "Average" + "" + "Median" + "")
// }
// console.log(stat("01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"));

var student = new Object(); 
student.name = "Lanny"; 
student.age = "25"; 
student.location = "China"; 
var json = JSON.stringify(student); 
console.log(json); 
console.log(student);
// JSON.parse()【从一个字符串中解析出json对象】
// 例子：
// //定义一个字符串
// var data=’{“name”:“goatling”}’
// //解析对象​
// ​JSON.parse(data)
// 结果是：
// ​name:“goatling”
// JSON.stringify()【从一个对象中解析出字符串】
// var data={name:‘goatling’}
// JSON.stringify(data)
// 结果是：
// ‘{“name”:“goatling”}’

// 扩展运算符（ spread ）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。