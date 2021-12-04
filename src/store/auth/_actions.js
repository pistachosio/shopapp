
import axios from 'axios';

export default {
  async signin({
    commit
  }, payload) {
    commit('updateState', {
      isLoading: true,
    });

    try {      
      const response = await axios.post(`/auth`, {
        phoneNumber: payload.phoneNumber,
        smsCode: payload.smsCode,
      })
      
      if (response.data.isOK) {
        if (payload.smsCode != '') {
          commit('updateState', {
            isLoading: false,
            shop: response.data.shop,
            isAuthenticated: true,
          });
        } else {
          commit('updateState', {
            isLoading: false,
          });
        }
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
  async signout({
    commit
  }) {
    commit('updateState', {
      isLoading: false,
      shop: {},
      isAuthenticated: false
    });
    return;
  },
  async me({
    commit
  }) {
    commit('updateState', {
      isLoading: true,
    });

    try {
      const response = await axios.get(`/me`)
      
      if (response.data.isOK) {
        commit('updateState', {
          isLoading: false,
          shop: response.data.shop,
          isAuthenticated: true,
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
}