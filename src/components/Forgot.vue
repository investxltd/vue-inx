<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <div class="text-center mb-5">
                            <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo"/>
                        </div>
                        <h5 class="card-title text-center">
                            Forgot password
                        </h5>

                        <div v-if="!message">
                            <div class="form-group">
                                <label for="inputEmail">Email address</label>
                                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus>
                            </div>

                            <button class="btn btn-lg btn-primary btn-block" v-on:click="forgot">Send reset email</button>
                        </div>
                        <div v-else>
                            <b-alert show variant="warning">
                                {{ message }}
                                <router-link to="/login" class="alert-link">Sign in</router-link>
                            </b-alert>
                        </div>

                        <hr class="my-4">

                        <p>
                            You don't have an account? You can
                            <router-link to="/register">Register</router-link>
                        </p>
                        <p>
                            Or go back to
                            <router-link to="/login">Sign in</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'forgot',
        data: function () {
            return {
                email: '',
                message: ''
            };
        },
        methods: {
            forgot: function () {
                firebase.auth().sendPasswordResetEmail(this.email)
                    .then((/*user*/) => this.message = 'Password reset email sent')
                    .catch((err) => console.error('Oops. ' + err.message));
            }
        }
    };
</script>

<style scoped lang="scss">
    .card-signin {
        border: 0;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    }

    .card-signin .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .card-signin .card-body {
        padding: 2rem;
    }

    .btn-google {
        color: white;
        background-color: #ea4335;
    }

    .btn-facebook {
        color: white;
        background-color: #3b5998;
    }
</style>
