<template>
    <div>
<!--        <div class="row" v-if="error">Unknown error has occured, please try again later</div>-->
        <success v-if="success">You have a left a review, thank you very much</success>
        <fatal-error v-if="error"></fatal-error>
<!--        <div class="row" v-else>-->
        <div class="row" v-if="!success && !error">
            <div :class="[{'col-md-4': twoColumns}, {'d-none' : oneColumn}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="loading">Loading..</div>
                        <div v-if="hasBooking">
                            <p>
                                Stayed at <router-link :to="{name: 'bookable', params:{ id: booking.bookable.bookable_id}}">
                                {{booking.bookable.title}}
                            </router-link>
                            </p>
                            <p>From {{booking.from}} to {{booking.to}}</p>
                        </div>
                    </div>
                </div>


            </div>
            <!--        <div :class="[{'col-md-8': loading || !alreadyReviewd}, {'col-md-12' : !loading && alreadyReviewd}]"></div>-->

            <div :class="[{'col-md-8': twoColumns}, {'col-md-12' : oneColumn}]">
                <div v-if="loading">Loading...</div>
                <div v-else>

                    <div v-if="alreadyReviewd">
                        <h3>You have already left a review for this booking</h3>

                    </div>
                    <div v-else>
                        <div class="form-group">
                            <label class="text-muted">Select the star rating (1 is worst - 5 is Best)</label>
                            <!--            <star-rating :rating="review.rating" class="fa-3x" v-on:rating:changed="review.rating=$event" v-model="review.rating"></star-rating>-->
                            <star-rating :rating="review.rating" class="fa-3x"  v-model="review.rating"></star-rating>
                        </div>
                        <div class="form-group">
                            <label for="content" class="text-muted">Describe your experience with</label>
                            <textarea name="content" id="" class="form-control" cols="30" rows="10" v-model="review.content"

                                      :class="[{'is-invalid': errorFor('content')}]"
                            ></textarea>
                        </div>
                        <div class="invalid-feedback" v-for="(error,index) in errorFor('content')" :key="index + 'content'">{{error}}</div>
                        <button class="btn btn-lg btn-primary btn-block" @click.prevent="submit" :disabled="sending">Submit</button>

                    </div>

                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import {is404, is422} from "../Shared/utils/response";

    export default {
        name: "Review",
        data(){
            return{
                review: {
                    id: null,
                    rating: 5,
                    content: null
                },
                existingReview :null,
                loading:false,
                booking: null,
                error: false,
                errors: null,
                sending: false,
                success : false
            }
        },


        created(){
            this.review.id = this.$route.params.id;
            this.loading = true;
            axios.get(`/api/reviews/${this.review.id}`)
                // .then(response => (this.existingReview = response.data.data))
                .then(response => (this.existingReview = response.data))
                .catch(err=>{

                    if(is404(err) ){
                        return axios.get(`/api/booking-by-review/${this.review.id}`).then(
                            response =>{
                                // this.booking = response.data.data
                                this.booking = response.data
                            }
                        )
                            .catch(err =>{
                                // is404(err) ? {} :(  this.error = true);

                                this.error = !is404(err);

                                // if(!is404(err) ) {
                                //     this.error = true
                                // }
                            })

                    }

                    this.error = true;
                })
                .then(response =>{
                    this.loading = false;
                } )

        },
        computed:{
            alreadyReviewd(){

                return this.hasReview || !this.booking;
                // return this.existingReview !== null;
            },

            hasReview(){

                return this.existingReview !== null;
            },

            hasBooking(){

                return this.booking !== null;

            },
            oneColumn(){

                return  !this.loading && this.alreadyReviewd
            },
            twoColumns(){

                return this.loading && !this.alreadyReviewd
            }


        },
        methods:{
            submit(){
                this.errors = null;
                this.sending = true;
                this.success = false;
                axios.post(`/api/reviews`, this.review)
                    .then(response => {

                        this.success =201 === response.status
                        }
                    )
                    .catch(err => {

                        if(is422(err)){

                            const errors = err.response.data.errors;

                            if (errors['content'] && 1 === _.size(errors)){

                                this.errors = errors
                                return;
                            }


                        }
                        (this.error = true)
                    })
                    .then(()=>(this.sending = false))
            },
            errorFor(field){
                return null !== this.errors && this.errors[field]
                ? this.errors[field]
                 :null;
            }

        }


    }
</script>

<style scoped>

</style>
