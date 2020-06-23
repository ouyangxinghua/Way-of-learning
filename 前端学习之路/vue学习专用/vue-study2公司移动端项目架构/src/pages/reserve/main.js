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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
