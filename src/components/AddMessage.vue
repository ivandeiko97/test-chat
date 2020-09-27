<template>
  <form class="add-message">
    <label 
      v-if="addressedUser"
      class="addresed"
    >
      Вы пишите: 
      <span class="addresed-name">{{ addressedUser.username }}</span>
      <span 
        @click="$store.dispatch('users/ADD_ADDRESSED_USER', null)"
        class="addresed-delete"
      >
        &#10060;
      </span>
    </label>
    <textarea v-model="text" @keyup.enter="sendMessage" />
    <button @click="sendMessage"> отправить </button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'add-message',
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState('users', ['addressedUser'])
  },
  methods: {
    ...mapActions('messages', ['ADD_MESSAGE']),
    sendMessage() {
      const addressedId = this.addressedUser ? this.addressedUser.id : null
      this.ADD_MESSAGE({userId: 1, messageBody: this.text, addressedId})
      this.text = ''
    }
  }
}
</script>

<style scoped> 
.add-message {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 20px;
}

.add-message > textarea {
  width: 85%;
  height: 90%;
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 20px;
  transition: 0.6s;
  border: 3px solid #fff;
}

.add-message > textarea:focus {
  border: 3px solid #87CEFA;
}


.add-message > button {
  width: 150px;
  height: 80px;
  outline: none;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  font-size: 18px;
  color: #028E9B;
  cursor: pointer;
  background-color: #BAF300;
  transition: 0.5s;
  margin-left: 20px;
}

.add-message > button:hover {
  background-color: #70E500;
}

.addresed {
  position: absolute;
  top: -5px;
  left: 25px;
  font-size: 15px;
  color: #fff;
}

.addresed-name {
  font-size: 25px;
  font-weight: bold;
}

.addresed-delete {
  cursor: pointer;
  font-size: 10px;
  margin-left: 10px;
}

</style>