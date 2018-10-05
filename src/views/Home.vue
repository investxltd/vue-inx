<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Home</h1>
            <h3>Welcome {{ this.currentUser.displayName }} to the Investx portal</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <b-card title="Token Sale" sub-title="Steps to contribution" class="shadow-sm">
                        <p class="card-text text-center">
                            <countdown :timestamp="1539594078" v-if="crowdsaleData"></countdown>
                        </p>
                        <p class="card-text">
                            Once you have passed our <em>KYC</em> process you can contribute and purchase INX tokens.
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
                    <b-card title="Up Next" sub-title="Completing KYC and AML" class="shadow-sm">
                        <p class="card-text">
                            All participants in the ICO <span class="text-bold">must</span> be verified by our KYC provider.
                        </p>

                        <b-alert show variant="warning" v-if="!this.currentUser.photoURL">
                            Please update you Ethereum address so we can start the KYC process.
                            <router-link to="/settings" class="alert-link">Account Settings</router-link>
                        </b-alert>

                        <div slot="footer">
                            <a href="#" class="card-link">Jump to KYC</a>
                        </div>
                    </b-card>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <b-card title="Receive News" sub-title="Keep up-to-date with all the latest Investx news" class="shadow-sm">
                        <p class="card-text" v-if="userData && userData.marketing">
                            You are currently opted in to receive news.
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="outline-secondary" v-on:click="optOut">Opt out</b-button>
                            </b-button-group>
                        </p>

                        <p class="card-text" v-else-if="userData && !userData.marketing">
                            You are currently <strong>not</strong> opted in to receive news.
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="primary" v-on:click="optIn">Send me the news</b-button>
                            </b-button-group>
                        </p>

                        <b-alert show variant="warning" v-else>
                            Please select your news preference
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="primary" v-on:click="optIn">Send me the news</b-button>
                            </b-button-group>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="outline-secondary">No thanks</b-button>
                            </b-button-group>
                        </b-alert>
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
    import firebase from 'firebase';
    import { mapState, mapGetters } from 'vuex';
    import Countdown from '@/components/Countdown';
    import { db } from '../main';

    export default {
        name: 'home',
        components: {Countdown, Sidebar},
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
            optIn: function () {
                db.ref(`users/${firebase.auth().currentUser.uid}/marketing`).set(true);
            },
            optOut: function () {
                db.ref(`users/${firebase.auth().currentUser.uid}/marketing`).set(false);
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
