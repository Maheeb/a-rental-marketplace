import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import Bookable from "./Bookable/Bookable";
import Bookables from "./Bookables/Bookables";
import Review from "./review/Review";

const routes =[
    {
        path:"/",
        component: Bookables,
        name:'home'
    },
    {
        path:"/bookable/:id",
        component: Bookable,
        name:'bookable'
    },

    {
        path:"/review/:id",
        component: Review,
        name:'review'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`

});

export default router;
