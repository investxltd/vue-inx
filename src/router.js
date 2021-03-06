import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Home from '@/views/Home';
import TokenSale from '@/views/TokenSale';
import Transactions from '@/views/Transactions';
import Settings from '@/views/Settings';
import LoggedOut from '@/views/LoggedOut';

import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import Forgot from '@/components/Forgot';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/token-sale',
            name: 'token-sale',
            component: TokenSale,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: Transactions,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: SignUp
        },
        {
            path: '/forgot',
            name: 'forgot',
            component: Forgot
        },
        {
            path: '/loggedout',
            name: 'loggedout',
            component: LoggedOut
        },
    ]
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next('login');
    }
    else if (!requiresAuth && currentUser) {
        next('home');
    }
    else {
        next();
    }
});

export default router;
