<template>
  <form class="form-autorization">
    <input
      class="form-autorization-input"
      type="text"
      placeholder="логин"
      :value="username"
      @input="$emit('change-username', $event.target.value)"
    />
    <input
      class="form-autorization-input"
      type="password"
      placeholder="пароль"
      :value="password"
      @input="$emit('change-password', $event.target.value)"
    />
    <slot></slot>
    <button 
      @click.prevent="$emit('autorization')"
      class="form-autorization-button"
    >
      {{ text }}
    </button>
  </form>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
  }
</script>

<style scoped>
  .form-autorization {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .form-autorization-input {
    height: 40px;
    padding: 10px;
    border: 2px solid rgb(195, 195, 195);
    border-radius: 6px;
    transition: 0.8s;
    outline: none;
  }

  .form-autorization-input:not(:first-child) {
    margin-top: 20px
  }

  .form-autorization-input:focus {
    transition: 0.5s;
    border-color: #ffd21f;
  }

  .form-autorization-button {
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
    width: 140px;
    height: 40px;
    margin-top: 10px;
    outline: none;
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background: rgb(64,199,129);
    box-shadow: 0 -3px rgb(53,167,110) inset;
    transition: 0.2s;
  }

  .form-autorization-button:hover { 
    background: rgb(53, 167, 110);
  }
</style>
