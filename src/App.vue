<template>
    <div>
        <b-navbar toggleable="md" variant="light">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="https://www.investx.io" target="_blank">
                <img alt="Investx" src="./assets/inx_logo.png" class="inx-logo">
            </b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">

                    <router-link to="/home" class="nav-link" v-if="loggedIn()">Home</router-link>
                    <router-link to="/token-sale" class="nav-link" v-if="loggedIn()">Token Sale</router-link>
                    <router-link to="/settings" class="nav-link mr-3" v-if="loggedIn()">Account Settings</router-link>

                    <a v-on:click="logout" href="#" class="nav-link" v-if="loggedIn()">Logout</a>


                    <router-link to="/signin" class="nav-link" v-if="!loggedIn()">Sign In</router-link>
                    <router-link to="/register" class="nav-link" v-if="!loggedIn()">Register</router-link>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- navbar-1.vue -->
        <div id="app">
            <router-view/>
        </div>
        <footer class="mt-5 mb-5 text-center">
            <a href="https://t.me/investxtoken" target="_blank"><img src="./assets/images/social/telegram.png"/></a>
            <a href="https://twitter.com/InvestxLtd" target="_blank"><img src="./assets/images/social/twitter.png"/></a>
            <a href="https://www.facebook.com/InvestxLtd/" target="_blank"><img src="./assets/images/social/facebook.png"/></a>
            <a href="https://www.linkedin.com/company/investx/" target="_blank"><img src="./assets/images/social/linkedin.png"/></a>
        </footer>
        <!--<span class="badge badge-light float-right">{{ network }}</span>-->
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import firebase from 'firebase';

    /* global web3, Web3 */

    export default {
        name: 'app',
        async mounted () {
            this.$store.dispatch('bootstrap');

            // Modern dapp browsers...
            if (window.ethereum) {
                console.log(`Using post-Nov 2nd (approval) MetaMask`);
                window.web3 = new Web3(ethereum);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    console.log(`Enabled`);
                } catch (error) {
                    // User denied account access...
                    console.log(error);
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                console.log(`Using pre-Nov 2nd MetaMask`);
                window.web3 = new Web3(web3.currentProvider);
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        },
        computed: {
            ...mapState([
                'network'
            ])
        },
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$store.commit('commit-user-data', null);
                    this.$router.replace('loggedout');
                });
            },
            loggedIn: function () {
                return !!firebase.auth().currentUser;
            }
        }
    };
</script>

<style lang="scss">
    @import 'assets/scss/inx-colours.scss';
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

    body {
        font-family: Avenir, sans-serif;
    }

    h1 {
        margin-bottom: 0;
    }

    h3 {
        font-size: 1.1rem;
        color: $secondary;
    }

    code {
        color: $primary;
    }

    footer {
        img {
            width: 75px;
            margin: 15px;
        }
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: $body-bg;
    }

    .wrapper {
        display: flex;
        align-items: stretch;
    }

    #content {
        width: 100%;
        margin: 20px 50px 50px 50px;
    }

    .inx-logo {
        height: 38px;
    }

    .card-subtitle {
        margin-bottom: 1.5rem !important;
    }

    @media screen and (max-width: 767px) {
        #content {
            width: 100%;
            margin: 10px 10px 10px 10px;
        }

        footer {
            img {
                width: 50px;
                margin: 10px;
            }
        }
    }

    .navbar-light .navbar-nav .nav-link  {
        color: $primary;
    }

    .router-link-active {
        color: $secondary !important;
    }
</style>
