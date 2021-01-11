<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">Check Availability</h6>

        <div class="form-row">

            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input v-model="from" type="text" name="from" class="form-control form-control-sm" v-on:keyup.enter="check" placeholder="Start date">

            </div>

            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input v-model="to" type="text" name="to" class="form-control form-control-sm" v-on:keyup.enter="check" placeholder="To date">

            </div>
        </div>

        <button class="btn btn-secondary btn-block" v-on:click="check" :disabled="loading">Check</button>

    </div>
</template>

<script>
    export default {
        name: "Availability",

        data(){
            return{

                from: null,
                to: null,
                loading: false,
                status: null

            }
        },

        methods: {
            check() {
                alert("clicked");

                this.loading = true;
                this.errors = null;
                axios.get(`api/bookables/${this.$route.params.id}/availability?from= ${this.form} &to=${this.to}`).then(

                    response =>{
                        this.status = response.status
                    }).catch(error=>{
                        if(422 === error.response.status){
                            this.errors = error.response.data.errors
                        }
                    this.status = error.response.status;
                }).then(()=>(this.loading = false));


            }
        }

    }

</script>

<style scoped>
    label{
        font-size: 0.7em;
        text-transform:uppercase;
        color: grey;
        font-weight: bolder;
    }

</style>
