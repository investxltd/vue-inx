<template>
    <b-card title="INX Calculator" sub-title="Use the calculator to see the quantity of INX you will receive" class="shadow-sm">
        <p class="card-text">
            The current rate is <strong>{{ currentRate() }}</strong> INX per ETH
        </p>
        <b-form novalidate>
            <div class="row">
                <div class="col-sm-5">
                    <b-input
                            class="mb-2 mb-sm-0"
                            v-model="form.eth"
                            name="eth"
                            placeholder="ETH"
                            type="number"
                            @change.native="doCalc">
                    </b-input>
                    <span class="float-right pr-1"><strong>1 ETH</strong></span>
                </div>
                <div class="col-sm-2 text-center">
                    <img src="../assets/images/arrow_across.png" @click="doCalc"/>
                </div>
                <div class="col-sm-5">
                    <b-input
                            class="mb-2 mr-sm-2 mb-sm-0"
                            v-model="form.inx"
                            id="inx"
                            name="inx"
                            placeholder="INX"
                            type="number"
                            @change.native="doReverseCalc">
                    </b-input>
                    <span class="float-right pr-1"><strong>{{ currentRate() }} INX</strong></span>
                </div>
            </div>
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

    img {
        height: 30px;
    }
</style>
