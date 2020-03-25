// https://www.qdtalk.com/2019/01/09/javascript-async-5/         关于引用类型打印问题的文章，跟异步有关系，之前的新申办问超哥的打印问题类似。
const json = { a: 1, b: 2 };
console.log(json);  // {a: 1, b: 2} a: 3 b: 2 __proto__: Object  浏览器才会这样
json.a = 3; // 在console.log 后面改的但是却能先打印出来  console.log在打印应用类型的时候，可能会不太靠谱
// 但是  拿同样的代码放到node环境下跑你就会发现打印出的是{a: 1, b: 2}
// 事实上，执行结果是一样的，只不过你看到的不一样罢了！原因就出在浏览器控制台所见不一定为实。
// 实际上相当于一种懒加载，这也是为什么你可以在控制台无限查看Object的prototype了。
// 其实在 console.log 执行的时候，chrome 会对 log 的对象求一次值，打印出来是 Object（此时打印的相当于一个快照），可以继续展开的。
// 但当你展开控制台中的 Object 的时候，chrome 又会对它求一次值，这一次是显示它的属性。所以才会有前后打印的东西不一样的情况发生，因为对象引用的实体的值改变了。

// 以上案例可通过一下代码测试  分两次测试，一次立即展开，一次等定时器结束后展开，会发现a.a 的值不一样
// https://blog.csdn.net/tingyugetc11/article/details/77569010
var a = {a: 1}
console.log(a);
setTimeout(() =>{a.a = 20;console.log('ouyang')}, 5000)