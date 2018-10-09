<template>
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
</template>


<script>
    import firebase from 'firebase';
    import { db } from '../main';
    import { mapState } from 'vuex';

    export default {
        name: 'marketing-preference',
        computed: {
            ...mapState([
                'userData'
            ])
        },
        methods: {
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
    @import '../assets/scss/inx-colours.scss';

</style>
