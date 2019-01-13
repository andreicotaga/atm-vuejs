import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import { store } from './store'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import '../assets/login.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VeeValidate);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
