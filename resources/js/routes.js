import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import example_2 from "./components/example_2";
import Bookables from "./Bookables/Bookables";
const routes =[
    {
        path:"/",
        // component: ExampleComponent,
        component: Bookables,
        name:'home'
    },
    {
        path:"/second",
        component: example_2,
        name:'second'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`

});

export default router;
