import Vue from 'vue'
// 引入mint-ui
import {
    Button,
    Navbar,
    TabItem,
    TabContainer,
    TabContainerItem,
    Lazyload,
    Loadmore,
    InfiniteScroll,
    Cell,
    Search,
    Field,
    Picker,
    Popup,
    Actionsheet,
    Header,
    Spinner,
    Progress,
    Checklist,
    Radio
} from 'mint-ui'

import '../../assets/scss/reset.scss';
import App from './App.vue'
import router from './router'
import store from './store/index.js'
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Cell.name, Cell);
Vue.component(Search.name, Search);
Vue.component(Field.name, Field);
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Header.name, Header);
Vue.component(Spinner.name, Spinner);
Vue.component(Progress.name, Progress);
Vue.component(Checklist.name, Checklist);
Vue.component(Radio.name, Radio);
Vue.use(Lazyload)
Vue.use(InfiniteScroll)
Vue.config.productionTip = false

// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

Vue.mixin({
    data() {
        console.log(`${this.$options.name}: data (from Minxin)`)
        return {
            name: 'Minxin2'
        }
    },
    beforeCreate() {
        console.log(`${this.name}: beforeCreate (from Minxin)`)
    },
    mounted() {
        console.log(`${this.name}: mounted (from ${this.from()}) Minxin`)
    },
    methods: {
        from() {
            return 'Mixin3'
        }
    }
})
new Vue({
    name: "Root1",
    data() {
        console.log('Root, data (from Root)')
        return {
            name: 'Root2',
        }
    },
    beforeCreate() {
        console.log(`Root1111: beforeCreate (from root1)`)
    },
    mounted() {
        console.log('Root, mounted (from Root) ouyang')
    },
    methods: {
        from() {
            return 'Root3'
        }
    },
    render: h => h(App)
}).$mount('#app')

// undefined: beforeCreate (from Minxin)
// Root, data (from Root)
// Root1: data (from Minxin)
// undefined: beforeCreate (from Minxin)
// App, data (from App)
// App1: data (from Minxin)
// App2: mounted (from App3)
// App, mounted (from App)
// Root2: mounted (from Root3)
// Root, mounted (from Root)