# Map()方法
JavaScript的默认对象表示方式{}可以视为其他语言中的Map或Dictionary的数据结构，即一组键值对。
但是JavaScript的对象有个小问题，就是键必须是字符串。但实际上Number或者其他数据类型作为键也是非常合理的。
为了解决这个问题，最新的ES6规范引入了新的数据类型Map。

Map是一组键值对的结构，具有极快的查找速度。
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95

var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined

由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88

# set()方法
Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。
要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
重复元素在Set中自动被过滤：
通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：
通过delete(key)方法可以删除元素：

## Map和Set是ES6标准新增的数据类型，请根据浏览器的支持情况决定是否要使用。

const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
console.log([new Set(numbers)])  //输出[ Set { 2, 3, 4, 5, 6, 7, 32 } ]
console.log([new Set(numbers)])  //输出[ 2, 3, 4, 5, 6, 7, 32 ]

数据结构，能使用map不使用数组 
对数据要求高，保证每个数据的唯一性，使用set
优先使用map和set放弃传统的数组和object


ES6又新增了两个数据类型，set,map.既然新增了，就会有可取之处，或者是说为了解决什么问题而新增。
1.set的出现就解决了array里面有重复数据的情况
2.map的出现就可以解决object的属性只能为字符串的问题
对于set和map的学习，我建议分别对应着array，object一起学习。

ES5中的数据结构，主要是用Array和Object。在ES6中主要新增了Set和Map数据结构。到目前为止，常用的数据结构有四种Array、Object、Set、Map。
数据结构主要围绕四个点：增、查、改、删

1、Map的API更加简单，Array需要遍历才能进行查、改、删操作

注意：
1、map成本最低
2、对数据做引用（上例中的obj）
3、在开发过程中，涉及到数据结构，能使用Map不使用数组，尤其是复杂的数据结构。如果数据的要求比较高，强调唯一性，就使用Set，放弃使用Object做存储。
4、在数据结构中优先考虑Map、Set，放弃数组和Object。

## 1、Array Object set Map 的区别
ES5中的数据结构，主要是用Array和Object, 在ES6中主要新增了Set和Map数据结构。到目前为止，常用的数据结构有四种Array、Object、Set、Map。
在了解set,Map之前, 先对比一下它们之间的区别, 以帮助大家 更好的理解和学习set, Map。

在est5中开发者使用对象属性来模拟。set多用于检查键的存在，map多用于提取数据。
ES6提供了Set数据结构，它类似于数组，但是存储的元素都是唯一的，这里的唯一指的是他们存储的内存位置是唯一。


