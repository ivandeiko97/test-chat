<template>
  <aside class="users">
    <ul>
     <user 
       :currentUser="true"
       :user="currentUser"
       v-if="currentUser"
     />
     <user
       v-for="user in USERS"
       :key="user.id"
       :user="user"
     />
    </ul>
  </aside>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import user from './User'

export default {
  name: 'users-list',
  components: {
    user,
  },
  data() {
    return {
      setOnline: null
    }
  },
  computed: {
    ...mapGetters('users', ['USERS']),
    ...mapState('users', ['currentUser'])
  },
  methods: {
    ...mapActions('users', ['SET_ONLINE', 'GET_USERS']),
    createInterval() {
      this.setOnline = setInterval(this.SET_ONLINE, 30000)
    }
  },
  mounted() {
    this.SET_ONLINE()
    this.createInterval()
    this.GET_USERS()
  },
  beforeDestroy() {
    clearInterval(this.setOnline)
  }
}
</script>

<style scoped>
  .users {
    display: flex;
    justify-content: center;
    width: 30%;
    height: 100%;
    padding: 20px;
  }
</style>