<template>
    <div>
        <Header/>
        <b-container fluid>
            <RouterView />
        </b-container>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    export default {
        components: {Header}
    }
</script>
