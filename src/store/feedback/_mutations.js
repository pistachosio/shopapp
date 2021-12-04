import _ from 'lodash';

export default {
  updateFeedback(state,  payload) {
    var feedbacks = state.feedbacks;
    
    _.each(feedbacks, (value, key) => {
      if (value.id == payload.id) {
        feedbacks[key] = payload
      }
    })
    
    state.feedbacks = feedbacks;
  },
  updateState: (state, payload) => {
    for (const [key, value] of Object.entries(payload)) {
      switch (key) {
        case 'feedbacks':
          if(payload.page == 1) {
            state[key] = value;
          } else {
            state[key] = [...state[key], ...value]
          }
          break;
        default:
          state[key] = value;
          break;
      }
    }
  }
}