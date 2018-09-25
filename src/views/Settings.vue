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
                    <b-card title="Why we need this information" sub-title="Explanation of how we handle your data" class="shadow-sm">
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <p class="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <div slot="footer">
                            <router-link to="/token-sale" class="card-link">Read more</router-link>
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Sidebar from '@/components/Sidebar';
    import PersonalInformation from '@/components/PersonalInformation';

    export default {
        name: 'settings',
        components: {Sidebar, PersonalInformation}
    };
</script>

<style scoped lang="scss">

</style>
