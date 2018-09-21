<template>
    <div id="app">
        <!--<div id="nav">-->
            <!--<router-link to="/">Home</router-link>-->
            <!--|-->
            <!--<router-link to="/about">About</router-link>-->
            <!--|-->
            <!--<router-link to="/sign-up">Sign-Up</router-link>-->
            <!--|-->
            <!--<router-link to="/login">Login</router-link>-->

            <!--<span class="badge badge-primary">ssss</span>-->
        <!--</div>-->
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {

        }
    };
</script>

<style lang="scss">
    @import 'assets/scss/inx-colours.scss';

    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: $body-bg;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            &.router-link-exact-active {
                color: $primary;
            }
        }
    }

    .inx-logo {
        height: 38px;
    }
</style>
