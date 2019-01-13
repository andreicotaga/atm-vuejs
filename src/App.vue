<template>
    <transition name="fade" mode="out-in">
        <div>
            <Header/>
            <b-container fluid>
                <RouterView />
            </b-container>
        </div>
    </transition>
</template>

<script>
    import Header from "./components/Header.vue";
    export default {
        components: {Header}
    }
</script>
