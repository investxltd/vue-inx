<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo">
        </div>

        <router-link to="/home">Home</router-link>
        <router-link to="/about">About</router-link>

        <hr>

        <button v-on:click="logout" class="btn btn-block btn-outline-primary">Logout</button>
    </nav>
</template>

<script>
    export default {
        name: 'sidebar'
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

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
</style>
