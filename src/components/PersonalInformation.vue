<template>
    <b-card title="Personal Information" sub-title="" class="shadow-sm" v-if="userData">
        <b-alert :show="dismissCountDown"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            Personal information updated
        </b-alert>

        <b-form @submit="onSubmit" novalidate>
            <b-form-group id="email-group"
                          label="Email address:"
                          label-for="email"
                          description="We will never share your email with anyone else.">
                <div class="valid-feedback d-block" v-if="userData.emailVerified">Email verified</div>
                <div class="invalid-feedback d-block" v-if="!userData.emailVerified">Email not verified</div>
                <b-form-input id="email"
                              type="email"
                              v-model="userData.email"
                              required
                              placeholder="Enter email"
                              :disabled="true"
                              :state="true">
                </b-form-input>
            </b-form-group>
            <b-form-group id="name-group"
                          label="Name:"
                          label-for="name">
                <b-form-input id="name"
                              type="text"
                              v-model="userData.displayName"
                              required
                              placeholder="Enter name"
                              :state="!!userData.displayName">
                </b-form-input>
            </b-form-group>
            <b-form-group id="ethAccount-group"
                          label="ETH wallet:"
                          label-for="ethAccount"
                          description="This is often called your public key. Please ensure you input your correct ETH wallet because INX tokens will be sent to this address only.">
                <b-form-input id="ethAccount"
                              type="text"
                              v-model="userData.ethAccount"
                              required
                              placeholder="Enter ETH wallet"
                              :disabled="isEthAccountValid()"
                              :state="isEthAccountValid()">
                </b-form-input>
            </b-form-group>

            <b-form-checkbox id="tAndCs"
                             v-model="userData.tAndCs"
                             value="accepted"
                             unchecked-value="not_accepted"
                            class="mb-4">
                I confirm I am not a citizen, national, resident (tax or otherwise) of the USA, South Korea or China and I agree to the <a href="https://investx.io/ico-terms-and-conditions" target="_blank">Investx T&Cs</a>
            </b-form-checkbox>

            <b-button type="submit" variant="primary" :disabled="userData && userData.tAndCs !== 'accepted'">Submit</b-button>
        </b-form>
    </b-card>
</template>


<script>
    import firebase from 'firebase';
    import Web3Utils from 'web3-utils';
    import { db } from '../main';
    import { mapState } from 'vuex';

    export default {
        name: 'personal-information',
        data () {
            return {
                dismissSecs: 3,
                dismissCountDown: 0
            };
        },
        computed: {
            ...mapState([
                'userData'
            ])
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();

                firebase.auth().currentUser
                    .updateProfile({
                        displayName: this.userData.displayName,
                    })
                    .then((/*user*/) => {
                        if (this.isEthAccountValid()) {
                            return db.ref(`users/${firebase.auth().currentUser.uid}/ethAccount`).set(this.userData.ethAccount);
                        }
                        else {
                            return true;
                        }
                    })
                    .then((/*user*/) => {
                        return db.ref(`users/${firebase.auth().currentUser.uid}/tAndCs`).set(this.userData.tAndCs);
                    })
                    .then(() => {
                        this.dismissCountDown = this.dismissSecs;
                        this.$store.dispatch('load-user-data', firebase.auth().currentUser.uid);
                    })
                    .catch((err) => console.error('Oops. ' + err.message));

            },
            countDownChanged (dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs;
            },
            isEthAccountValid () {
                if (!this.userData.ethAccount) {
                    return false;
                }
                return Web3Utils.isAddress(this.userData.ethAccount);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

</style>
