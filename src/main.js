import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

// firebase config
const config = {
    apiKey: 'AIzaSyAqYatIXPIBJI-gTxd4nlpcBOs0wgrV7_M',
    authDomain: 'vue-inx.firebaseapp.com',
    databaseURL: 'https://vue-inx.firebaseio.com',
    projectId: 'vue-inx',
    storageBucket: 'vue-inx.appspot.com',
    messagingSenderId: '957134757364'
};

let app;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function () {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    }
});

export const db = firebase.database();






