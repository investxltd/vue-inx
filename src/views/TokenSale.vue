<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Token Sale</h1>
            <h3>Invest in INX and get life time access</h3>

            <hr/>

            <div class="row">
                <div class="col d-flex justify-content-sm-center">
                    <contribute></contribute>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <b-card title="Token Sale" sub-title="Information about the Token Sale">

                        <table class="table table-striped">
                            <tbody>
                            <tr>
                                <td>Start Date</td><td></td>
                            </tr>
                            <tr>
                                <td>End Date</td><td></td>
                            </tr>
                            <tr>
                                <td>Token Symbol</td><td>{{this.tokenData.symbol}}</td>
                            </tr>
                            <tr>
                                <td>Min. Investment</td><td></td>
                            </tr>
                            <tr>
                                <td>Total Supply</td><td></td>
                            </tr>
                            <tr>
                                <td>Phase</td><td></td>
                            </tr>
                            <tr>
                                <td>Pre-Sale Rate</td><td></td>
                            </tr>
                            <tr>
                                <td>Sale Rate</td><td></td>
                            </tr>
                            <tr>
                                <td>Total Ether Raised</td><td></td>
                            </tr>
                            </tbody>
                        </table>

                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="INX Calculator" sub-title="Use the calculator to compute an estimation of the INX you will receive">
                        <p class="card-text">
                            TODO
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
    import {mapState} from 'vuex';

    export default {
        name: 'token-sale',
        components: {Sidebar, Contribute},
        data () {
            return {

            };
        },
        computed: {
            ...mapState([
                'tokenData',
            ])
            // items: [
            //     {attribute: 'Start Date', value: ''},
            //     {attribute: 'End Date', value: ''},
            //     {attribute: 'Min. Investment', value: ''},
            //     {attribute: 'Token Symbol', value: this.tokenData.symbol},
            //     {attribute: 'Total Supply', value: ''},
            //     {attribute: 'Phase', value: ''},
            //     {attribute: 'Pre-Sale Rate', value: ''},
            //     {attribute: 'Sale Rate', value: ''},
            //     {attribute: 'Total Ether Raised', value: ''}
            // ]
        }

    };
</script>

<style scoped lang="scss">
</style>
