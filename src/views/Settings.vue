<template>
    <div class="wrapper">
        <sidebar></sidebar>

        <div id="content">
            <h1>Account Settings</h1>
            <h3>All your details about your accounts</h3>

            <hr/>

            <div class="row">
                <div class="col">
                    <personal-information></personal-information>
                </div>
                <div class="col">
                    <marketing-preference></marketing-preference>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col">
                    <b-card title="Reset Password" sub-title="" class="shadow-sm">
                        <div v-if="!message">
                            <b-form @submit="forgot" novalidate>
                                <div class="form-group">
                                    <label for="inputEmail">Email address</label>
                                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required :disabled="true" :state="true">
                                </div>

                                <b-button type="submit" variant="primary">Send reset password email</b-button>
                            </b-form>
                        </div>
                        <div v-else>
                            <b-alert show variant="warning">
                                {{ message }}
                            </b-alert>
                        </div>
                    </b-card>
                </div>
                <div class="col">
                    <em>&nbsp;</em>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import PersonalInformation from '@/components/PersonalInformation';
    import MarketingPreference from '@/components/MarketingPreference';
    import firebase from 'firebase';
    import { db } from '../main';
    import { mapState } from 'vuex';

    export default {
        name: 'settings',
        components: {Sidebar, PersonalInformation, MarketingPreference},
        data () {
            const user = firebase.auth().currentUser;
            return {
                email: user.email,
                message: ''
            };
        },
        computed: {
            ...mapState([
                'userData'
            ])
        },
        methods: {
            forgot: function (evt) {
                evt.preventDefault();

                firebase.auth().sendPasswordResetEmail(this.email)
                    .then((/*user*/) => this.message = 'Reset password email sent')
                    .catch((err) => console.error('Oops. ' + err.message));
            },
            optIn: function () {
                db.ref(`users/${firebase.auth().currentUser.uid}/marketing`).set(true);
            },
            optOut: function () {
                db.ref(`users/${firebase.auth().currentUser.uid}/marketing`).set(false);
            },
        }
    };
</script>

<style scoped lang="scss">

</style>
