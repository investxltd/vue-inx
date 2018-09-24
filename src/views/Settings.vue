<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Account Settings</h1>
            <h3>All your details about your accounts</h3>

            <hr/>

            <div class="row mt-5">
                <div class="col">
                    <personal-information></personal-information>
                </div>
                <div class="col">
                    more stuff
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import PersonalInformation from '@/components/PersonalInformation';

    export default {
        name: 'settings',
        components: {Sidebar, PersonalInformation}
    };
</script>

<style scoped lang="scss">

</style>
