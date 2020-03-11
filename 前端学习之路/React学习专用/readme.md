#
所以当你需要在constructor中访问this.props时，才需要设置super(props)
#
Refs 是访问到组件内部DOM节点唯一可靠的方法 
注意：不要在render或render之前对Refs进行调用

## 利用 parse() 方法和 stringify() 方法实现对一个对象的深拷贝。
```
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
}
```

Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性。
hasOwnProperty：是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
## 浅拷贝
```
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }

    return target;
}
```
