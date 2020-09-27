<template>
  <section class="autorization">
    <h1 class="autorization-title"> Chat.ru </h1>
    <h2 class="autorization-subtitle">
      {{isLoginForm ? 'Войдите' : 'Зарегестрируйтесь'}}, чтобы продолжить
    </h2>
    <form-autorization
      @autorization="isLoginForm ? logIn() : regisration()"
      @change-username="username = $event"
      @change-password="password = $event"
      :text="isLoginForm ? 'Войти' : 'Зарегестрироваться'"
      :username="username"
      :password="password"
    >
      <span
        v-if="errorMessage"
        class="error"
      >
        {{ errorMessage }}
      </span>
    </form-autorization>
    <ul class="autorization-actions">
      <li
        @click="isLoginForm=true"
        :class="['autorization-action', isLoginForm ? 'active' : '']"
      >
        Авторизация
      </li>
      <li
        @click="isLoginForm=false"
        :class="['autorization-action', !isLoginForm ? 'active' : '']"
      >
        Регистрация
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

import FormAutorization from '@/components/FormAutorization'

export default {
  name: 'autorization',
  components: {
    FormAutorization
  },
  data() {
    return {
      isLoginForm: true,
      username: '',
      password: '',
      errorMessage: null
    }
  },
  watch: {
    isLoginForm() {
      this.username = ''
      this.password = ''
      this.errorMessage = null
    }
  },
  methods: {
    ...mapActions('users', ['AUTORIZATION', 'REGISTRATION']),
    logIn() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Логин или пароль не могут быть пустыми'
        return
      }

      this.AUTORIZATION({ username: this.username, password: this.password })
        .then(() => this.$router.push({ name: 'chat' }))
        .catch(err => this.errorMessage = err)
    },
    regisration() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Логин или пароль не могут быть пустыми'
        return
      }

      this.REGISTRATION({ username: this.username, password: this.password })
        .then(() => this.$router.push({ name: 'chat' }))
        .catch(err => this.errorMessage = err)
    },
  }
}
</script>

<style scoped>

.autorization {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 30px;
  width: 320px;
  height: 380px;
  background: #fff;
  border-radius: 20px;
}

.autorization-title {
  font-size: 25px;
  margin-bottom: 5px;
}

.autorization-subtitle {
  font-size: 13px;
  margin-bottom: 30px
}

.autorization-actions {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  margin-top: 10px;
  width: 100%;
}

.autorization-action {
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #000;
  transition: 0.2s;
}

.autorization-action:hover,
.active { 
  color: rgb(53, 167, 110); 
}

.error {
  align-self: center;
  font-size: 12px;
  color: red;
  margin-top: 5px;
}

</style>