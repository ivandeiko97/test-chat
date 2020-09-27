export default {
  SET_MESSAGES: (state, payload) => {
    state.messages = payload
  },
  SET_NEW_MESSAGE: (state, payload) => state.messages = [...state.messages, payload],
  REMOVE_MESSAGE: (state, payload) => state.messages = state.messages.filter(m => m.id !== payload),
  UPDATE_MESSAGE: (state, {id, messageBody}) => {
    state.messages = state.messages.map(m => {
      if (m.id === id) {
        return {
          ...m,
          message_body: messageBody
        }
      }
      return m
    })
  }
}