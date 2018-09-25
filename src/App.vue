<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted () {
            // Bootstrap
            this.$store.dispatch('load-token-smart-contract');
        }
    };
</script>

<style lang="scss">
    @import 'assets/scss/inx-colours.scss';
    @import '../node_modules/bootstrap/scss/bootstrap.scss';
    @import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

    h1 {
        margin-bottom: 0;
    }

    h3 {
        font-size: 1.1rem;
        color: $secondary;
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
</style>
