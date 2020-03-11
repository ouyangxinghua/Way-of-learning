# 你不知道的ES6系列: 增强版Array、Object之Set、Map数据结构

## 前言
笔者最近在深入学习ES6中, 在写代码的过程中用到了set,Map这两个ES6新增的数据结构, 深切感受到了它们的强大, 解决问题的能力。于是笔者决定写一篇文章总结一下。并分享给大家,希望能够对大家有帮助。这篇文章主要给大家介绍了关于ES6学习笔记之map、set与数组、对象对比的相关资料, 下面让我们一起走进set, Map的世界吧😄😄。

>温馨提示: Map和Set是ES6标准新增的数据类型，请根据浏览器的支持情况决定是否要使用。
## 1、Map解析
>JavaScript的默认对象表示方式{}可以视为其他语言中的Map或Dictionary的数据结构，即一组**键值对**。
但是**JavaScript的对象{}**有个小问题，就是**键必须是字符串**。但实际上Number或者其他数据类型作为键也是非常合理的。
为了解决这个问题，最新的ES6规范引入了新的数据类型Map。

#### Object和Map对比
>Object是字符串-值，Map是值-值

* Object键为string类型,Map的键是任意类型
* 手动计算Object尺寸,Map.size可以获取尺寸
* Map的排序是插入顺序
* Object有原型，所以映射中有一些缺省的键。可以理解为Map=Object.create(null)

#### 基本用法
```
// 初始化
let key1 = 12;
let value1 = 'test';
let m1 = new Map(); // m1: Map {}
let m2 = new Map([[key1, value1]]); // m2: Map { 12 => 'test' }
```
#### 实例的属性
##### 1、Map.size() 返回对象中所包含的元素个数
```
let m2 = new Map([['ou', 'yang'],['xing', 'hua']]);
console.log(m2.size) //输出2
```
#### 5种操作方法
##### 1、set(key, value) 向对象中添加新元素
```
var m = new Map(); // 空Map
m.set('ouyang', 21); // 添加新的key-value
console.log(m); //Map { 'ouyang' => 21 }
m.set('ouyang', 22)
console.log(m); //Map { 'ouyang' => 22 }
```
注意:由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉。
##### 2、get(key) 通过键值查找特定的数值并返回
```
let m2 = new Map([[12, 'yang']])
console.log(m2.get(12)) // 返回yang
```
##### 3、has(key) 如果键存在则返回true,否则false
```
let m2 = new Map([[12, 'yang']])
console.log(m2.has(12)); // true
console.log(m2.has(13)); // false
```
##### 4、delete(key) 通过键值移除相应的value值
```
let m2 = new Map([[12, 'yang']])
m2.delete(12)
console.log(m2) // Map {}
```
##### 5、clear() 将这个字典中的所有元素删除
```
let m2 = new Map([[12, 'yang'],['xing', 'hua']])
m2.clear()
console.log(m2) // Map {}
```
#### 4种遍历方法
在此之前有必要说一下迭代器的作用,
迭代器是一种特殊对象，这种对象具有以下特点:

1，所有对象都有一个next方法
2，每次调用next方法，都会返回一个对象，该对象包含两个属性，一个是value, 表示下一个将要返回的值。另一个是done，他是一个布尔值，用来表示该迭代器是否还有数据可以返回.
3，迭代器还会保存一个内部指针指向当前集合中的值

想深入了解迭代器的[点这里](https://www.cnblogs.com/pm-dongjian/p/5020079.html)

##### 1、keys() 返回一个新的 Iterator 对象。它包含按照顺序插入 Map 对象中每个元素的key值。
```
let m2 = new Map([[12, 'yang'],['xing', 'hua']])
var iterator1 = m2.keys(); 
console.log(iterator1); //[Map Iterator] { 12, 'xing' }
console.log(iterator1.next().value); // 12
console.log(iterator1.next().value); // xing
```
##### 2、values() 方法返回一个新的Iterator对象。它包含按顺序插入Map对象中每个元素的value值。
```
let m2 = new Map([[12, 'yang'],['xing', 'hua']])
console.log(m2.values()) // [Map Iterator] { 'yang', 'hua' }
```
##### 3、entries() 方法返回一个新的包含 [key, value]的 Iterator对象，返回的迭代器的迭代顺序与 Map对象的插入顺序相同。
```
let m2 = new Map([[12, 'yang'],['xing', 'hua']])
var iterator1 = m2.entries(); 
console.log(iterator1); //[Map Iterator] { [ 12, 'yang' ], [ 'xing', 'hua' ] }
```
##### 4、forEach() 方法将会以插入顺序对 Map 对象中的每一个键值对执行一次参数中提供的回调函数。
myMap.forEach(callback[, thisArg])
>1.必要参数, callback为每个元素所要执行的函数。
2.可选参数, callback执行时其 this 的值。

callback 函数有三个参数
>1.value -元素的值
2.key -元素的键
3.Map -当前正在被遍历的对象

下面请看看例子
```
let Data = new Map();
let objKey = { num:10 };
let obj = {
  num:5
}
Data.set("a", 1);
Data.set("b", 2);
Data.set("c", 3);
Data.forEach(function (value,key) {
  console.log(value*this.num); // 输出5 10 15
}, obj)
```
从上面的代码可以看出回调函数中this指向obj对象。

#### Map与其他数据结构的互相转换
##### 1. Map 转为数组
Map 转为数组最方便的方法，就是使用扩展运算符（...）。
```
const myMap = new Map()
   .set(true, 7)
   .set({foo: 3}, ['abc']);
    [...myMap]  // 输出 [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
``` 
##### 2. 数组 转为 Map
将数组传入 Map 构造函数，就可以转为 Map。
```
new Map([
   [true, 7],
   [{foo: 3}, ['abc']]
 ])
 // Map {
 //   true => 7,
 //   Object {foo: 3} => ['abc']
 // }
```
##### 3. Map 转为对象
如果所有 Map 的键都是字符串，它可以无损地转为对象。
```
function strMapToObj(strMap) {
   let obj = Object.create(null);
   for (let [k,v] of strMap) {
     obj[k] = v;
   }
   return obj;
 }
 
 const myMap = new Map()
   .set('yes', true)
   .set('no', false);
 strMapToObj(myMap)
 // { yes: true, no: false }
```
如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。
##### 4. 对象转为 Map
```
function objToStrMap(obj) {
   let strMap = new Map();
   for (let k of Object.keys(obj)) {
     strMap.set(k, obj[k]);
   }
   return strMap;
 }
 
 objToStrMap({yes: true, no: false})
 // Map {"yes" => true, "no" => false}
```
结合**数组**的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
```
const map0 = new Map()
   .set(1, 'a')
   .set(2, 'b')
   .set(3, 'c');
 
 const map1 = new Map(
   [...map0].filter(([k, v]) => k < 3)
 );
 // 产生 Map 结构 {1 => 'a', 2 => 'b'}
 
 const map2 = new Map(
   [...map0].map(([k, v]) => [k * 2, '_' + v])
     );
 // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```

**写到这里，Map的基本用法和应用以及讲完了，我相信应该可以满足大家日常使用的需求吧。下面来看看set数据结构吧~~**
## 2、Set解析

>1. ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成Set数据结构。
>2. Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
#### Array和Set对比
>都是一个存储多值的容器，两者可以互相转换，但是在使用场景上有区别。如下:
* Array的indexOf方法比Set的has方法效率低下
* Set不含有重复值（可以利用这个特性实现对一个数组的去重）
* Set通过delete方法删除某个值，而Array只能通过splice。两者的使用方便程度前者更优
* Array的很多新方法map、filter、some、every等是Set没有的（但是通过两者可以互相转换来使用）

### 基本用法
```
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x)) //添加元素;
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```

Set 函数可以接受一个**数组**（或者具有 iterable 接口的其他数据结构）作为参数，**用来初始化**。 **特点：**
1. 以数组为参数， 可以去重
2. 向 Set 加入值的时候，不会发生类型转换，所以4和"4"是两个不同的值。
```
//  以数组为参数
const set = new Set([1, 2, 3, 4, 4, '4'])
[...set]  // [1, 2, 3, 4, '4']
set.size  // 5

// 一个类似数组的带 iterable 接口的对象
const set = new Set(document.querySelectorAll('div'))
```

### Set 实例的属性和方法

Set 实例的属性和方法和Map 实例的属性和方法类似，下面简要介绍一下。

#### 实例的属性
##### 1、Set.size() 返回对象中所包含的元素个数
```
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x)) //添加元素;
console.log(s.size) // 因为不能有重复元素所以输出4
```
#### 4种操作方法
由于Set只有key,并不存储value(或者说键名和键值是同一个值),所以相对Map少了get()方法

1. add(value)：添加某个值，返回 Set 结构本身。
2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
3. has(value)：返回一个布尔值，表示该值是否为Set的成员。
4. clear()：清除所有成员，没有返回值。
```
const s = new Set()
s.add(1).add(2).add(2)
console.log(s) // Set { 1, 2 }

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
console.log(s) //Set { 1 }
s.size  // 1
s.has(2) // false
```

#### 4种遍历方法
**方法名和Map的遍历方法名一样，下面来看用法**

1. keys()：返回键名的遍历器
2. values()：返回键值的遍历器
3. entries()：返回键值对的遍历器
4. forEach()：使用回调函数遍历每个成员

keys方法、values方法、entries方法返回的都是**遍历器对象**。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```
const set = new Set(['a', 'b', 'c']);

for (let item of set.keys()) {
  console.log(item); // a b c
}

for (let item of set.values()) {
  console.log(item); // a b c
}

for (let item of set.entries()) {
  console.log(item);
}
// 因为键名和键值是同一个值,所以输出下面内容
// ["a", "a"]
// ["b", "b"]
// ["c", "c"]
set.forEach((value, key) => console.log(key + ' : ' + value))
// a: a
// b: b
// c: c
```
##### 遍历的应用
1. 去重
2. 实现并集（Union）、交集（Intersect）和差集（Difference）
```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...union].filter(x => !intersect.has(x)));
// Set {1}
```
如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。
```
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

##### 注意: Set使用上需要警惕的地方

>由于Set中元素的独一无二，根据内存地址来进行判断，所以如果有多个元素是引用型的话，尽管值相同，但是内存地址不同，那么在Set对象中也将会存储多份，和Map类似

#### Set与其他数据结构的互相转换
##### 1. Set集合转化Array数组
```
let set = new Set([1, 2, 3, 3, 4]);
let arr = Array.from(set)  //输出[1,2,3,4]
```
##### 2. Array数组转Set集合
```
var arr = [55, 44, 65];
var set = new Set(arr);
console.log(set) // Set { 55, 44, 65 }
console.log(set.size === arr.length);
console.log(set.has(65));
```

## 总结

通过笔者的解析,发现Set、Map这两种ES6新增的数据结构在一定程度解决了Object和Array的一些痛点。他让我们在选择数据结构去解决具体问题时又多了两种选择,在开发过程中，涉及到数据结构，能使用Map不使用数组，尤其是复杂的数据结构。如果数据的要求比较高，强调唯一性，就使用Set，放弃使用Object做存储。在数据结构中优先考虑Map、Set，放弃数组和Object。不过什么时候使用还是要看应用场景的啦😄。希望这篇文章能够对大家有所帮助😄。

最后容许小生附上我的[github地址](https://github.com/ouyangxinghua) 里面记录了我学习前端的点点滴滴，觉得有帮助的小哥哥小姐姐可以给个小星星哟😄**


参考文献</br>
[Javascript官方文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)</br>
[廖雪峰的官方网站](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)</br>
[set和Map阮一峰教程](http://es6.ruanyifeng.com/#docs/set-map)</br>