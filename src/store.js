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
        user: {}
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
                            resolve({user : response.data.user});
                        }
                    }).catch(error =>
                    {
                        commit('FAILED_LOGIN');
                        resolve({error : error.response.data});
                    });
                }
            })
        },
        logout ({ commit }) {
            return new Promise(resolve =>
            {
                commit('LOGOUT_USER');
                localStorage.removeItem('token');
                resolve()
            })
        }
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
        FAILED_LOGIN (state, error) {
            state.error = error;
        }
    }
});
