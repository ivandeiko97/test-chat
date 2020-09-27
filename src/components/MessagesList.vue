<template>
  <ul
    ref="messages"
    class="messages"
    v-chat-scroll="{always: true, smooth: true}"
  >
    <template v-if="MESSAGES && MESSAGES.length">
      <message
        v-for="message in MESSAGES"
        :key="message.id"
        :message="message"
      />
    </template>
    <li v-else class="empty-chat"> чат пустой</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

import Message from './Message'

export default {
  name: "messages-list",
  components: {
    Message,
  },
  computed: {
    ...mapGetters('messages',['MESSAGES'])
  },
}
</script>

<style scoped>
  .messages {
    padding: 15px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80%;
    overflow-y: auto;
  }

  .empty-chat {
    color: #fff;
    margin: auto;
    font-size: 30px;
  }
</style>