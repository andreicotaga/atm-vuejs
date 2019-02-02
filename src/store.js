import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const apiUrl = 'http://localhost:8083';

export const store = new Vuex.Store({
    state: {
        isLogged: !!localStorage.getItem('token'),
        error: '',
        user: JSON.parse(localStorage.getItem('user_data') || "{}"),
        transactions: JSON.parse(localStorage.getItem('transactions') || "[]")
    },
    getters: {
        userStatus: state => state.user
    },
    actions: {
        login ({ commit }, payload) {
            return new Promise(resolve =>
            {
                axios.post(apiUrl + '/auth/login', {
                    'card_number': payload.cardNumber,
                    'password': payload.pin
                }).then((response) =>
                {
                    if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token'))
                    {
                        localStorage.setItem('token', response.data.token);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                        commit('LOGIN_USER');
                        resolve({token : response.data.token});
                    }
                }).catch(error =>
                {
                    commit('FAILED_LOGIN',
                        error.response.data.hasOwnProperty('error') ? error.response.data.error :'User with specified card number was not found or the pin is incorrect!');
                    resolve({error : error.response.data});
                });
            })
        },
        getUser ({ commit }) {
            return new Promise(resolve =>
            {
                if(localStorage.getItem('token'))
                {
                    axios.get(apiUrl + '/me', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }}).then((response) =>
                    {
                        if (response.hasOwnProperty('data') && response.data.hasOwnProperty('user'))
                        {
                            commit('USER_DATA', response.data.user);
                            localStorage.setItem('user_data', JSON.stringify(response.data.user));
                            resolve({user : response.data.user});
                        }
                    }).catch(error =>
                    {
                        commit('FAILED_LOGIN');
                        this.$router.push('/login');
                        resolve({error : error.response.data});
                    });
                }
            })
        },
        logout ({ commit })
        {
            return new Promise(resolve =>
            {
                commit('LOGOUT_USER');
                localStorage.removeItem('token');
                localStorage.removeItem('user_data');
                localStorage.removeItem('transactions');
                resolve()
            })
        },
        deposit ({ commit }, payload)
        {
            return new Promise(resolve =>
            {
                axios.put(apiUrl + '/cashier/deposit', {
                    'amount': payload.amount,
                    'comment': payload.comment
                }).then((response) =>
                {
                    if (response.data.status === 'SUCCESS')
                    {
                        commit('USER_DATA', response.data.data);
                        resolve(response.data.data)
                    }
                }, (e) => {
                    resolve(e.response);
                })
            })
        },
        withdraw ({ commit }, payload)
        {
            return new Promise(resolve =>
            {
                axios.put(apiUrl + '/cashier/withdraw', {
                    'amount': payload.amount,
                    'comment': payload.comment
                }).then((response) =>
                {
                    if (response.data.status === 'SUCCESS')
                    {
                        commit('USER_DATA', response.data.data);
                        resolve(response.data.data)
                    }
                    else
                    {
                        resolve(response.data.error)
                    }
                }, (e) => {
                    resolve(e.response);
                });
            })
        },
        transactions ({ commit })
        {
            return new Promise(resolve =>
            {
                axios.get(apiUrl + '/cashier/transactions', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }}).then((response) => {

                    if (response.hasOwnProperty('data'))
                    {
                        response.data.data.map(function(value, key)
                        {
                            if(value.oper_code === 'WD')
                            {
                                value._rowVariant = 'danger';
                            }
                            else if(value.oper_code === 'DP')
                            {
                                value._rowVariant = 'success';
                            }
                            else
                            {
                                value._rowVariant = 'info';
                            }
                        });

                        localStorage.setItem('transactions', JSON.stringify(response.data.data));

                        commit('TRANSACTIONS', response.data.data);
                    }
                    else
                    {
                        resolve(response.data.error)
                    }
                }, (e) => {
                    resolve(e.response);
                })
            })
        },
        transfer ({ commit }, payload)
        {
            return new Promise(resolve =>
            {
                axios.put(apiUrl + '/cashier/transfer', {
                    'amount': payload.amount,
                    'card_number': payload.cardNumber
                }).then((response) =>
                {
                    if (response.data.status === 'SUCCESS')
                    {
                        commit('USER_DATA', response.data.data);
                        resolve(response.data.data)
                    }
                    else
                    {
                        resolve(response.data.error)
                    }
                }, (e) => {
                    resolve(e.response);
                })
            })
        },
    },
    mutations: {
        LOGIN_USER (state) {
            state.isLogged = true
        },
        LOGOUT_USER (state) {
            state.isLogged = false
        },
        USER_DATA (state, userData) {
            state.user = userData
        },
        TRANSACTIONS (state, transactions) {
            state.transactions = transactions
        },
        FAILED_LOGIN (state, error) {
            state.error = error;
        }
    }
});
