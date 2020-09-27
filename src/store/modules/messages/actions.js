import { client } from '@/utils/apollo'

import mutations, {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  EDIT_MESSAGE,
} from '@/utils/graphql/messages/mutations'

import subscriptions, {
  GET_NEW_MESSAGES,
} from '@/utils/graphql/messages/subscriptions'


export default {
  GET_MESSAGES: ({ commit }) => {
    client.subscribe({
        query: subscriptions[GET_NEW_MESSAGES]
      }).subscribe({
        next: ({ data }) => commit('SET_MESSAGES', data.messages)
      })
  },
  ADD_MESSAGE: ({ commit, rootState }, { messageBody, addressedId = null }) => {
    const { currentUser } = rootState.users

    client.mutate({
      mutation: mutations[ADD_MESSAGE],
      variables: {
        userId: currentUser.id,
        messageBody,
        addressedId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        update_todos: {
          __typename: 'messages',
          message_body: messageBody,
          user: {
            id: currentUser.id
          },
          addressedUser: addressedId ? { addressedId } : null
        }
      }
    })
      .then(({ data }) => commit('SET_NEW_MESSAGE', data.insert_messages.returning[0]))
  },
  REMOVE_MESSAGE: ({ commit, rootState }, id) => {
    const { currentUser } = rootState.users

    client.mutate({
      mutation: mutations[REMOVE_MESSAGE],
      variables: {
        id,
        userId: currentUser.id,
      },
    })
      .then(() => commit('REMOVE_MESSAGE', id))
  },
  EDIT_MESSAGE: ({ commit, rootState }, { id, messageBody }) => {
    const { currentUser } = rootState.users

    client.mutate({
      mutation: mutations[EDIT_MESSAGE],
      variables: {
        id,
        messageBody,
        userId: currentUser.id,
      }
    })
      .then(() => commit('UPDATE_MESSAGE', { id, messageBody }))
  }
}