import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Datepicker from 'vuejs-datepicker';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GSignInButton from 'vue-google-signin-button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import {
  faPlus,
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faPlus, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faGoogle);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.use(GSignInButton);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  Datepicker,
  store,
  render: h => h(App)
}).$mount('#app');


//Vue.config.productionTip = false
