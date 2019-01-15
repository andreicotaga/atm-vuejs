<template>
    <b-row class="login-page">
        <b-col md="6" offset-md="3" class="login-page__content">
            <div class="login-page__content--title">
                <h1>Login in your account</h1>
            </div>
            <div class="login-page__content--form">
                <LoginForm/>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import LoginForm from "../components/LoginForm.vue";

    export default {
        name: "Login",
        components: { LoginForm }
    }
</script>

<style lang="css" scoped>

    .login-page
    {
        margin-top: 50px;
    }

    .login-page__content--title
    {
        text-align: center;
        font-size: 24px;
    }
</style>