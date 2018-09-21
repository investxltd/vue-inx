<template>
    <div class="wrapper">
        <nav id="sidebar">
            <div class="sidebar-header">
                <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo">
            </div>

            <router-link to="/home">Home</router-link>
            <router-link to="/about">About</router-link>

            <hr>

            <button v-on:click="logout" class="btn btn-block btn-outline-primary">Logout</button>
        </nav>

        <div id="content">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';

    export default {
        name: 'home',
        components: {
            HelloWorld
        }
    };
</script>

<style scoped lang="scss">

</style>
