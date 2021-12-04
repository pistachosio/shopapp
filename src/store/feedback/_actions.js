import axios from 'axios';

export default {
  async getFeedbacks({
    commit
  }, payload) {
    var stateData = {
      page: payload.page,
      isLoading: true,
    }

    commit('updateState', stateData);

    try {
      const response = await axios.get(`/feedbacks?page=${payload.page}`)

      if (response.data.isOK) {

        if (payload.page == 1) {
          stateData = {
            total: response.data.total,
            pages: response.data.pages,
            perPage: response.data.perPage,
          };
        }

        stateData = {
          ...stateData,
          isLoading: false,
          feedbacks: response.data.feedbacks != null ? response.data.feedbacks : []
        }

        commit('updateState', stateData);
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
  async getMoreFeedbacks({
    commit
  }, payload) {
    var stateData = {
      page: payload.page,
    }

    commit('updateState', stateData);

    try {
      const response = await axios.get(`/feedbacks?page=${payload.page}`)

      if (response.data.isOK) {

        stateData = {
          ...stateData,
          feedbacks: response.data.feedbacks != null ? response.data.feedbacks : []
        }

        commit('updateState', stateData);
      } else {
        commit('updateState', {
          error: response.data.message,
        });
      }

      return response.data
    } catch (err) {
      commit('updateState', {
        error: err.message,
      });
    }
  },
  async getFeedback({
    commit
  }, id) {
    var stateData = {
      isLoading: true,
      feedback: {},
      childFeedback: {},
    }

    commit('updateState', stateData);

    try {
      const response = await axios.get(`/feedbacks/${id}`)

      if (response.data.isOK) {

        stateData = {
          ...stateData,
          isLoading: false,
          feedback: response.data.feedback != null ? response.data.feedback : {},
          childFeedback: response.data.childFeedback != null ? response.data.childFeedback : {}
        }

        commit('updateState', stateData);

        if (response.data.feedback != null) {
          commit('updateFeedback', response.data.feedback)
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
  async storeFeedback({
    commit
  }, payload) {
    var stateData = {
      isLoading: true,
    }

    commit('updateState', stateData);

    try {
      const response = await axios.post(`/feedbacks`, payload)

      if (response.data.isOK) {

        stateData = {
          isLoading: false,
        }

        commit('updateState', stateData);
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