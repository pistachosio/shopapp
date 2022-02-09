import _ from 'lodash';

export default {
  confirmCoupon: (state, payload) => {
    var coupons = state.coupons;

    _.each(coupons, (value, key) => {
      if (value.id == payload.id) {
        coupons[key].confirmedAt = Math.round(Date.now() / 1000);
      }
    })

    state.coupons = coupons;
  },
  updateState: (state, payload) => {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = value;
    }
  }
}