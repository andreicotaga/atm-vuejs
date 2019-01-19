import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import { store } from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import BootstrapVue from 'bootstrap-vue'

import '../assets/sidebar.css'
import '../assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VeeValidate,{
    fieldsBagName: 'vvFields'
});
Vue.use(VueAxios, axios);

const token = localStorage.getItem('token');
if (token)
{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
