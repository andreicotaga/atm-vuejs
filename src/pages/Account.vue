<template>
    <div>
        <Header/>
        <div class="row flex-xl-nowrap2">
            <div class="bd-sidebar col-md-3 col-xl-2 col-12">
                <SideBar/>
            </div>
            <div class="pb-md-3 pl-md-5 bd-content col-md-9 col-xl-8 col-12">
                <Content/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideBar from "../components/SideBar.vue";
    import Content from "../components/Content.vue";
    import Header from "../components/Header.vue";

    export default {
        name: "Account",
        data () {
            return {

            }
        },
        components: { Content, SideBar, Header }
    }
</script>

<style scoped>

</style>