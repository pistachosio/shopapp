import axios from 'axios';

export default {

  async getActivatedFreedishCampaigns({
    commit
  }) {

    commit('updateState', {
      isLoading: true,
    });

    try {
      const response = await axios.get(`/freedish-campaigns`)

      if (response.data.isOK) {

        commit('updateState', {
          isLoading: false,
          freedishCampaigns: response.data.freedishCampaigns != null ? response.data.freedishCampaigns : []
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

  async confirmFreedishCampaign({
    commit
  }, payload) {

    commit('updateState', {
      isLoading: true,
    });

    try {
      const response = await axios.put(`/freedish-campaigns/${payload.freedishCampaignId}`, payload)

      if (response.data.isOK) {

        commit('updateState', {
          isLoading: false,
        });

        commit('removeFreedishCampaign', payload.freedishCampaignGuestId);
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