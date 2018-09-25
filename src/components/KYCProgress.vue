<template>
    <b-card title="KYC progress" sub-title="" class="shadow-sm">

        <p class="card-text">
            Due to current legislation all ICO investors, will need to pass KYC verification to get future access to the platform. That is why we have decided to collaborate with XYZ for this process
            so it will be fast and secure! Simply follow the steps on following link to complete it easily. It will not take more than a few minutes. All investors, including PRESALE contributors,
            must pass it before they can access the platform.
        </p>

        <p class="card-text" v-if="!currentUser.photoURL">
            <span class="text-danger">We can start KYC once we have an email and ETH wallet.</span>
            Please provide your ETH wallet via
            <router-link to="/settings">Account Settings</router-link>
        </p>

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

</style>
