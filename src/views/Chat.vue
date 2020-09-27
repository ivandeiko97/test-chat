<template>
  <main>
    <chat-body />
    <users-list />
  </main>
</template>

<script>

import ChatBody from '@/components/ChatBody'
import UsersList from '@/components/UsersList'

export default {
  name: 'chat',
  components: {
    ChatBody,
    UsersList,
  },
}
</script>

<style scoped>
main {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>