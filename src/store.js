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
        error: 'User with specified card number was not found or the pin is incorrect!'
    },
    actions: {
        login ({ commit }, payload) {
            return new Promise(resolve => {
                axios.post(apiUrl + '/auth/login', {
                    'card_number': payload.cardNumber,
                    'password': payload.pin
                }).then((response) => {
                    if (response.hasOwnProperty('data') && response.data.hasOwnProperty('token')) {
                        localStorage.setItem('token', response.data.token);
                        commit('LOGIN_USER');
                        resolve({token : response.data.token});
                    }
                }).catch(error => {
                    commit('FAILED_LOGIN');
                    resolve({error : error.response.data});
                });
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
        FAILED_LOGIN (state) {
            state.error = 'User with specified card number was not found or the pin is incorrect!';
        }
    }
});
