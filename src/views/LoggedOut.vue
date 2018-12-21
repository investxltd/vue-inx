<template>
    <div class="wrapper">
        <div class="row" id="banner">
            <div class="col-sm-8 m-5">
                <b-alert :show="true"
                         dismissible
                         variant="success">
                    Thank you, you have logged out from the Investx portal
                </b-alert>
                <h2>Blockchain investments in real world businesses</h2>
                <h3>Investx will revolutionise investing in SME businesses by using blockchain technologies to improve access and reduce costs.</h3>
                <a class="btn btn-primary mt-5" href="https://www.investx.io">Go to Investx.io</a>
            </div>
            <div class="col">
                &nbsp;
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'logged-out'
    };
</script>

<style scoped lang="scss">
    #banner {
        background-image: url("../assets/images/bg_banner_low.1da214f94c92292ec1620b0a8292c210.jpg");
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 500px;
        color: white;
    }

    h2 {
        margin-top: 5rem;
        font-size: 3.5rem;
        color: white;
        font-weight: 300;
    }

    h3 {
        margin-top: 2rem;
        font-size: 1.25rem;
        color: white;
    }
</style>
