<template>
    <b-card title="KYC progress" sub-title="" class="shadow-sm">

        <div class="card-body text-center">
            <div class="circle-wrap">
                <div class="circle complete">1</div>
                <div class="circle-label">Initiate</div>
            </div>
            <div class="circle-wrap">
                <div class="circle todo">2</div>
                <div class="circle-label">Submit</div>
            </div>
            <div class="circle-wrap">
                <div class="circle todo">3</div>
                <div class="circle-label">Process</div>
            </div>
            <div class="circle-wrap">
                <div class="circle todo">4</div>
                <div class="circle-label">Contribute!</div>
            </div>
        </div>


        <b-alert show variant="warning" v-if="!this.currentUser.photoURL">
            Please update you Ethereum address so we can start the KYC process.
            <router-link to="/settings" class="alert-link">Account Settings</router-link>
        </b-alert>

        <p class="card-text" v-else>
            We will start KYC with the provided email of <code>{{ currentUser.email }}</code> and the ETH wallet of <code>{{ currentUser.photoURL }}</code>
            <br/>
            Your UID is <code>{{ currentUser.uid }}</code>
        </p>

        <div slot="footer" v-if="currentUser.photoURL">
            <b-form @submit="onSubmit" v-if="show" novalidate :validated="true" class="">
                <b-button type="submit" variant="primary">Start KYC</b-button>
            </b-form>
        </div>
    </b-card>
</template>


<script>
    import firebase from 'firebase';

    export default {
        name: 'kyc-progress',
        data () {
            return {
                currentUser: firebase.auth().currentUser,
                show: true
            };
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                this.show = false;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../assets/scss/inx-colours.scss';

    .circle-wrap {
        display: inline-flex;
        font-size: 0.75rem;
        margin: 10px;
        text-align: center;
        flex-direction: column;
    }

    .circle {
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: $white;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        background-color: $secondary;
    }

    .circle-label {
        margin-top: 15px;
    }

    .complete {
        background-color: $primary;
    }

    .todo {
        background-color: $secondary;
    }

    .error {
        background-color: red;
    }
</style>
