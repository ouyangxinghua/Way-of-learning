// 全局变量太多，cache只为mult服务，全局变量空间的污染
// 函数里面的变量运行之后会消失  闭包可以解决这个问题
const mult = (function() {
    const cache = {};
    return function(...args){
        let key = Array.prototype.join.call(args,'');
        // for(key in)
        if(key in cache){
            console.log('之前算过的，不用在算了，值为')
            return cache[key];
        }
        let a = 1;
        for(let i = 0;i < args.length; i++){
            a = a * args[i];
        }
        cache[key] = a;
        return a;
    }
})()

console.log(mult(1,2,3));
console.log(mult(1,2,3));
console.log(mult(1,2,3));