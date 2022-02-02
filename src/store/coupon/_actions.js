import axios from 'axios';

export default {

  async getCoupons({
    commit
  }) {
    commit('updateState', {
      isLoading: true,
    });

    try {
      const response = await axios.get(`/coupons`)

      if (response.data.isOK) {

        commit('updateState', {
          isLoading: false,
          coupons: response.data.coupons != null ? response.data.coupons : []
        });
      } else {
        commit('updateState', {
          isLoading: false,
          error: response.data.message,
        });
      }

      return response.data
    } catch (err) {
      commit('updateState', {
        isLoading: false,
        error: err.message,
      });
    }
  },

  async confirmCoupon({
    commit
  }, id) {
    commit('updateState', {
      isLoading: true,
    });

    try {
      const response = await axios.put(`/coupons/${id}/confirm`)

      if (response.data.isOK) {
        
        commit('updateState', {
          isLoading: false,
          error: '',
        });

        commit('confirmCoupon', {
          id: id
        })
      } else {
        commit('updateState', {
          isLoading: false,
          error: response.data.message,
        });
      }

      return response.data
    } catch (err) {
      commit('updateState', {
        isLoading: false,
        error: err.message,
      });
    }
  },

  updateState({
    commit
  }, payload) {
    commit('updateState', payload);
  },
}