<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    const user = localStorage.getItem('user')

    if (user) {
      this.$store.dispatch('users/GET_USER', user)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;

}

#app {
  display: flex;
  width: 100%;
  height: 100vh;
  background-image: url('https://s1.1zoom.ru/big0/34/Technics_Fantasy_487769.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
