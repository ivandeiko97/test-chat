export default {
  USERS: ({ users, currentUser }) => {
    if (!users) return 

    const now = Date.now(new Date().toISOString())
    return users.map(u => {
      return {
        ...u,
        isOnline: (now - Date.parse(u.last_seen)) < 180000
      }
    })
      .filter(u => u.id !== currentUser.id)
      .sort((a, b) => b.isOnline - a.isOnline)
  }
}