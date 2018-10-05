<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>KYC</h1>
            <h3>Due to current legislation all ICO investors, will need to pass KYC verification to get future access to the platform.</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <kyc-progress></kyc-progress>
                </div>
                <div class="col">
                    <b-card title="KYC and AML" sub-title="Legislation and why it is required" class="shadow-sm">
                        <p class="card-text">
                            Due to current legislation all ICO investors, will need to pass KYC verification to get future access to the platform.
                        </p>
                        <p class="card-text">
                            That is why we have decided to collaborate with Coinfirm for this process so it will be fast and secure!
                        </p>
                        <p class="card-text">
                            Simply follow the steps after clicking on the link. It should not take more than a few minutes to complete.
                        </p>
                        <p class="card-text">
                            All investors, including <strong>pre-sale</strong> contributors, must pass it before they can access the platform.
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Read more about our KYC process</router-link>
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import KYCProgress from '@/components/KYCProgress';
    import KycProgress from '../components/KYCProgress';

    export default {
        name: 'kyc',
        components: {KycProgress, Sidebar, KYCProgress }
    };
</script>

<style scoped lang="scss">

</style>
