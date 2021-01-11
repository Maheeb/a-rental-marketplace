<template>
    <div>
        <nav class="navbar bg-white border-bottom navbar-light">
            <router-link   :to="{name:'home'}" class="navbar-brand mr-auto">Home</router-link>
            <router-link :to="{name:'bookable'}" class="btn nav-button">Second Page</router-link>
        </nav>

        <div class="container mt-4 mb-4 pr-4 pl-4">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>

</style>
