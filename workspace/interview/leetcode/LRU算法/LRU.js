// 不用每次都去硬盘里面查找了， 在内存中缓存
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.obj = {};  //key 
    this.arr = [];
}

LRUCache.prototype.get = function(key) {
    // key 为正值
    // 有 返回值
    // 设置为最近使用
    // 没有 -1
    var val = this.obj[key];
    // 容量不大的内存服务于最多的进程
    if(val > 0){
        var index = this.arr.indexOf(key);
        this.arr.splice(index,1);
        this.arr.unshift(key);
    }else{
        return -1;
    }
}
LRUCache.prototype.set = function(key,value) {
    if(this.obj[key]){
        this.obj[key] = value;
        // 更新
        // 最近使用，数组的最前面[0]
        // ? 之前的删除。
        var index = this.arr.indexOf(key);
        this.arr.splice(index, 1);
        this.arr.unshift(key);
    }
    // 如果有key就返回
    // 没有
    if(this.capacity === this.arr.length){
        // 放满了
        var k = this.arr.pop();
        // 最近最少使用
        this.obj[k] = undefined; 
    }
    this.obj[key] = value;
    this.arr.unshift(key);
    // 如果没有，有两种可能
    // 如果内存满了，要执行 arr.pop()
    // 存进去  存arr里面

}
