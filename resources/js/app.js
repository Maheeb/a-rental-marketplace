import router from './routes'
import VueRouter from 'vue-router';
import moment from "moment";
import StarRating from "./Shared/components/StarRating";
import FatalError from "./Shared/components/FatalError";
import Success from "./Shared/components/Success";
import storeDefinition from "./store"

import Vuex from 'vuex'

require('./bootstrap');
import Index from "./Index";
window.Vue = require('vue');
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.filter("fromNow", value=>moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: '#app',
    router,
    store,
    components:{
        index: Index
    }

});
