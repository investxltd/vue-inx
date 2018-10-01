<template>
    <b-card title="INX Calculator" sub-title="Use the calculator to compute an estimation of the INX you will receive" class="shadow-sm">
        <p class="card-text">
            The current rate is <strong>{{ currentRate() }}</strong> INX per ETH
        </p>
        <b-form inline novalidate>
            <b-input
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="form.eth"
                    name="eth"
                    placeholder="ETH"
                    type="number"
                    @change.native="doCalc">
            </b-input>

            <img src="../assets/images/social/telegram.png" @click="doCalc"/>

            <b-input
                    class="mb-2 mr-sm-2 ml-sm-2 mb-sm-0"
                    v-model="form.inx"
                    id="inx"
                    name="inx"
                    placeholder="INX"
                    type="number"
                    @change.native="doReverseCalc">
            </b-input>

        </b-form>
    </b-card>
</template>


<script>

    import { mapGetters } from 'vuex';

    export default {
        name: 'calc',
        data () {
            return {
                form: {
                    eth: null,
                    inx: null
                },
                min: 0.1,
                max: 100.0
            };
        },
        methods: {
            doCalc: function (evt) {
                evt.preventDefault();
                this.form.inx = (parseFloat(this.form.eth) * parseFloat(this.currentRate())).toFixed(3);
            },
            doReverseCalc: function (evt) {
                evt.preventDefault();
                this.form.eth = (parseFloat(this.form.inx) / parseFloat(this.currentRate())).toFixed(3);
            }
        },
        computed: {
            ...mapGetters([
                'currentRate'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';
</style>
