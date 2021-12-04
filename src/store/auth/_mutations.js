export default {
  updateState: (state, payload) => {
    for (const [key, value] of Object.entries(payload)) {
      state[key] = value;
    }
  }
}