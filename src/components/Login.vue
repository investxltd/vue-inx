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
                            Sign In
                        </h5>

                        <div class="form-group">
                            <label for="inputEmail">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" required autofocus>
                        </div>

                        <div class="form-group">
                            <label for="inputPassword">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
                        </div>

                        <button class="btn btn-lg btn-primary btn-block" v-on:click="signIn">Sign in</button>

                        <hr class="my-4">

                        <button class="btn btn-lg btn-google btn-block" v-on:click="googleSignIn"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
                        <!--<button class="btn btn-lg btn-facebook btn-block"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>-->

                        <hr class="my-4">

                        <p>
                            You don't have an account? You can
                            <router-link to="/register">Register</router-link>
                        </p>
                        <p>
                            <router-link to="/forgot">Forgot password?</router-link>
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
        name: 'login',
        data: function () {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            signIn: function () {
                firebase.auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        this.$store.dispatch('load-user-data', user.user.uid);
                        return this.$router.replace('home')
                    })
                    .catch((err) => console.error('Oops. ' + err.message));
            },
            googleSignIn: function () {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider)
                    .then((user) => {
                        this.$store.dispatch('load-user-data', user.user.uid);
                        return this.$router.replace('home')
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

    .btn-google {
        color: white;
        background-color: #ea4335;
    }

    .btn-facebook {
        color: white;
        background-color: #3b5998;
    }
</style>
