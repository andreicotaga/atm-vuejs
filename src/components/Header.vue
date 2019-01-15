<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand tag="h1" class="mb-0">Automated Teller Machine</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse" v-if="this.$store.state.isLogged && user.hasOwnProperty('balance')">

            <b-navbar-nav>
                <b-nav-item href="#">Balance: {{ user.balance }}</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown right>

                    <template slot="button-content">
                        Welcome, {{ user.first_name + ' ' + user.last_name }}
                    </template>

                    <b-dropdown-item @click="logout">Log out</b-dropdown-item>

                </b-nav-item-dropdown>

            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</template>

<script>
    export default {
        name: "Header",
        data () {
            return {
                user: {}
            }
        },
        mounted() {
            this.getUser();
        },
        methods: {
            getUser ()
            {
                this.$store.dispatch('getUser')
                    .then((res) =>
                    {
                        this.user = res.user;
                    });
            },
            logout ()
            {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>