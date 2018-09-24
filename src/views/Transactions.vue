<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Transactions</h1>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';

    export default {
        name: 'transactions',
        components: { Sidebar }
    };
</script>

<style scoped lang="scss">

</style>
