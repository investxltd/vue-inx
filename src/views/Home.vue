<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld';
    import Sidebar from '@/components/Sidebar';

    export default {
        name: 'home',
        components: { HelloWorld, Sidebar }
    };
</script>

<style scoped lang="scss">

</style>
