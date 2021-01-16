<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">

            Check Availability

            <span v-if="hasAvailability" class="text-success">(Available)</span>
            <span v-if="noAvailability" class="text-danger">(Not Available)</span>

        </h6>




        <div class="form-row">

            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input v-model="from" type="text" name="from" class="form-control form-control-sm"
                       v-on:keyup.enter="check" placeholder="Start date" :class="[{'is-invalid': this.errorFor('from')}]"/>

                <div class="invalid-feedback" v-for="(error,index) in this.errorFor('from')" :key="index + 'from'">{{error}}</div>
            </div>

            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input v-model="to" type="text" name="to" class="form-control form-control-sm" v-on:keyup.enter="check"
                       placeholder="To date" :class="[{'is-invalid': this.errorFor('to')}]"/>
                <div class="invalid-feedback" v-for="(error,index) in this.errorFor('to')" :key="index + 'to'">{{error}}</div>

            </div>
        </div>

        <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">Check</button>

    </div>
</template>

<script>
    import {is422} from "../Shared/utils/response";

    export default {
        name: "Availability",
        props:{
          bookableId : String | Number,
            default: ''
        },

        data() {
            return {
                from: null,
                to: null,
                loading: false,
                status: null,
                errors: null

            }
        },

        methods: {
            check() {
                // alert("clicked");

                this.loading = true;
                this.errors = null;
                // axios.get(`/api/bookables/${this.$route.params.id}/availability?from= ${this.from}&to=${this.to}`).then(
                axios.get(`/api/bookables/${this.bookableId}/availability?from= ${this.from}&to=${this.to}`).then(
                    response => {
                        this.status = response.status;

                        // console.log(this.status)
                    })
                    .catch(error => {
                    if (is422(error)) {
                        this.errors = error.response.data.errors;
                    }
                    this.status = error.response.status;
                })
                    .then(() => (this.loading = false));

            },
            errorFor(field){
                return this.hasErrors && this.errors[field] ? this.errors[field] : null;
            }
        },

        computed: {
            hasErrors(){

                return 422 === this.status && this.errors != null;
            },
            hasAvailability(){

                return 200 === this.status;

            },
            noAvailability(){

                return 404 === this.status;
            }

        }

    }

</script>

<style scoped>
    label {
        font-size: 0.7em;
        text-transform: uppercase;
        color: grey;
        font-weight: bolder;
    }
    .is-invalid{
        border-color: red;
        background-image: none;

    }

</style>
