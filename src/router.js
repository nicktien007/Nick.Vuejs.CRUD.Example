import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/bookkeeping",
      name: "bookkeeping",
      component: () => import("./components/BookkeepingList")
    },
    {
      path: "/bookkeeping/:id",
      name: "bookkeeping-details",
      component: () => import("./components/Bookkeeping")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBookkeeping")
    }
  ]
});
