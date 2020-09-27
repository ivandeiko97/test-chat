import Vue from 'vue'
import App from './App.vue'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

import store from './store'
import apolloProvider from './utils/apollo'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app')
