// new promise 会立即执行， then会分发到微任务,只要到了then那一步就是异步的了，会先执行同步代码
// setTimeout(function () {
//     console.log('three');
// }, 0);
// new Promise((resolve,reject) => {
//     console.log('ouyang')
//     resolve('成功')
// }).then(() => {
//     console.log('xinghua')
// })
// Promise.resolve().then(function () {
//     console.log('two');
// });

// console.log('one');
// 输出结果
// ouyang
// one    
// xinghua
// two    
// three  


// function a() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('111')
//             // setTimeout(() => {
//             //     console.log('666')
//             // },3000)
//             resolve('1')
//         }, 4000);
//         // resolve()
//     })
// }
// function b(val) {
//     const a = 1;
//     const b = 2;
//     // for (let i = 0; i < 5; i++){
//     setTimeout(() => {
//         console.log('222' + val)
//     }, 2000);
//     // resolve([a,b])
//     // if(i === 4){
//     //     resolve([a,b])
//     // }
//     // }
// }
// function c() {
//     setTimeout(() => {
//         console.log('333')
//     }, 1000);
// }
// a().then(b, undefined).then(c, undefined)
// 444,555,222,333,111


// var arr = [
//     {name:'zopp',age:0},
//     {name:'gpp',age:18},
//     {name:'yjj',age:8}
// ];
// console.log(JSON.parse(JSON.stringify(arr)))
// function compare(property){
//     return function(a,b){
//         var value1 = a[property];
//         var value2 = b[property];
//         return value1 - value2;
//     }
// }
// console.log(arr.sort(compare('age')))


//模拟ajax异步操作1
function ajax1() {
    const p = new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log(1)
            resolve('ajax 1 has be loaded!')
        }, 2000)
    })
    return p

}
//模拟ajax异步操作2
// function ajax2() {
//     const p = new Promise((resolve, reject) => {
//         setTimeout(function () {
//             console.log(2)
//             resolve('ajax 2 has be loaded!')
//         }, 1000)
//     })
//     return p
// }
// // 等待两个ajax异步操作执行完了后执行的方法
// // await关键字只能用在aync定义的函数内。async函数会隐式地返回一个promise，该promise的reosolve值就是函数return的值
// async function myFunction() {
//     const x = await ajax1()
//     console.log(x)
//     const y = await ajax2()
//     //等待两个异步ajax请求同时执行完毕后打印出数据
//     console.log(x, y)
//     return y
// }
// myFunction().then((val) => {
//     console.log(val)
// })

// ajax1().then(() => {
//     ajax2()
// })

//js异步回调Async/Await与Promise区别  https://blog.csdn.net/weixin_42470791/article/details/82560734  建议抛弃promise写法而改用async await来解决异步问题


// 你很可能遇到过这样的场景，调用promise1，使用promise1返回的结果去调用promise2，然后使用两者的结果去调用promise3。你的代码可以写的如此简洁:
// const makeRequest = async () => {
//     const value1 = await promise1()
//     const value2 = await promise2(value1)
//     return promise3(value1, value2)
// }
// function a() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('1')
//             resolve()
//         }, 2000)
//     })
// }
// async function b() {
//     for (let i = 0; i < 5; i++) {
//         await a()
//     }
//     console.log('ouyang')
// }
// b()  // 1 1 1 1 1 ouyang


// 用async 并发请求数据
async function logInOrder(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
    }
}
// 上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。
async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);  //因为有await在，所以会等待前面的所有ajax请求结束才会执行await textPromise这段代码，所以是可以读取到的，不会存在还没请求完就读取数据的情况
    }
}
// 上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。

// https://www.jianshu.com/p/98bfa80c6ae7   用async await相对于promise的优点
// https://www.jianshu.com/p/e0778b004596   理解 ES6 Generator 函数   yield的原理是靠驱动    Promises的原理是等待


// promise的串行和并行
// 并行执行
function makePromise(value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(value)
            resolve();
        }, 1000)
    })
}
let promises = [1, 3, 4, 5, 6].map((item, index) => {
    return makePromise.bind(null, item)  //bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
});
console.log(promises)
Promise.all(promises)
    .then((res) => {
        console.log('done', res)
    })
    .catch(() => {
        console.log('error')
    })
串行执行
function print(value) {
    return value
}
async function b() {
    for (let i = 0; i < 5; i++) {
        await promises[i]()
    }
    console.log('ouyang')
}
b() // 1 3 4 5 6 ouyang


