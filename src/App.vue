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

    #content {
        margin: 20px 50px 50px 50px;
    }

    .inx-logo {
        height: 38px;
    }
</style>
