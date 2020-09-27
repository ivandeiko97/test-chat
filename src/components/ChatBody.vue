<template>
  <section class="chat-messages">
    <messages-list />
    <add-message />
  </section>
</template>

<script>
import MessagesList from '@/components/MessagesList'
import AddMessage from '@/components/AddMessage'

export default {
  name: 'chat-body',
  components: {
    MessagesList,
    AddMessage,
  },
  mounted() {
    this.$store.dispatch('messages/GET_MESSAGES')
  }
}
</script>

<style scoped>

.chat-messages {
  width: 70%;
  height: 100%;
}

</style>