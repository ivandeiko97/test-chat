import gql from 'graphql-tag'

export const GET_OLD_MESSAGES = 'GET_MESSAGES'

export default {
  [GET_OLD_MESSAGES]: gql`
    query getMessages {
      messages(
        where: {addressed_user: { _eq: null }}
      ) {
        id
        message_body
        created_at
        user {
          username,
          id,
        }
      }
    }
  `
}
