<template>
    <b-card title="Personal Information" sub-title="">
        <b-alert :show="dismissCountDown"
                 dismissible
                 variant="success"
                 @dismissed="dismissCountDown=0"
                 @dismiss-count-down="countDownChanged">
            Personal information updated
        </b-alert>

        <b-form @submit="onSubmit" v-if="show" novalidate :validated="true">
            <b-form-group id="email-group"
                          label="Email address:"
                          label-for="email"
                          description="We'll never share your email with anyone else.">
                <b-form-input id="email"
                              type="email"
                              v-model="form.email"
                              required
                              placeholder="Enter email"
                              :disabled="true">
                </b-form-input>
            </b-form-group>
            <b-form-group id="name-group"
                          label="Name:"
                          label-for="name">
                <b-form-input id="name"
                              type="text"
                              v-model="form.name"
                              required
                              placeholder="Enter name">
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
                              placeholder="Enter ETH wallet">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </b-card>
</template>


<script>
    import firebase from 'firebase';

    export default {
        name: 'personal-information',
        data () {
            return {
                form: {
                    email: firebase.auth().currentUser.email,
                    name: firebase.auth().currentUser.displayName,
                    ethAccount: firebase.auth().currentUser.photoURL
                },
                show: true,
                dismissSecs: 3,
                dismissCountDown: 0
            };
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();

                firebase.auth().currentUser.updateProfile({
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
                this.dismissCountDown = dismissCountDown
            },
            showAlert () {
                this.dismissCountDown = this.dismissSecs
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

</style>
