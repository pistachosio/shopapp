import _ from 'lodash';

export default {
  removeFreedishCampaign: (state, freedishCampaignGuestId) => {
    var freedishCampaigns = _.filter(state.freedishCampaigns,  (item) => {
      return item.freedishCampaignGuestId != freedishCampaignGuestId;
    })

    state.freedishCampaigns = freedishCampaigns;
  },
  updateState: (state, payload) => {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = value;
    }
  }
}