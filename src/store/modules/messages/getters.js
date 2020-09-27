export default {
  MESSAGES: ({ messages }) => {
    if (!messages) return

    const id = JSON.parse(localStorage.getItem('user')).id

    return messages.filter(m => {
      if (m.addressedUser) {
        if (m.addressedUser.id === id || m.user.id === id) {
          return true
        }
      } else {
        return true
      }
    })
  }
}