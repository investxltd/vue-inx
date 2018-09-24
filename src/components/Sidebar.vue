<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo">
        </div>

        <router-link to="/home">Home</router-link>
        <router-link to="/token-sale">Token Sale</router-link>
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/settings">Settings</router-link>

        <a v-on:click="logout" href="#" class="sidebar-logout mt-5">Logout</a>
    </nav>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'sidebar',
        methods: {
            logout: function () {
                firebase.auth().signOut().then(() => {
                    this.$router.replace('login');
                });
            }
        }
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
        border-right:  1px solid $gray-300;
        height: 100vh;

        .sidebar-header {
            padding: 20px;
        }

        a {
            padding: 10px;
            font-size: 0.9em;
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

        .sidebar-logout {
            font-size: 0.75rem;
        }
    }
</style>
