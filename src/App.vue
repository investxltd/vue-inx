<template>
    <div>
        <div id="app">
            <router-view/>
        </div>
        <footer class="mt-5 mb-5">
            <span class="badge badge-light float-right">{{ network }}</span>
        </footer>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: 'app',
        mounted () {
            this.$store.dispatch('bootstrap');
        },
        computed: {
            ...mapState([
                'network'
            ])
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

    code {
        color: $primary;
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
