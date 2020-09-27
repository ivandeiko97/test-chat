<template>
  <li :class="['user', currentUser ? 'current-user' : '']">
    <ul class="user-properties">
      <li v-if="currentUser"> Вы: </li>
      <li :class="['status', user.isOnline || currentUser ? 'online' : 'ofline']" />
      <li class="user-name">{{ user.username }}</li>
      <li 
        v-if="!currentUser"
        @click="ADD_ADDRESSED_USER(user)"
        class="user-action"
      > 
        отправить сообщение
      </li>
      <li 
        v-if="currentUser"
        @click="logOut"
        class="user-action"
      > 
        выйти 
      </li>
    </ul>
  </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user',
  props: {
    user: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    ...mapActions('users', ['LOGOUT', 'SET_ONLINE', 'ADD_ADDRESSED_USER']),
    logOut() {
      this.SET_ONLINE(true)
      localStorage.removeItem('user')
      this.LOGOUT()
      this.$store.commit('messages/SET_MESSAGES', null)
      this.$router.push({ name: 'autorization' })
    }
  }
}
</script>


<style scoped>
  .current-user {
    margin-bottom: 30px;
  }

  .user {
    width: 100%;
  }

  .user-properties {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .user-properties li:not(:last-child) {
    margin-right: 10px;
  }

  .user-properties li {
    font-size: 19px;
    color: #FFF500;
  }
  
  .status {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }
  
  .ofline {
    background-color: #fc5951;
  }
  
  .online {
    background-color: #67f551;
  }

  .user-action {
    cursor: pointer
  }

  .user-action:hover {
    color: #fff;
    transition: 0.2s;
  }

  
</style>