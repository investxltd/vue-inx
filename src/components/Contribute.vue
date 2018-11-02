<template>
    <b-card title="Contribute to the Token Sale" sub-title="Send the investment through your whitelisted ETH wallet" class="shadow-sm">

        <b-alert variant="danger" :show="!hasWeb3()" dismissible fade>
            No web3!
            <br/>You should try MetaMask or an Ethereum browser to contribute
        </b-alert>

        <b-alert :variant="contributeInfo && contributeInfo.state" :show="!!contributeInfo" dismissible fade>
            {{ contributeInfo && contributeInfo.message }}
        </b-alert>

        <b-form @submit="onSubmit" novalidate class="">

            <b-form-group id="range-amount-group"
                          label="ETH contribution"
                          label-for="amount">
                <b-form-input type="number" :min="min" :max="max" id="amount" v-model="form.amount"></b-form-input>

                <b-form-input type="range" class="mt-3" :min="min" :max="max" step="0.1" id="range-amount" v-model="form.amount"></b-form-input>
                <h4 class="float-right">{{ form.amount }} ETH</h4>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="!hasWeb3()">Contribute</b-button>
        </b-form>

        <div class="or mt-3 mb-3 text-center">- OR -</div>

        <p class="card-text">
            Send ETH to the following address to buy INX
        </p>

        <div class="text-center contract-address">
            <code>{{ userData.commitment }}</code>
        </div>

        <p class="card-text mt-3">
            <strong>Note:</strong> this secure ETH address is assigned only to you, a new address is created for each investor to ensure 100% compliance with UK AML regulations. Once KYC is completed INX will be minted to your own ETH address.
        </p>
    </b-card>
</template>


<script>
    import firebase from 'firebase';
    import {mapState} from 'vuex';

    export default {
        name: 'contribute',
        data () {
            return {
                currentUser: firebase.auth().currentUser,
                form: {
                    amount: 5
                },
                min: 5,
                max: 100.0
            };
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                this.$store.dispatch('contribute', this.form.amount);
            },
            hasWeb3 () {
                return (typeof web3 !== 'undefined');
            }
        },
        computed: {
            ...mapState([
                'db',
                'contributeInfo',
                'userData'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

    .or {
        font-size: 1.3rem;
        color: $secondary;
        font-style: italic;
    }

    .contract-address {
        font-size: 1.25rem;
    }
</style>
