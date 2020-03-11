/** 防抖
 *  func wait
 */
export function debounce(func, wait){
  var result, timeout;
  return function() {
    // this
    // 参数
    var context = this;
    var args = arguments;
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      result = func.apply(this, args)
    }, wait);
    return result;
  }
}
// 可以用于装饰的 防抖
// 装饰器都是函数
export function  decDebounce(wait){
  return function(target, key, descritor){
    var callBack = descritor.value;
    var fn = debounce(callBack, wait);
    descritor.value = fn;
  }
}

export function decArrowDebounce(wait) {
  return function (target, key, descritor) {
    // 拿到原来的
    var callBack = descritor.initializer && descritor.initializer();
    var fn = debounce(callBack, wait);
    // value 属性 -> 方法
    // get 方法 -> 属性
    // descriptor.value
    // return {

    // }
    // 改变原来的 || 返回一个新的
    // 返回一个新的
    return {
      configurable: true,
      get: function() {
        return fn;
      }
    }
  }
}
// hoc 高阶组件 装饰整个组件
// class 
export function decDisplayName(displayname) {
  return function(target) {
    target.displayName = displayname;
  }
}

class Base{
  a() { // a为方法
    console.log('a')
  }
  b = () => { // b为属性
    console.log('b')
  }
}

const base = new Base()
console.log('base', base)