var fn1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ouyang'),
                resolve('1')
        }, 2000)
    })
}
var fn2 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('xinghua'),
                resolve('2')
        }, 3000)
    })
}
var fn3 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('jinmengyao'),
                resolve('3')
        }, 4000)
    })
}


function func(promises) {
    let flagFalse = 0;
    for (let i = 0; i < promises.length; i++) {
        try {
            promises[i]();
        } catch (err) { 
            console.log('kkkkkkkkkk')
            if (err) { flagFalse++ } 
        }
    }; 
    console.log(flagFalse)
    return flagFalse === promises.length ? '失败' : '成功'
} 

console.log(func([fn1, fn2, fn3]))