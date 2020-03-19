// var a = {
//     name: 'ouyang',
//     age: {
//         a : '1'
//     }
// };
// var b = a; //赋值
// // var b = Object.assign({}, a); //浅拷贝
// // var b = JSON.parse(JSON.stringify(a)); //深拷贝
// b.name = 'xinghua',
// b.age.a = '2'
// console.log(a,b)


// js内存模型  https://juejin.im/post/5e398ddaf265da57455b310d

// let  您可以更改内存地址。
// const  不允许您更改内存地址。
// const arr = [1,2]   
// arr.push(3) 
// arr = [2,3]  //Assignment to constant variable  所以以后在开发中，尽量使用const去声明引用类型，那样我们就不能改变他的内存地址。

// 用let const的好处(在开发中可以抛弃var 而使用let const去定义变量和常量)
// 1. 太过自由带来 bug。
// 2. 用 const 声明的变量必须在声明时进行初始化，这迫使编码人员经常在范围方面考虑周全。这最终导致更好的内存管理和性能。
// 3. 别人通过您的代码就像和你交流一样，哪些变量是不可变的，哪些变量可以重新分配。
// console.log(n)
// var n = 1;
// let m = 2;
// const p = 3;


// es6中新数据类型Symbol的用处       https://www.php.cn/js-tutorial-416311.html
// const s1 = Symbol('debug');
// const aa = Symbol('debug')
// const str = 'debug';
// const s2 = Symbol('xxyy');

// console.log(s1 === str); // false
// console.log(s1 === aa);  //false
// console.log(s1 === s2); // false
// console.log(s1, aa); // Symbol(debug)

// symbol 还有另一个重要的用途,它们可以用作对象中的键  防止属性名称冲突