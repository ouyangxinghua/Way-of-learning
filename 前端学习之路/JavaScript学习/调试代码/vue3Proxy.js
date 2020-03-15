// target： 所要拦截的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
// handler：一个对象，定义要拦截的行为

// const p = new Proxy(target, handler);
// https://segmentfault.com/q/1010000021048654
// https://juejin.im/post/5e69ee2be51d4527196d6a24
const p = new Proxy({}, function(){
    
})