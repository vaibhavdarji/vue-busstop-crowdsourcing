import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AsyncComputed from 'vue-async-computed';
import BusStopDetails from '@/components/BusStopDetails.vue';
Vue.use(Router);
Vue.use(AsyncComputed);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      // path: "/stop/:id",
      path: "/stop",
      name: "stop",
      component: BusStopDetails
    }
  ]
});
