import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Account from '../pages/Account.vue'
import Deposit from '../components/operations/Deposit.vue'
import Header from '../components/Header.vue'
import Withdraw from '../components/operations/Withdraw.vue'
import History from '../components/operations/History.vue'
import Transfer from '../components/operations/Transfer.vue'
import { store } from '../store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) =>
{
    if (!store.state.isLogged)
    {
        next();
        return
    }

    next('/account/deposit')
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
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: ifNotAuthenticated
        },
        {
            path: '/account/deposit',
            name: 'Deposit',
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/account/withdraw',
            name: 'Withdraw',
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/account/history',
            name: 'History',
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: '/account/transfer',
            name: 'Transfer',
            component: Account,
            beforeEnter: ifAuthenticated
        },
        { path: '*', redirect: '/login' }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
});

export default router
