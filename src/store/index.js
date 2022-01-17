import {
  createStore
} from "vuex";
import auth from './auth/index';
import feedback from './feedback/index';
import freedishCampaign from './freedishCampaign/index';

const store = createStore({
  modules: {
    auth: auth,
    feedback: feedback,
    freedishCampaign: freedishCampaign,
  }
})

export default store;