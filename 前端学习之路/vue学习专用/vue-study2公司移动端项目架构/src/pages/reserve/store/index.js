import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 如果对vuex使用较少的项目可以直接使用以下用法，大型应用建议将store分割
export default new Vuex.Store({
    state: {
        tokenid: ''
    },
    mutations: {
        // 设置token
        setTokenid(state, status) {
            state.tokenid = status;
        },
    },
    actions: {
    }
})
