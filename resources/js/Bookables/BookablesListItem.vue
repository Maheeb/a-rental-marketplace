<template>

    <div class="card w-100">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <h5 class="card-text">{{description}}</h5>
        </div>

    </div>
</template>

<script>

    export default {
        name: "BookablesListItem",
        props:['title', 'description'],

    }

</script>

<style scoped>

</style>
