import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Datepicker from 'vuejs-datepicker';
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GSignInButton from 'vue-google-signin-button'
import {
  faMountain,
  faUmbrellaBeach,
  faCalendarAlt,
  faCity,
  faAtlas,
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faMountain, faUmbrellaBeach, faUserPlus, faCalendarAlt, faCity, faSignInAlt, faSignOutAlt,faAtlas);

Vue.config.productionTip = false;
Vue.use(Vuetify)
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
