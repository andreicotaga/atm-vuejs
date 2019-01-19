<template>
    <nav class="bd-links navbar-collapse collapse show" id="bd-docs-nav">

        <div class="bd-toc-item active">
            <a href="/docs/components/" class="bd-toc-link nuxt-link-active">
                <h4>Operations</h4>
            </a>
            <ul class="bd-sidenav nav">
                <li class="nav-item">
                    <router-link to="/account/deposit">Deposit money</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/account/withdraw">Withdraw money</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/account/history">Transactions history</router-link>
                </li>

                <li class="nav-item">
                    <router-link to="/account/transfer">Transfer money</router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "SideBar"
    }
</script>

<style scoped>

</style>