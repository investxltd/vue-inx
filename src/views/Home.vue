<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content" v-if="userData">
            <h1>Home</h1>
            <h3>Welcome {{ this.userData.displayName }} to the Investx portal</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <b-card title="Investx INX token" sub-title="Purchase process" class="shadow-sm">
                        <div>
                            <h5>1. Email verification</h5>
                            <p class="card-text">You email must be verified – when you registered we sent you a verification link by email.</p>
                            <p class="card-text">Please click on the link to verify the email address which
                                you registered is yours.</p>
                            <p class="card-text">You can check whether your email address has been verified in the Account Settings page linked on the left.</p>
                            <h5>2. Ethereum wallet</h5>
                            <p class="card-text">Before purchasing INX you must input your Ethereum wallet address where you will send your ETH from into the Account Settings page.</p>
                            <p class="card-text">The Ethereum wallet
                                you input will be the address your INX will be sent to, so please ensure it is correct and you have access to it.</p>
                            <p class="card-text"><strong>Do not use any exchange addresses or any other shared/third party addresses and do not input your private key.</strong></p>
                            <h5>3. Contributor smart contract address allocation</h5>
                            <p class="card-text">One you have input your Ethereum address we will allocate you a unique Ethereum smart contract which will show in this dashboard.</p>
                            <p class="card-text">This address is
                                created just for you and acts as a secure escrow account created so we can ensure ETH is assigned to individuals alongside their KYC checks in accordance with UK
                                AML
                                regulations.</p>
                            <p class="card-text">ETH can only be transferred out to the Investx crowdsale contract or refunded back to your nominated Ethereum address (in the event the soft cap is
                                not
                                reached).</p>
                            <h5>4. KYC</h5>
                            <p class="card-text">Investx will perform standard KYC checks before releasing INX tokens to contributors, via a major third party KYC processor.</p>
                            <p class="card-text">These checks will include standard AML, sanctions, PEP and source of wealth checks (for larger contributions) and will be processed in batches
                                on or
                                before the soft cap is reached. <strong>If you have any reason to believe you will fail KYC checks you should not invest.</strong></p>
                            <h5>5. Token distribution</h5>
                            <p class="card-text">Once you have passed KYC the committed ETH will transfer to the Investx crowdsale contract and the correct amount of INX will be minted
                                into your
                                Ethereum wallet address. Token transfers will be enabled at the end of the ICO.</p>

                            <b-alert variant="warning" show v-if="!isEthAccountValid()" class="mt-5">
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
                    </b-card>
                    <!--<b-card title="Up Next" sub-title="Completing KYC and AML" class="shadow-sm">-->
                    <!--<div>-->
                    <!--<p class="card-text">-->
                    <!--Investx will perform standard KYC checks before releasing INX tokens to contributors.-->
                    <!--</p>-->

                    <!--<p class="card-text">-->
                    <!--These checks will include AML, sanctions, PEP and source of wealth checks (for larger contributions) and will be processed on or before the soft cap is reached.-->
                    <!--</p>-->

                    <!--<b-alert variant="warning" show v-if="!isEthAccountValid()">-->
                    <!--Please provide a valid Ethereum address and we will allocate your personalised contribution smart contract-->
                    <!--<router-link to="/settings" class="alert-link">Account Settings</router-link>-->
                    <!--</b-alert>-->

                    <!--<p class="card-text text-right">-->
                    <!--<em>For help and support visit our <a href="https://t.me/investxtoken" target="_blank">Telegram</a> channel</em>-->
                    <!--<a href="https://t.me/investxtoken" target="_blank" class="ml-3">-->
                    <!--<img src="../assets/images/social/telegram.png" style="max-height: 50px"/>-->
                    <!--</a>-->
                    <!--</p>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div v-else-if="!userData.kycStatus">&ndash;&gt;-->
                    <!--&lt;!&ndash;<p class="card-text">&ndash;&gt;-->
                    <!--&lt;!&ndash;Your details will be passed to Coinfirm to capture and process your KYC application&ndash;&gt;-->
                    <!--&lt;!&ndash;</p>&ndash;&gt;-->

                    <!--&lt;!&ndash;<p class="card-text">&ndash;&gt;-->
                    <!--&lt;!&ndash;We will start KYC with:&ndash;&gt;-->
                    <!--&lt;!&ndash;<br>Email <code>{{ userData.email }}</code>&ndash;&gt;-->
                    <!--&lt;!&ndash;<br/>ETH wallet <code>{{ userData.ethAccount }}</code>&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<br/>User ID <code>{{ userData.uid }}</code>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;</p>&ndash;&gt;-->

                    <!--&lt;!&ndash;<b-button-group class="mx-1 mt-3">&ndash;&gt;-->
                    <!--&lt;!&ndash;<b-button variant="primary" v-on:click="initiate">Initiate KYC</b-button>&ndash;&gt;-->
                    <!--&lt;!&ndash;</b-button-group>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div v-else-if="userData.kycStatus && !userData.kyc">&ndash;&gt;-->
                    <!--&lt;!&ndash;<kyc-progress></kyc-progress>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</b-card>-->

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

    h5 {
        margin-top: 35px;
    }
</style>
