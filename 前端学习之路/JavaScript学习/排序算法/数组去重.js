//方法一
// var arr= [1,2,2,3,3,6,7,9,4,5,1,3,7,3,3,6,3,4,8,0,5];
// var newarr = [];
// var have = true;
// for(var i = 0; i < arr.length; i++){
//     have = true;
//     for(var j = 0; j < newarr.length; j++){
//         if(newarr[j] == arr[i]){
//             have = false;
//         }
//     }
//     if(have){
//         newarr.push(arr[i]);
//     }
// }
// console.log(newarr);

// 方法二
// var arr1 = [1,2,3,4,4,2,2,6,9,1,0];
// var obj = [];
// arr1.forEach((e,i)=>{ //把arr的信息统计到obj里面
//     if(obj[e]===undefined){ //其实是利用对象属性是否存在做了一层遍历
//         obj[e] = 1
//     }else{
//         obj[e]++
//     }
// });
// console.log(Object.keys(obj))

//数组去重
// var newArr = arr1.reduce(function (prev, cur) {
//     prev.indexOf(cur) === -1 && prev.push(cur);
//     return prev;
// },[]);
// console.log(newArr);

// let arr = [[0, 1, 4], [2, 3], [4, 5]]
// let newArr = arr.reduce((pre,cur)=>{
//     return pre.concat(cur)
// },[])
// console.log(newArr); // [0, 1, 2, 3, 4, 5]

// let arr = [1,[2,[4,5]]];//true
// let arr1 = [1,[2,3,4]];//true
// let arr2 = [1,2,3];//true
// console.log(Array.isArray(arr));

// var result = [
//     {
//         subject: 'math',
//         score: 10
//     },
//     {
//         subject: 'chinese',
//         score: 20
//     },
//     {
//         subject: 'english',
//         score: 30
//     }
// ];

// var sum = result.reduce(function(prev, cur) {
//     return  prev + cur.score;
// }, 10);
// console.log(sum) //60

//给一串数字排序
// var num = 6427813945325
// function descendingOrder(n){
//     return parseInt(String(n).split('').sort().reverse().join(''))
// }
// console.log(descendingOrder(num));

// 递归阶乘

// function add(n){
//     if(n<=1){
//         return Error;
//     }else{
//         for(let i=n-1;i>=1;i--){
//             return n *= i
//         }
//     }
// }
// console.log(add(-1));


// split的用法
// console.log("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB".split("WUB"));
//1.
// function songDecoder(song){
//     var arr = song.split("WUB")
//     var newArr = arr.filter(function(item){
//         return item.length>0;
//     })
//     console.log(newArr)
// }
// songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB");
//2.
// function songDecoder(song){
//     var arr = song.split("WUB")
//     return arr.filter(function(item){return item.length>0;}).join(" ");
// }
// console.log(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"));

// 不推荐，只能去掉首尾空格
// function songDecoder(song){
//     return  song.split("WUB").join(" ").trim();
// }
// console.log(songDecoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"));