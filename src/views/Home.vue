<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Home</h1>
            <h3>All about Investx</h3>

            <hr/>

            <b-alert show variant="secondary">Please update you Ethereum address so we can start the KYC process</b-alert>

            <div class="row">
                <div class="col">
                    <b-card title="KYC" sub-title="Completing KYC and AML">
                        <p class="card-text">
                            All participants in the ICO <span class="text-bold">must</span> be verified by our KYC provider.
                        </p>
                        <p class="card-text">
                            Please update you Ethereum address so we can start the KYC process.
                        </p>
                        <div slot="footer">
                            <a href="#"
                               class="card-link">Card link</a>
                            <b-link href="#"
                                    class="card-link">Another link
                            </b-link>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="Token Sale" sub-title="Steps to contribution">
                        <p class="card-text">
                            Once you have passed our <em>KYC</em> process you can contribute and purchase INX tokens.
                        </p>
                        <p class="card-text">
                            The current rate of INX tokens per ETH is XXX.
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Token Sale</router-link>
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

    export default {
        name: 'home',
        components: {Sidebar}
    };
</script>

<style scoped lang="scss">
    .card {
        min-height: 18rem;
    }
</style>
