<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <div class="text-center mb-5">
                            <img alt="Investx" src="../assets/inx_logo.png" class="inx-logo"/>
                        </div>
                        <h5 class="card-title text-center">Register</h5>

                        <div class="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus>
                        </div>

                        <div class="form-group">
                            <label for="inputName">Full Name</label>
                            <input type="email" id="inputName" class="form-control" placeholder="Full Name" v-model="name" required>
                        </div>

                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block" type="submit" v-on:click="signUp">Register</button>

                        <hr class="my-4">

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
    import { db } from '../main';

    export default {
        name: 'signUp',
        data: function () {
            return {
                email: '',
                password: '',
                name: ''
            };
        },
        methods: {
            signUp: function () {
                firebase.auth()
                    .createUserWithEmailAndPassword(this.email, this.password)
                    .then((credential) => Promise.all([
                        credential.user.updateProfile({
                            displayName: this.name,
                            photoURL: ''
                        }),
                        credential.user.sendEmailVerification()])
                    )
                    .then(() => db.ref(`users/${firebase.auth().currentUser.uid}/marketing`).set(false))
                    .then(() => {
                        this.$store.dispatch('load-user-data', firebase.auth().currentUser.uid);
                        this.$router.replace('home')
                    })
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
</style>
