import gql from 'graphql-tag'

export const GET_NEW_MESSAGES = 'GET_NEW_MESSAGES'

export default {
  [GET_NEW_MESSAGES]: gql`
    subscription getNewMessages {
      messages(order_by: { created_at: asc }) {
        id
        message_body
        created_at
        user {
          username
          id
        }
        addressedUser {
          username
          id
        }
      }
    }
  `
}