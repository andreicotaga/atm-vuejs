import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'

Vue.use(Router)

const router = new Router({
    /*mode: 'history',*/
    routes: [
        {
            path: '/login',
            name: 'Login into your ATM account',
            component: Login
        },
        { path: '*', redirect: '/login' }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

export default router
