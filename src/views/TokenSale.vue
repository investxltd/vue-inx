<template>
    <div class="wrapper">
        <!--<sidebar></sidebar>-->

        <div id="content">
            <h1>Token Sale</h1>
            <h3>Invest in INX and help Investx grow the community</h3>

            <hr/>

            <div class="row">
                <div class="col-sm-6">
                    <!--<contribute></contribute>-->
                    <calc></calc>
                </div>
                <!--<div class="col">-->
                    <!--<b-card title="Token Sale" sub-title="Information about the Token Sale" class="shadow-sm">-->

                        <!--<table class="table table-striped" v-if="tokenData && crowdsaleData">-->
                            <!--<tbody>-->
                            <!--<tr>-->
                                <!--<td>Start Date</td>-->
                                <!--<td>{{ new Date(parseInt(this.crowdsaleData.openingTime) * 1000).toLocaleString() }}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>End Date</td>-->
                                <!--<td>{{ new Date(parseInt(this.crowdsaleData.closingTime) * 1000).toLocaleString() }}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Token Symbol</td>-->
                                <!--<td>{{this.tokenData.symbol}}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Min. Investment</td>-->
                                <!--<td>{{ this.crowdsaleData.minContributionInEther }} ETH</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Total Supply</td>-->
                                <!--<td>{{ this.tokenData.totalSupply }} INX</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Currently Open</td>-->
                                <!--<td>{{ this.crowdsaleData.isCrowdsaleOpen ? 'Yes' : 'No' }}</td>-->
                            <!--</tr>-->
                            <!--<tr v-if="crowdsaleData.isCrowdsaleOpen">-->
                                <!--<td>Pre-Sale</td>-->
                                <!--<td>{{ this.crowdsaleData.inPreSale ? 'Yes' : 'No' }}</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Pre-Sale Rate</td>-->
                                <!--<td>{{ this.crowdsaleData.preSaleRate }} INX per ETH</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Sale Rate</td>-->
                                <!--<td>{{ this.crowdsaleData.rate }} INX per ETH</td>-->
                            <!--</tr>-->
                            <!--<tr>-->
                                <!--<td>Total Ether Raised</td>-->
                                <!--<td>{{ this.crowdsaleData.raisedInEther }}</td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->
                    <!--</b-card>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import Contribute from '@/components/Contribute';
    import Calc from '@/components/Calc';
    import {mapState} from 'vuex';

    export default {
        name: 'token-sale',
        components: {Sidebar, Contribute, Calc},
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
