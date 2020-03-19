// target： 所要拦截的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
// handler：一个对象，定义要拦截的行为

// const p = new Proxy(target, handler);
// https://segmentfault.com/q/1010000021048654
// https://juejin.im/post/5e69ee2be51d4527196d6a24
const p = new Proxy({}, function(){
    
})

function add(x,y){
    return x + y;
}

var newFoo = add.bind(this, 3,5)
console.log(newFoo())

// 链式调用
function jia(str){
    // console.log('name:' + str)
    setTimeout(() => {
        console.log(str)
    }, Math.random()* 1000)
    return jia
}
jia('ouyang')('xinghua')('dkasl')  //此操作类似于连续promise连续.then 但是.then 里面是异步的，且并未用promise包装