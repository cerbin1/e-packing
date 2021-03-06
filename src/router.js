import Vue from 'vue';
import Router from 'vue-router';
import BoardUser from './components/BoardUser.vue';
import List from './components/List.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Google from './components/Google.vue';
import Note from './components/Note.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/BoardUser',
      component: BoardUser
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
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./components/BoardUser.vue')
    },
    {
      path: '/google',
      name: 'google',
      component: Google
    },
    {
      path: '/Note/:exampleProp',
      name: 'note',
      component: Note,
      props: true
  },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/google'];
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