<template>
    <div>
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

                <!--<b-navbar-nav>-->
                    <!--&lt;!&ndash; This menu is hidden in bigger devices with d-sm-none.-->
         <!--The sidebar isn't proper for smaller screens imo, so this dropdown menu can keep all the useful sidebar itens exclusively for smaller screens  &ndash;&gt;-->
                    <!--<li class="nav-item dropdown d-sm-block d-md-none">-->
                        <!--<a class="nav-link dropdown-toggle" href="#" id="smallerscreenmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                            <!--Menu-->
                        <!--</a>-->
                        <!--<div class="dropdown-menu" aria-labelledby="smallerscreenmenu">-->
                            <!--<a class="dropdown-item" href="#">Dashboard</a>-->
                            <!--<a class="dropdown-item" href="#">Profile</a>-->
                            <!--<a class="dropdown-item" href="#">Tasks</a>-->
                            <!--<a class="dropdown-item" href="#">Etc ...</a>-->
                        <!--</div>-->
                    <!--</li>&lt;!&ndash; Smaller devices menu END &ndash;&gt;-->
                <!--</b-navbar-nav>-->

            </b-collapse>

        </b-navbar>

    </div>

</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "Header",
        computed: {
            ...mapState(['user'])
        },
        methods: {
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