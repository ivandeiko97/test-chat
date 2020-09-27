import { client } from '@/utils/apollo'

import queries, {
  LOGIN,
} from '@/utils/graphql/users/queries'

import mutations, {
  REGISTRATION,
  SET_ONLINE,
} from '@/utils/graphql/users/mutations'


import subscriptions, {
  GET_USERS,
} from '@/utils/graphql/users/subscriptions'

export default {
  GET_USER: ({ commit }, user) => commit('SET_USER', JSON.parse(user)),
  LOGOUT: ({ commit }) => commit('SET_USER', null),
  AUTORIZATION: async ({ dispatch }, { username, password }) => {
    return client.query({
      query: queries[LOGIN],
      variables: {
        username,
        password,
      }
    })
      .then(({ data }) => {
        if (data.users.length) {
          const user = JSON.stringify(data.users[0])

          dispatch('GET_USER', user)
          localStorage.setItem('user', user)
        } else {
          return Promise.reject('Неправильный логин или пароль')
        }
      })
  },
  REGISTRATION: ({ dispatch }, { username, password }) => {
    return client.mutate({
      mutation: mutations[REGISTRATION],
      variables: {
        username,
        password,
      },
      update(store, { data: insert_users }) {
        const user = JSON.stringify(insert_users.insert_users.returning[0])

        dispatch('GET_USER', user)
        localStorage.setItem('user', user)
      },
    }).catch(() => Promise.reject('Такой логин уже занят'))
  },
  SET_ONLINE: (context, logout) => {
    const id = JSON.parse(localStorage.getItem('user')).id

    client.mutate({
      mutation: mutations[SET_ONLINE],
      variables: {
        id,
        now: logout ? new Date(Date.now() - 300000).toISOString() : new Date().toISOString(),
      }
    })
  },
  GET_USERS: ({ commit }) => {
    client.subscribe({
      query: subscriptions[GET_USERS],
    }).subscribe({
      next: ({ data }) => commit('SET_USERS', data.users)
    })
  },
  ADD_ADDRESSED_USER: ({ commit }, user) => commit('SET_ADDRESSED_USER', user)
  
}