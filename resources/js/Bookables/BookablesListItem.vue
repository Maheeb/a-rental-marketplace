<template>

    <div class="card w-100">
        <div class="card-body">
            <router-link   :to="{name:'bookable', params:{id: id}}" class="navbar-brand mr-auto"><h5 class="card-title">{{title}}</h5></router-link>
<!--            <h5 class="card-title">{{title}}</h5>-->
            <p class="card-text">{{description}}</p>
        </div>

    </div>
</template>

<script>

    export default {
        name: "BookablesListItem",
        props:['title', 'description','id'],

    }

</script>

<style scoped>

</style>
