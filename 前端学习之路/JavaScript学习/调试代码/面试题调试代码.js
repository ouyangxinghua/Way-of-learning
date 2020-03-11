// function Person(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// const lydia = new Person("Lydia", "Hallie");
// const sarah = Person;

// console.log(lydia);
// console.log(sarah);
// console.log(Array.prototype)
// console.log(Object.prototype)
// console.log(String.prototype)

// var a = { age: 18}
// console.log(a == { age: 18})  //内存中位于不同位置 所以为false
// function getAge(...args) {
//     console.log(...arguments)
//     console.log(typeof args);
// }

// getAge(21,12);
// String.prototype.giveLydiaPizza = () => {
//     return "Just give Lydia pizza already!";
// };
// const name = "Lydia";
// console.log(name.giveLydiaPizza());
// const a = {};
// const b = { key: "b" };
// const c = { key: "c" };

// a[b] = 123;
// a[c] = 456;
// console.log(Object.keys(a)) //输出 [ '[object Object]' ]
// console.log(a[b]);
// 对象键自动转换为字符串。我们试图将一个对象设置为对象a的键，其值为123。
// 但是，当对象自动转换为字符串化时，它变成了[Object object]。 所以我们在这里说的是a["Object object"] = 123。 
// 然后，我们可以尝试再次做同样的事情。 c对象同样会发生隐式类型转换。那么，a["Object object"] = 456。
// 然后，我们打印a[b]，它实际上是a["Object object"]。 我们将其设置为456，因此返回456。

const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);

