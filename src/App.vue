<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'app',
        components: {},
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login');
                });
            }
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

    .wrapper {
        display: flex;
        align-items: stretch;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        background: $body-bg;
        color: $body-color;
        transition: all 0.3s;

        .sidebar-header {
            padding: 20px;
        }

        a {
            padding: 10px;
            font-size: 1.1em;
            display: block;
            text-decoration: none;
            &.router-link-exact-active {
                color: $white;
                background-color: $body-color;
            }
        }

        a:hover {
            /*color: #7386D5;*/
            /*background: #fff;*/
        }
    }

    #content {
        margin: 50px;
    }

    .inx-logo {
        height: 38px;
    }
</style>
