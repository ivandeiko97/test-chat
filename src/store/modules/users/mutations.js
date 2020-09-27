export default {
  SET_USER: (state, payload) => state.currentUser = payload,
  SET_USERS: (state, payload) => state.users = payload,
  SET_ADDRESSED_USER: (state, payload) => state.addressedUser = payload,
}