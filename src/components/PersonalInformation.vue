<template>
    <b-card title="Personal Information" sub-title="" class="shadow-sm">
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
                <b-form-input id="email"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Enter email"
                              :disabled="true"
                              :state="true">
                </b-form-input>
                <div class="valid-feedback d-block" v-if="form.emailVerified">Email verified</div>
                <div class="invalid-feedback d-block" v-if="!form.emailVerified">Email not verified</div>
            </b-form-group>
            <b-form-group id="name-group"
                          label="Name:"
                          label-for="name">
                <b-form-input id="name"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="Enter name"
                              :state="!!errors.name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="ethAccount-group"
                          label="ETH wallet:"
                          label-for="ethAccount"
                          description="This is often called your public key">
                <b-form-input id="ethAccount"
                              type="text"
                              v-model="form.ethAccount"
                              required
                              placeholder="Enter ETH wallet"
                              :state="!!errors.ethAccount"
                              :disabled="errors.ethAccount">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-card>
</template>


<script>
    import firebase from 'firebase';
    import Web3Utils from 'web3-utils';

    export default {
        name: 'personal-information',
        data () {
            const user = firebase.auth().currentUser;
            return {
                form: {
                    email: user.email,
                    name: user.displayName,
                    ethAccount: user.photoURL,
                    emailVerified: user.emailVerified
                },
                errors: {
                    email: !!user.email,
                    name: !!user.displayName,
                    ethAccount: !!user.photoURL && Web3Utils.isAddress(user.photoURL)
                },
                dismissSecs: 3,
                dismissCountDown: 0
            };
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();

                this.errors.name = !!this.form.name;
                this.errors.ethAccount = !!this.form.ethAccount && Web3Utils.isAddress(this.form.ethAccount);

                firebase.auth().currentUser
                    .updateProfile({
                        displayName: this.form.name,
                        photoURL: this.form.ethAccount
                    })
                    .then((/*user*/) => {
                        console.log('updated personal information');
                        this.dismissCountDown = this.dismissSecs;
                    })
                    .catch((err) => console.error('Oops. ' + err.message));

            },
            countDownChanged (dismissCountDown) {
                this.dismissCountDown = dismissCountDown;
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

</style>
