<template>
    <div v-if="userData">
        <div class="text-center">
            <div class="circle-wrap">
                <div class="circle" v-bind:class="{ 'complete': initiated() }">
                    <span v-if="initiated()">&#10003;</span>
                    <span v-else>1</span>
                </div>
                <div class="circle-label">Initiate</div>
            </div>
            <div class="circle-wrap">
                <div class="circle" v-bind:class="{ 'complete': received() }">
                    <span v-if="received()">&#10003;</span>
                    <span v-else>2</span>
                </div>
                <div class="circle-label">Submit</div>
            </div>
            <div class="circle-wrap">
                <div class="circle" v-bind:class="{ 'complete': underReview(), 'incomplete': incomplete(),  'failed': failed() }">
                    <span v-if="underReview()">&#10003;</span>
                    <span v-else-if="incomplete()">&#8212;</span>
                    <span v-else-if="failed()">&#10007;</span>
                    <span v-else>3</span>
                </div>
                <div class="circle-label">Process</div>
            </div>
            <div class="circle-wrap">
                <div class="circle" v-bind:class="{ 'complete': complete() }">
                    <span v-if="complete()">&#10003;</span>
                    <span v-else>4</span>
                </div>
                <div class="circle-label">Contribute!</div>
            </div>
        </div>

        <div v-if="userData.kycStatus === 'Unconfirmed'">
            Thank you for starting KYC process. Coinfirm has received your details and are awaiting for you to submit your process your KYC application
            information
        </div>

        <div v-else-if="userData.kycStatus === 'Received'">
            Coinfirm has received your information provided for KYC and these are currently under review. Thank you for you patience.
        </div>

        <div v-else-if="userData.kycStatus === 'Under Review'">
            Coinfirm has received your information provided for KYC and these are currently under review. Thank you for you patience.
        </div>

        <div v-else-if="userData.kycStatus === 'Incomplete'">
            The details that you have provided have been analysed and have been identified as being incomplete. Coinfirm has requested further information to enable the process to complete.
        </div>

        <div v-else-if="userData.kycStatus === 'High'">
            KYC Completed! Thank you, we have whitelisted your account.
        </div>

        <div v-else-if="userData.kycStatus === 'Low'">
            Sorry, but Coinfirm have evaluated the risks associated to the details provided and we cannot continue with your application. We wish you all the best on your crypto adventures.
        </div>

        <a href="#" v-on:click="tempCycle">next...</a>

    </div>
</template>


<script>

    // Unconfirmed: participant has been invited to join the KYC process however the participant has not yet submitted the details that are required by Coinfirm
    // Received: participant has provided KYC details to Coinfirm and these have been submitted for review
    // Under Review: the KYC form and details for the participant are currently being evaluated by Coinfirm analysts
    // Incomplete: the details that have been provided by the participant have been analysed and have been identified as being incomplete. The participant has been requested to provide further information to enable Coinfirm to complete the process of review.
    // Low: Coinfirm analysts have evaluated the risks associated to the participant to be low
    // Medium: Coinfirm analysts have evaluated the risks associated to the participant to be medium
    // High: Coinfirm analysts have evaluated the risks associated to the participant to be high
    // Proceed with extreme caution: Coinfirm analysts have evaluated the risks associated with the subject to be extremely high. In some cases, this may indicate direct links to crime or terrorism activity.

    import firebase from 'firebase';
    import { mapState } from 'vuex';
    import { db } from '../main';
    import Web3Utils from 'web3-utils';

    export default {
        name: 'kyc-progress',
        computed: {
            ...mapState([
                'userData'
            ])
        },
        data () {
            return {
                tempCycleIndex: -1
            };
        },
        methods: {
            initiated () {
                return ['Unconfirmed', 'Received', 'Under Review', 'Incomplete', 'High', 'Low'].includes(this.userData.kycStatus);
            },
            received () {
                return ['Received', 'Under Review', 'Incomplete', 'High', 'Low'].includes(this.userData.kycStatus);
            },
            underReview () {
                return ['Under Review', 'High'].includes(this.userData.kycStatus);
            },
            incomplete () {
                return ['Incomplete'].includes(this.userData.kycStatus);
            },
            failed () {
                return ['Low'].includes(this.userData.kycStatus);
            },
            complete () {
                return ['High'].includes(this.userData.kycStatus);
            },
            isEthAccountValid () {
                if (!this.userData.ethAccount) {
                    return false;
                }
                return Web3Utils.isAddress(this.userData.ethAccount);
            },
            tempCycle () {
                const states = ['Unconfirmed', 'Received', 'Under Review', 'Incomplete', 'High', 'Low'];
                this.tempCycleIndex++;
                if (this.tempCycleIndex >= states.length) {
                    this.tempCycleIndex = 0;
                }
                db.ref(`users/${firebase.auth().currentUser.uid}/kycStatus`).set(states[this.tempCycleIndex]);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

    .circle-wrap {
        display: inline-flex;
        font-size: 0.75rem;
        margin: 20px;
        text-align: center;
        flex-direction: column;
    }

    .circle {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: $white;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        background-color: $secondary;
    }

    .circle-label {
        margin-top: 15px;
    }

    .complete {
        background-color: $primary;
    }

    .todo {
        background-color: $secondary;
    }

    .incomplete {
        background-color: darkorange;
    }

    .failed {
        background-color: firebrick;
    }
</style>
