import VueApollo from "vue-apollo"
import Vue from 'vue'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'

Vue.use(VueApollo)

const link = new WebSocketLink({
  uri: 'wss://light-ostrich-88.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    timeout: 30000,
    // connectionParams: () => {
    //   return { headers: getHeaders() };
    // },
  }
})

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  }),
})

export default new VueApollo({
  defaultClient: client,
})
