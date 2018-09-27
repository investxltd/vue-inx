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
                    <b-card title="Token Sale" sub-title="Information about the Token Sale" class="shadow-sm">

                        <table class="table table-striped" v-if="tokenData && crowdsaleData">
                            <tbody>
                            <tr>
                                <td>Start Date</td>
                                <td>{{ new Date(parseInt(this.crowdsaleData.openingTime)).toLocaleDateString() }}</td>
                            </tr>
                            <tr>
                                <td>End Date</td>
                                <td>{{ new Date(parseInt(this.crowdsaleData.closingTime)).toLocaleDateString() }}</td>
                            </tr>
                            <tr>
                                <td>Token Symbol</td>
                                <td>{{this.tokenData.symbol}}</td>
                            </tr>
                            <tr>
                                <td>Min. Investment</td>
                                <td>{{ this.crowdsaleData.minContributionInEther }} ETH</td>
                            </tr>
                            <tr>
                                <td>Total Supply</td>
                                <td>{{ this.tokenData.totalSupply }} INX</td>
                            </tr>
                            <tr>
                                <td>Currently Open</td>
                                <td>{{ this.crowdsaleData.isCrowdsaleOpen ? 'Yes' : 'No' }}</td>
                            </tr>
                            <tr v-if="crowdsaleData.isCrowdsaleOpen">
                                <td>Pre-Sale</td>
                                <td>{{ this.crowdsaleData.inPreSale ? 'Yes' : 'No' }}</td>
                            </tr>
                            <tr>
                                <td>Pre-Sale Rate</td>
                                <td>{{ this.crowdsaleData.preSaleRate }} INX per ETH</td>
                            </tr>
                            <tr>
                                <td>Sale Rate</td>
                                <td>{{ this.crowdsaleData.rate }} INX per ETH</td>
                            </tr>
                            <tr>
                                <td>Total Ether Raised</td>
                                <td>{{ this.crowdsaleData.raisedInEther }}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="INX Calculator" sub-title="Use the calculator to compute an estimation of the INX you will receive" class="shadow-sm">
                        <p class="card-text"></p>
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
                'crowdsaleData'
            ])
        }

    };
</script>

<style scoped lang="scss">
</style>
