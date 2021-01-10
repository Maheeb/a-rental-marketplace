<template>

    <div>
<!--        Rows: {{rows}}-->
        <div v-if="loading">

            Data is loading
        </div>

        <div v-else>
            <div class="row mb-4" v-for="row in rows" :key="'row'+ row">
                <div class="col d-flex align-items-stretch" v-for="(item,column) in bootablesInRow(row)"
                     :key="'row'+row+column">
                    <BookablesListItem :title=item.title :description="item.description" >
                    </BookablesListItem>
                </div>
                <div class="col" v-for="p in placeholdersInRow(row)" :key="'placeholder' + row +p"></div>

            </div>
        </div>
    </div>
</template>

<script>
    import BookablesListItem from "./BookablesListItem";

    export default {
        name: "Bookables",
        components: {
            "BookablesListItem": BookablesListItem
        },
        data() {
            return {

                loading: false,
                items: null,
                columns: 3,

            }
        },
        computed: {

            rows: function () {
                return this.items === null ? 0 : Math.ceil(this.items.length / this.columns);
            }

        },
        methods:{
          bootablesInRow(row){
              return this.items.slice((row-1)* this.columns, row * this.columns)
          },
            placeholdersInRow(row){
                return this.columns - this.bootablesInRow(row).length;
            },
        },

        created() {

            this.loading = true;

            const request = axios.get("/api/bookables").then(response=>{
                this.items = response.data;
                this.loading =false;
            });

            // console.log(request);


        }

    }
</script>

<style scoped>

</style>
