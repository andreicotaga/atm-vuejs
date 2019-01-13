import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import CardValidation from 'card-validator'
import router from './router'

import '../assets/login.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(CardValidation);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
