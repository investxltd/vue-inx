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
                        <div v-if="!isEthAccountValid()">
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

                            <b-alert variant="warning" show>
                                Please provide a valid Ethereum address so we can start the KYC process.
                                <router-link to="/settings" class="alert-link">Account Settings</router-link>
                            </b-alert>
                        </div>
                        <div v-else-if="!userData.kycStatus">
                            <p class="card-text">
                                Your details will be passed to Coinfirm to capture and process your KYC application
                            </p>

                            <p class="card-text">
                                We will start KYC with:
                                <br>Email <code>{{ userData.email }}</code>
                                <br/>ETH wallet <code>{{ userData.ethAccount }}</code>
                                <!--<br/>User ID <code>{{ userData.uid }}</code>-->
                            </p>

                            <b-button-group class="mx-1 mt-3">
                                <b-button variant="primary" v-on:click="initiate">Initiate KYC</b-button>
                            </b-button-group>
                        </div>
                        <div v-else>
                            <kyc-progress></kyc-progress>
                        </div>
                    </b-card>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <b-card title="Token Sale" sub-title="Steps to contribution" class="shadow-sm" v-if="crowdsaleData && tokenData && userData">
                        <p class="card-text text-center" v-if="isOpeningTimeInTheFuture()">
                            <countdown :timestamp="crowdsaleData.openingTime" ></countdown>
                        </p>
                        <p class="card-text" v-if="tokenData.totalSupply">
                            Total supply of INX is <strong>{{ tokenData.totalSupply }}</strong>.
                        </p>
                        <p class="card-text" v-if="userData.balance">
                            Your balance in INX is <strong>{{ userData.balance }}</strong>.
                        </p>
                        <p class="card-text" v-if="crowdsaleData.isCrowdsaleOpen">
                            The current rate of INX tokens per ETH is <strong>{{ currentRate() }}</strong>.
                        </p>
                        <p class="card-text" v-else>
                            <em>The Investx token sale is not currently open.</em>
                        </p>
                        <p class="card-text">
                            Total raised in ETH so far is <strong>{{ crowdsaleData.raisedInEther }}</strong>
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Token Sale</router-link>
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="Social" sub-title="Be part of the conversation" class="shadow-sm">
                        <div class="card-body social-icons text-center">
                            <a href="https://t.me/investxtoken" target="_blank"><img src="../assets/images/social/telegram.png"/></a>
                            <a href="https://twitter.com/InvestxLtd" target="_blank"><img src="../assets/images/social/twitter.png"/></a>
                            <a href="https://www.facebook.com/InvestxLtd/" target="_blank"><img src="../assets/images/social/facebook.png"/></a>
                            <!--<a href="https://medium.com/investxltd" target="_blank"><img src="../assets/images/social/medium.png"/></a>-->
                            <a href="https://www.linkedin.com/company/investx/" target="_blank"><img src="../assets/images/social/linkedin.png"/></a>
                            <!--<a href="https://www.linkedin.com/company/investx/" target="_blank"><img src="../assets/images/social/reddit.png"/></a>-->
                            <!--<a href="https://bitcointalk.org/index.php?topic=5033458.0" target="_blank"><img src="../assets/images/social/bitcoin.png"/></a>-->
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
    import KycProgress from '@/components/KYCProgress';
    import Countdown from '@/components/Countdown';
    import firebase from 'firebase';
    import { mapState, mapGetters } from 'vuex';
    import { db } from '../main';
    import Web3Utils from 'web3-utils';

    export default {
        name: 'home',
        components: {Countdown, Sidebar, KycProgress},
        data () {
            return {
                currentUser: firebase.auth().currentUser
            };
        },
        computed: {
            ...mapState([
                'tokenData',
                'crowdsaleData',
                'userData'
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
