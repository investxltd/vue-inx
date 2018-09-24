<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Token Sale</h1>
            <h3>Invest in INX and get life time access</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <contribute></contribute>
                </div>
                <div class="col">
                    <b-card title="KYC and AML" sub-title="Regulation and why it is required">
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
    import Contribute from '@/components/Contribute';

    export default {
        name: 'token-sale',
        components: { Sidebar, Contribute }
    };
</script>

<style scoped lang="scss">

</style>
