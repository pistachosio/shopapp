import _state from './_state'
import _mutations from './_mutations'
import _actions from './_actions'
import _getters from './_getters'

export default {

  // allow namespaces
  namespaced: true,

  // state
  state: _state,

  // mutations
  mutations: _mutations,

  // actions
  actions: _actions,

  // getters
  getters: _getters,
}