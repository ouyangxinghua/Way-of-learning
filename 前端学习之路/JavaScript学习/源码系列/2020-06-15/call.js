Function.prototype.mycall = function () {
    let [ctx, ...arg] = [...arguments];
    if (!ctx) {
        ctx = typeof window === 'undefined' ? global : window;
    }
    ctx.fn = this;
    ctx.fn(...arg);
    delete ctx.fn
}
Function.prototype.myapply = function () {
    let [ctx, arg] = [...arguments];
    if (!ctx) {
        ctx = typeof window === 'undefined' ? global : window;
    }
    ctx.fn = this;
    ctx.fn(...arg);
    delete ctx.fn
}
Function.prototype.mybind = function () {
    let [ctx, ...arg] = [...arguments];
    if (!ctx) {
        ctx = typeof window === 'undefined' ? global : window;
    }
    ctx.fn = this;
    return function () {
        ctx.fn(...arg);
        delete ctx.fn;
    }
}


var foo = {
    value: 'ouyang'
}

function bar() {
    console.log(this.value, arguments[0], arguments[1])
}

bar.mycall(null, 'xinghua', 'jinmengyao')
// bar.myapply(foo, ['xinghua', 'jinmengyao'])
// bar.mybind(null, 'xinghua', 'jinmengyao')()
// console.log(foo)

// console.log(this)