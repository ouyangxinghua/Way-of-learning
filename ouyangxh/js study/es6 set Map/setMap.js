// let key1 = 12;
// let value1 = 'test';
// let m1 = new Map(); // m1: Map {}
// let m2 = new Map([['ou', 'yang'],['xing', 'hua']]); // m2: Map { 12 => 'test' }
// console.log(m2.size)
// console.log(m1);
// console.log(m2);

// var m = new Map(); // 空Map
// m.set('ouyang', 21); // 添加新的key-value
// console.log(m); //Map { 'ouyang' => 21 }
// m.set('ouyang', 22)
// console.log(m); //Map { 'ouyang' => 22 }

// let m2 = new Map([[12, 'yang']])
// console.log(m2.get(12)) // 返回yang
 
// let m2 = new Map([[12, 'yang'],['xing', 'hua']])
// var iterator1 = m2.forEach(); 
// console.log(iterator1)

// let Data = new Map();
// let objKey = { num:10 };
// let obj = {
//   num:5
// }
// Data.set("a", 1);
// Data.set("b", 2);
// Data.set("c", 3);
// Data.forEach(function (value,key) {
//   console.log(value*this.num); // 输出5 10 15
// }, obj)

// const s = new Set();

// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

// console.log(s.size) // 输出4
// for (let i of s) {
//   console.log(i);
// }
// 2 3 5 4

// const s = new Set()
// s.add(1).add(2).add(2)
// console.log(s) // Set { 1, 2 }

// s.size // 2

// s.has(1) // true
// s.has(2) // true
// s.has(3) // false

// s.delete(2)
// console.log(s) //Set { 1 }
// s.size  // 1
// s.has(2) // false

// const set = new Set(['a', 'b', 'c']);

// for (let item of set.keys()) {
//   console.log(item); // a b c
// }

// for (let item of set.values()) {
//   console.log(item); // a b c
// }

// for (let item of set.entries()) {
//   console.log(item);
// }
// // 因为键名和键值是同一个值,所以输出下面内容
// // ["a", "a"]
// // ["b", "b"]
// // ["c", "c"]
// set.forEach((value, key) => console.log(key + ' : ' + value))
// // a: a
// // b: b
// // c: c
// var arr = [55, 44, 65];
// var set = new Set(arr);
// console.log(set) // Set { 55, 44, 65 }
// console.log(set.size === arr.length);
// console.log(set.has(65));
