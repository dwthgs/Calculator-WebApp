import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import History from '../views/History.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      guest: false
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
      guest: false
    },
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      requiresAuth: true,
      guest: false
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      requiresAuth: false,
      guest: true
    },
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      requiresAuth: false,
      guest: true
    },
    component: Register
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token")) {
      return next()
    }
    else next('/login')
  }

  if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("auth_token")) {
      return next('/')
    }
    else next()
  }
  next()
})

export default router
