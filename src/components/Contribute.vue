<template>
    <b-card title="Contribute to the Token Sale" sub-title="Send the investment through your whitelisted ETH wallet" class="shadow-sm">

        <b-form @submit="onSubmit" v-if="show" novalidate class="">

            <b-form-group id="range-amount-group"
                          label="ETH contribution"
                          label-for="amount">
                <b-form-input type="number" :min="min" :max="max" id="amount" v-model="form.amount"></b-form-input>

                <b-form-input type="range" class="mt-3" :min="min" :max="max" step="0.1" id="range-amount" v-model="form.amount"></b-form-input>
                <h4 class="float-right">{{ form.amount }} ETH</h4>
            </b-form-group>

            <b-button type="submit" variant="primary">Contribute</b-button>
        </b-form>

        <div class="or mt-3 mb-3 text-center">- OR -</div>

        <p class="card-text">
            Send ETH to the following address to buy INX
        </p>

        <div class="text-center contract-address">
            <code>{{ db.crowdsaleAddress }}</code>
        </div>
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
                    amount: 1
                },
                show: true,
                min: 0.1,
                max: 100.0
            };
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
            }
        },
        computed: {
            ...mapState([
                'db'
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
