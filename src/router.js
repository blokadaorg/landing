import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";

import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.query.lang) {
    var lang = to.query.lang.trim()
    lang = lang.replace(/[^a-zA-Z-]/g, "")
    lang = lang.substr(0, 5)
    console.log(`Changed locale from url param: ${lang}`)
    Vue.i18n.locale = lang
    sessionStorage.setItem("blokada_locale", lang)
  }
  next();
})

export default router;