<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Account Settings</h1>
            <h3>All your details about your accounts</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <personal-information></personal-information>
                </div>
                <div class="col">
                    <marketing-preference></marketing-preference>

                    <forgot-password class="mt-5"></forgot-password>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import PersonalInformation from '@/components/PersonalInformation';
    import MarketingPreference from '@/components/MarketingPreference';
    import ForgotPassword from '@/components/ForgotPassword';
    import firebase from 'firebase';
    import { db } from '../main';
    import { mapState } from 'vuex';

    export default {
        name: 'settings',
        components: {Sidebar, PersonalInformation, MarketingPreference, ForgotPassword},
        computed: {
            ...mapState([
                'userData'
            ])
        },
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>
