<template>
  <div>
    <div class="hello" v-change-background-color="red" v-demo:foo.a.b="message"></div>
    <button @click="handleClick">clickMe</button>
    <h1 v-if="count < 6" v-change="count">it is a custom directive</h1>
    <child :items="items">
      <!-- <template slot="item" slot-scope="props"> 这是之前的用法-->
      <template v-slot:item="props">
        <!--必须存在的具有 slot-scope属性的 template元素（作用域插槽的模板），
        props临时的变量名称，接受子组件中传递的props对象-->
        <!--slot = “item”是具名 slot的用法。-->
        <li>
          {{props.tex}}
          <!--引用子组件中绑定的tex属性值。-->
        </li>
      </template>
      <!-- <template v-slot:second="gain"> 作用域插槽 vue2.6.0版本以上的用法-->
      <template slot="second" slot-scope="gain">
        <div class="second">{{ gain.text }}</div>
      </template>
    </child>
    <div @click="replace">跳转echarts</div>
    <span v-for="(item,index) in winNum" :key="index" class="blue">
      {{item}}
      <span v-if="index !== winNum.length - 1">、</span>
    </span>号窗口等候

    
  </div>
</template>
<script>
// https://www.cnblogs.com/ainyi/p/9722961.html
// Object.defineProperty缺点： vue 不能监听对象属性的添加、修改、删除
// 1. 对数组的支持不好，无法监听到数组的变化，在Vue官方文档说明了可以监听到数组的变动，
// 但只限于push、pop、shift、unshift、splice、sort、reverse方法。实际上是他们对这几种方法进行了重写。
// 在Vue中，Object.defineProperty无法监控到数组下标的变化，导致直接通过数组的下标给数组设置值，不能实时响应。
// 2. Object.defineProperty的第二个缺陷,只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，
// 如果属性值也是对象那么需要深度遍历,显然能劫持一个完整的对象是更好的选择。

// vue this.$set用法  https://www.jianshu.com/p/e58f099c9133
// https://blog.csdn.net/guorui_cara/article/details/86493960
// https://www.cnblogs.com/junjiang3/p/10758516.html

/**
 * vue.extend
 * 请注意，extend创建的是一个组件构造器，而不是一个具体的组件实例。
 * 所以他不能直接在new Vue中这样使用： new Vue({components: fuck})
 * 最终还是要通过Vue.components注册才可以使用的。
 */
// 父组件在用子组件来填充插槽的时候 有时候需要用到子组件里面插槽的数据 .
// 子组件文件插槽上带的数据 在父组件的子组件标签里 让一个标签 带有slot-scope="xxx" 去接收 以便在下面进行调用
// 作用域插槽 学习
// 有2.6.0之前的用法和之后的用法
import child from "@/components/child.vue";
export default {
  name: "Index",
  data() {
    return {
      red: "red",
      message: "hello!",
      count: 0,
      items: [
        { text: "实例1" },
        { text: "实例2" },
        { text: "实例3" },
        { text: "实例4" },
        { text: "实例5" },
        { text: "实例6" }
      ],
      winNum: ["01", "02", "03", "04", "05"]
    };
  },
  created() {
    console.log(this.winNum.length);
  },
  components: {
    child
  },
  methods: {
    handleClick() {
      //按钮单击，count自增
      // this.count++;
      this.fun1().then(() => {
        this.fun2()
          .then(() => {
            console.log("ouyangxinghua");
            this.$router.replace({
              path: "/echarts",
              query: {
                name: "ouyang"
              }
            });
          })
          .then(() => {
            console.log("xinghua");
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    fun1() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("111111");
          resolve();
        }, 2000);
      });
    },
    fun2() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("222222");
          resolve();
        }, 1000);
      });
    },
    replace() {
      this.$router.replace({
        path: "/echarts",
        query: {
          name: "ouyangxinghua"
        }
      });
    }
  },
  // 自定义指令学习
  directives: {
    changeBackgroundColor: {
      bind: function(el, bindings) {
        el.style.backgroundColor = bindings.value;
      }
    },
    demo: {
      bind: function(el, binding, vnode) {
        var s = JSON.stringify;
        el.innerHTML = "name: ";
      }
    },
    change: {
      bind: function(el, bindings) {
        // console.log("指令已经绑定到元素了");
        // console.log(el);
        // console.log(bindings);
        el.innerHTML = bindings.value;
      },
      update: function(el, bindings) {
        // console.log("指令的数据有所变化");
        // console.log(el);
        // console.log(bindings);
        el.innerHTML = bindings.value;
        if (bindings.value == 5) {
          // console.log(" it is a test");
        }
      },
      unbind: function() {
        console.log("解除绑定了");
      }
    }
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  width: 300px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
</style>
