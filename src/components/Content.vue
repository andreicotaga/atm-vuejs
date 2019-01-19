<template>
        <div class="container">
            <div class="content">
                <Deposit v-if="route === '/account/deposit'"/>
                <Withdraw v-if="route === '/account/withdraw'"/>
                <History v-if="route === '/account/history'"/>
                <Transfer v-if="route === '/account/transfer'"/>
            </div>
        </div>
</template>

<script>
    import Deposit from "./operations/Deposit.vue";
    import Withdraw from "./operations/Withdraw.vue";
    import History from "./operations/History.vue";
    import Transfer from "./operations/Transfer.vue";
    import SideBar from "./SideBar.vue";

    export default {
        name: "Content",
        data: function() {
            return {
                route: null,
            }
        },
        mounted () {
            this.route = this.$route.path;
        },
        watch: {
            '$route' () {
                this.setOperation()
            }
        },
        methods: {
            setOperation ()
            {
                this.route = this.$route.path
            }
        },
        components: {SideBar, Transfer, History, Withdraw, Deposit}
    }
</script>

<style lang="css" scoped>
    .content
    {
        padding-top: 1em;
    }
</style>