## Promise  promise 优先于 setTimeout 微任务和宏任务 
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

1. Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
2. 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

3. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。它的英语意思就是“承诺”，表示其他手段无法改变。
4. Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。
只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）
5. Promise实例的状态变为resolved，就会触发 then方法 绑定的回调函数。
## then链式调用
```
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```
上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用funcA，如果状态变为rejected，就调用funcB。

6. then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
7. then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
8. Promise.prototype.catch   方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
9. Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
10. 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
```
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

```
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

## Promise.prototype.finally()
finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

## Promise.all()
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

## Promise.race()
1. 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

## Promise.resolve()

## Promise.try() 


# async await  事件循环和回调队列  https://segmentfault.com/a/1190000015057278?utm_source=tag-newest

## 
1. async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。
2. 我们都知道Promise是一个立即执行函数，但是他的成功（或失败：reject）的回调函数resolve却是一个异步执行的回调。当执行到resolve()时，这个任务会被放入到回调队列中，等待调用栈有空闲时事件循环再来取走它。


## promise存在的问题
promise一旦执行，无法中途取消
promise的错误无法在外部被捕捉到，只能在内部进行预判处理
promise的内如何执行，监测起来很难
正是因为这些原因，ES7引入了更加灵活多变的async，await来处理异步。