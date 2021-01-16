import router from './routes'
import VueRouter from 'vue-router';
import moment from "moment";
import StarRating from "./Shared/components/StarRating";
import FatalError from "./Shared/components/FatalError";
import Success from "./Shared/components/Success";
require('./bootstrap');
import Index from "./Index";
window.Vue = require('vue');

Vue.use(VueRouter);
Vue.filter("fromNow", value=>moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success);

const app = new Vue({
    el: '#app',
    router,
    components:{
        index: Index
    }

});
