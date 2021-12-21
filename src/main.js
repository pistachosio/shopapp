import {
  createApp
} from 'vue';
import axios from 'axios';
import VueCookies from 'vue3-cookies';
import App from './modules/App.vue';
import router from './router';
import store from './store';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import {
  isMobile
} from './helpers/agent';

import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faTimes,
  faCircleNotch,
  faSignOutAlt,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

library.add(faTimes, faStar, faCircleNotch, faSignOutAlt, faPaperPlane);

import 'vue-loading-overlay/dist/vue-loading.css';
import './assets/tailwind.css';

if (!isMobile()) {
  require('@/assets/modules/desktop/css/style.css');
} else {
  require('@/assets/modules/mobile/css/style.css');
}

import globalProperties from './plugins/globalProperties';

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ?
  'https://api-dev.pistachos.io/shop' :
  process.env.VUE_APP_API_URL;

var app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueCookies);
app.component('loading', require('vue-loading-overlay'));
app.use(globalProperties);

app.mount('#app');