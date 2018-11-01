<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content" v-if="userData">
            <h1>Home</h1>
            <h3>Welcome {{ this.userData.displayName }} to the Investx portal</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <b-card title="Up Next" sub-title="Completing KYC and AML" class="shadow-sm">
                        <div>
                            <p class="card-text">
                                Investx will perform standard KYC checks before releasing INX tokens to contributors.
                            </p>

                            <p class="card-text">
                                These checks will include AML, sanctions, PEP and source of wealth checks (for larger contributions) and will be processed on or before the soft cap is reached.
                            </p>

                            <b-alert variant="warning" show v-if="!isEthAccountValid()">
                                Please provide a valid Ethereum address and we will allocate your personalised contribution smart contract
                                <router-link to="/settings" class="alert-link">Account Settings</router-link>
                            </b-alert>

                            <p class="card-text text-right">
                                <em>For help and support visit our <a href="https://t.me/investxtoken" target="_blank">Telegram</a> channel</em>
                                <a href="https://t.me/investxtoken" target="_blank" class="ml-3">
                                    <img src="../assets/images/social/telegram.png" style="max-height: 50px"/>
                                </a>
                            </p>
                        </div>
                        <!--<div v-else-if="!userData.kycStatus">-->
                            <!--<p class="card-text">-->
                                <!--Your details will be passed to Coinfirm to capture and process your KYC application-->
                            <!--</p>-->

                            <!--<p class="card-text">-->
                                <!--We will start KYC with:-->
                                <!--<br>Email <code>{{ userData.email }}</code>-->
                                <!--<br/>ETH wallet <code>{{ userData.ethAccount }}</code>-->
                                <!--&lt;!&ndash;<br/>User ID <code>{{ userData.uid }}</code>&ndash;&gt;-->
                            <!--</p>-->

                            <!--<b-button-group class="mx-1 mt-3">-->
                                <!--<b-button variant="primary" v-on:click="initiate">Initiate KYC</b-button>-->
                            <!--</b-button-group>-->
                        <!--</div>-->
                        <!--<div v-else-if="userData.kycStatus && !userData.kyc">-->
                            <!--<kyc-progress></kyc-progress>-->
                        <!--</div>-->
                    </b-card>

                    <!--<div class="row" v-else-if="userData && accountKyc">-->
                        <!--<div class="col">-->
                            <!--<contribute></contribute>-->
                        <!--</div>-->
                        <!--<div class="col">-->
                            <!--<calc></calc>-->

                            <!--<b-card title="Token Sale" sub-title="Steps to contribution" class="shadow-sm mt-5" v-if="crowdsaleData && tokenData && userData">-->
                                <!--<p class="card-text text-center" v-if="isOpeningTimeInTheFuture()">-->
                                    <!--<countdown :timestamp="crowdsaleData.openingTime" ></countdown>-->
                                <!--</p>-->
                                <!--<p class="card-text" v-if="tokenData.totalSupply">-->
                                    <!--Total supply <strong>{{ tokenData.totalSupply | currency('INX', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true}) }}</strong>.-->
                                <!--</p>-->
                                <!--<p class="card-text" v-if="accountBalance">-->
                                    <!--Your balance is <strong>{{ accountBalance | currency('INX', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true }) }}</strong>.-->
                                <!--</p>-->
                                <!--<p class="card-text" v-if="crowdsaleData.isCrowdsaleOpen">-->
                                    <!--The current rate of <strong>INX</strong> tokens per <strong>ETH</strong> is <strong>{{ currentRate() }}</strong>.-->
                                <!--</p>-->
                                <!--<p class="card-text" v-else>-->
                                    <!--<em>The Investx token sale is not currently open.</em>-->
                                <!--</p>-->
                                <!--<p class="card-text">-->
                                    <!--Total raised in <strong>ETH</strong> so far is <strong>{{ crowdsaleData.raisedInEther | currency('ETH', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true }) }}</strong>-->
                                <!--</p>-->
                            <!--</b-card>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import KycProgress from '@/components/KYCProgress';
    import Countdown from '@/components/Countdown';
    import Contribute from '@/components/Contribute';
    import Calc from '@/components/Calc';
    import firebase from 'firebase';
    import { mapState, mapGetters } from 'vuex';
    import { db } from '../main';
    import Web3Utils from 'web3-utils';

    export default {
        name: 'home',
        components: {Countdown, Sidebar, KycProgress, Contribute, Calc},
        data () {
            return {
                currentUser: firebase.auth().currentUser
            };
        },
        computed: {
            ...mapState([
                'tokenData',
                'crowdsaleData',
                'userData',
                'accountBalance',
                'accountKyc'
            ]),
            ...mapGetters([
                'currentRate'
            ])
        },
        methods: {
            isEthAccountValid () {
                if (!this.userData.ethAccount) {
                    return false;
                }
                return Web3Utils.isAddress(this.userData.ethAccount);
            },
            isOpeningTimeInTheFuture () {
                return this.crowdsaleData
                    && this.crowdsaleData.openingTime
                    && this.crowdsaleData.openingTime > (new Date().getTime() / 1000);
            },
            initiate () {
                db.ref(`users/${firebase.auth().currentUser.uid}/kycStatus`).set('Unconfirmed');
            }
        }
    };
</script>


<style scoped lang="scss">
    .card {
        min-height: 18rem;
    }

    .social-icons {
        img {
            height: 75px;
            margin: 5px;
        }
    }
</style>
