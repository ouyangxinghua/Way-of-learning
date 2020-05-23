https://segmentfault.com/a/1190000014804826/     vue-cli脚手架中webpack配置基础文件详解
http://www.fly63.com/article/detial/7143   Vue.js最佳实践:五招让你成为Vue.js大师
https://blog.csdn.net/wx11408115/article/details/78032443    SASS学习系列之三--------- node-sass 自动编译scss 文件

1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的
2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化

watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName    //监听firstName的变化来改变fullName
    }
}

computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName  //fullName只有在firstName或lastName变化的时候才会变化
    }
}