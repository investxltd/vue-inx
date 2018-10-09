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
                    <b-card title="Receive News" sub-title="Keep up-to-date with all the latest Investx news" class="shadow-sm">
                        <p class="card-text" v-if="userData && userData.marketing">
                            You are currently opted in to receive news.
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="outline-secondary" v-on:click="optOut">Opt out</b-button>
                            </b-button-group>
                        </p>

                        <p class="card-text" v-else-if="userData && !userData.marketing">
                            You are currently <strong>not</strong> opted in to receive news.
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="primary" v-on:click="optIn">Send me the news</b-button>
                            </b-button-group>
                        </p>

                        <b-alert show variant="warning" v-else>
                            Please select your news preference
                            <br/>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="primary" v-on:click="optIn">Send me the news</b-button>
                            </b-button-group>
                            <b-button-group class="mx-1 mt-3">
                                <b-button size="sm" variant="outline-secondary">No thanks</b-button>
                            </b-button-group>
                        </b-alert>
                    </b-card>
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
    import firebase from 'firebase';
    import { db } from '../main';
    import { mapState } from 'vuex';

    export default {
        name: 'settings',
        components: {Sidebar, PersonalInformation},
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
