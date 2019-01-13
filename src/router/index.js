import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Account from '../pages/Account.vue'
import { store } from '../store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) =>
{
    if (!store.state.isLogged)
    {
        next();
        return
    }

    next('/account')
};

const ifAuthenticated = (to, from, next) =>
{
    if (store.state.isLogged)
    {
        next();
        return
    }

    next('/login')
};

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/account',
            name: 'Account',
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router
