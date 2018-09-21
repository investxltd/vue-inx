import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import About from '@/views/About.vue';
import Home from '@/views/Home.vue';

import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

Vue.use(Router);

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next('login');
    }
    else if (!requiresAuth && currentUser) {
        next('hello');
    }
    else {
        next();
    }
});

export default router;
