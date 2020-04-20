import Vue from 'vue';
import Router from 'vue-router';
//import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Startpage from './views/Startpage.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    /*{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },*/
    {
      path: '/login',
      name: Login,
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/startpage',
      component: Startpage
    }

  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/startpage','/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
