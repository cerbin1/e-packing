import Vue from 'vue';
import Router from 'vue-router';
import BoardUser from './components/BoardUser.vue';
import List from './components/List.vue';
import ExampleHome from './components/ExampleHome.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Google from './components/Google.vue';
import Note from './components/Note.vue';
//import ExampleUserNotes from './components/ExampleUserNotes.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/ExampleHome',
      component: ExampleHome
    },
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
      path: '/exampleUserNotes/:noteid',
      name: 'exampleUserNotes',
      // lazy-loaded
      component: () => import('./components/ExampleUserNotes.vue')
    },
    {
      path: '/google',
      name: 'google',
      component: Google
    },
    {
      path: '/Note/:noteid',
      name: 'note',
      component: Note,
      props: true
  },
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/exampleHome', '/BoardUser', '/list', '/home', '/google', '/note'];
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