<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Home</h1>
            <h3>Welcome {{ this.currentUser.displayName }} to the Investx portal</h3>

            <hr/>

            <b-alert show variant="warning" v-if="!this.currentUser.photoURL">
                Please update you Ethereum address so we can start the KYC process.
                <router-link to="/settings" class="alert-link">Account Settings</router-link>
            </b-alert>

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
                            <a href="#" class="card-link">Start KYC</a>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="Token Sale" sub-title="Steps to contribution">
                        <p class="card-text">
                            Once you have passed our <em>KYC</em> process you can contribute and purchase INX tokens.
                        </p>
                        <p class="card-text">
                            Total raised in ETH so far is <strong>{{ crowdsaleData.raisedInEther }}</strong>
                        </p>
                        <p class="card-text">
                            The current rate of INX tokens per ETH is <strong>{{ crowdsaleData.rate }}</strong>.
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Token Sale</router-link>
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
                        </div>
                    </b-card>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <b-card title="Receive News" sub-title="Keep up-to-date with all the latest Investx news">
                        <p class="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div slot="footer">
                            <b-button-group class="mx-1">
                                <b-button size="sm" variant="primary">Send me the news</b-button>
                            </b-button-group>
                            <b-button-group class="mx-1">
                                <b-button size="sm" variant="outline-secondary">No thanks</b-button>
                            </b-button-group>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <b-card title="Social" sub-title="Be part of the conversation">
                        <p class="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div slot="footer">Telegram | Twitter | FaceBook | Medium</div>
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
    import {mapState} from 'vuex';

    export default {
        name: 'home',
        components: {Sidebar},
        data () {
            return {
                currentUser: firebase.auth().currentUser
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
    .card {
        min-height: 18rem;
    }
</style>
