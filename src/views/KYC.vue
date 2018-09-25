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
                    <b-card title="KYC and AML" sub-title="Regulation and why it is required" class="shadow-sm">
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
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
