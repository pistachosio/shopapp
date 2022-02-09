import {
  createStore
} from "vuex";
import auth from './auth/index';
import feedback from './feedback/index';
import coupon from './coupon/index';

const store = createStore({
  modules: {
    auth: auth,
    feedback: feedback,
    coupon: coupon,
  }
})

export default store;