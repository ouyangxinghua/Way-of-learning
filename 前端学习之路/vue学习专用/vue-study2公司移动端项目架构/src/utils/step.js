/**
 * create by zhangfx
 * @param {function} fn 顺序传入多个要执行的函数
 */
function Step () {
    const result = [];
    const len = arguments.length;
    console.log(len);
    if (len <= 0) {
        return Promise.reject(new Error({
            message: '传入数据不能为空！'
        }));
    } else if (len === 1) {
        return arguments[0]();
    } else {
        return new Promise((resolve, reject) => {
            chain(arguments).then(res => {
                result.push(res);
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    }
    /**
     * 顺序执行函数链方法
     * @param {array} arr 要执行的函数列表
     */
    function chain (arr) {
        let index = 0;
        let count = arr.length;
        let resultFn = arr[index];
        while (count > 1) {
            resultFn = next(resultFn, arr[index + 1]);
            count--;
            index++;
        }
        return resultFn();
    }
    /**
     * 整合两个函数返回一个promise链
     * @param {function} fn1 函数1
     * @param {function} fn2 函数2
     */
    function next (fn1, fn2) {
        return function () {
            return fn1().then(res => {
                result.push(res);
                return fn2()
            })
        }
    }
}

module.exports = Step;
