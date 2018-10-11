<template>
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
</template>


<script>
    import firebase from 'firebase';

    export default {
        name: 'forgot-password',
        data () {
            const user = firebase.auth().currentUser;
            return {
                email: user.email,
                message: ''
            };
        },
        computed: {},
        methods: {
            forgot: function (evt) {
                evt.preventDefault();

                firebase.auth().sendPasswordResetEmail(this.email)
                    .then((/*user*/) => this.message = 'Reset password email sent')
                    .catch((err) => console.error('Oops. ' + err.message));
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

</style>
