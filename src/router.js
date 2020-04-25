import Vue from 'vue';
import Router from 'vue-router';
//import Home from './components/Home.vue';
import List from './components/List.vue';
import ExampleHome from './components/ExampleHome.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
  /*  {
      path: '/home',
      component: Home
    },*/
    {
      path: '/ExampleHome',
      component: ExampleHome
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./components/Profile.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./components/BoardUser.vue')
    },
    {
      path: '/exampleUserNotes',
      name: 'exampleUserNotes',
      // lazy-loaded
      component: () => import('./components/ExampleUserNotes.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/list'];
  //const publicPages = ['/login', '/register', '/exampleHome'];
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