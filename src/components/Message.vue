<template>
  <li :class="isUserMessage ? 'user-message' : 'message'">
    <div class="message-info"> 
      <span class="message-info-title"> {{ message.user.username }} </span>
      <span class="message-info-date"> {{ messageDate }} </span>
      <span v-if="message.addressedUser" class="message-info-to">
        {{ messageTo }}
      </span>
    </div>
    <div class="message-body" v-if="!edit">
      {{ message.message_body }}
    </div>
    <form v-else class="message-edit">
      <textarea 
        :value="editField"
        @input="$event => editField = $event.target.value"
        @keyup.enter="updateMessage"
      ></textarea>
      <button @click="updateMessage">Сохранить</button>
    </form>
    <ul v-if="isUserMessage" class="message-actions">
      <li @click="edit = !edit"> редактировать </li>
      <li @click="REMOVE_MESSAGE(message.id)"> удалить </li>
    </ul>
    <button
      class="answer-button"
      v-if="!isUserMessage && message.addressedUser"
      @click="$store.dispatch('users/ADD_ADDRESSED_USER', message.user)"
    > 
      ответить 
    </button>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "message",
  props: {
    message: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      edit: false,
      editField: this.message.message_body,
    }
  },
  computed: {
    ...mapState('users', ['currentUser']),
    isUserMessage() {
      return this.currentUser.id === this.message.user.id
    },
    messageDate() {
      const date = new Date(this.message.created_at)

      const year = date.getFullYear()
      const day = `${date.getDate()}`.padStart(2, 0)
      const month = `${date.getDate() + 1}`.padStart(2, 0)
      
      const hours = `${date.getHours()}`.padStart(2, 0)
      const minutes = `${date.getMinutes()}`.padStart(2, 0)

      return `${year}/${month}/${day} ${hours}:${minutes}`
    },
    messageTo() {
      if (this.message.addressedUser.id === this.currentUser.id) {
        return `сообщение от ${this.message.user.username}`
      } else {
        return `сообщение для ${this.message.addressedUser.username}`
      }
    }
  },
  methods: {
    ...mapActions('messages', ['REMOVE_MESSAGE', 'EDIT_MESSAGE']),
    updateMessage() {
      this.EDIT_MESSAGE({id: this.message.id, messageBody: this.editField})
      this.edit = false
    }
  }
}
</script>

<style scoped> 
.user-message {
  color: #fff;
  align-self: flex-end;
  background-color: #87CEFA;
  padding: 20px;
}

.message,
.user-message {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 14px;
  width: 30%;
  border-radius: 5px;
  padding: 20px;
  word-wrap: break-word
}

.message {
  color: #808080;
  background-color: #00FF7F;
}

.message-body {
  margin-top: 5px;
  padding-left: 10px;
}

.message-info {
  font-size: 14px;
  font-weight: 700;
}

.message-info-date {
  font-size: 12px;
  margin-left: 5px;
}

.message-actions {
  display: flex;
  align-self: flex-end;
}

.message-actions > li:not(:last-child) {
  margin-right: 10px;
}

.message-actions > li {
  cursor: pointer;
  transition: 0.2s;
}

.message-actions > li:hover {
  color: #00FF7F;
}

.message-edit > button {
  outline: none;
  border: none;
  width: 70px;
  height: 20px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
  transition: 0.5s
}

.message-edit > button:hover {
  background: #00FF7F;
  color: #fff;
}

.message-edit {
  display: flex;
  align-items: center;
}

.answer-button {
  display: flex;
  outline: none;
  border: none;
  background: none;
  margin-top: 10px;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
}

</style>