import gql from 'graphql-tag'

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const EDIT_MESSAGE = 'EDIT_MESSAGE'

export default {
  [ADD_MESSAGE]: gql`
    mutation addMessage($userId: Int!, $messageBody: String!, $addressedId: Int) {
      insert_messages(objects: [{ message_body: $messageBody, user_id: $userId, addressed_user: $addressedId }]) {
        returning {
          id,
          message_body,
          created_at,
          user {
            username,
            id
          }
          addressedUser {
            username,
            id
          }
        }
      }
    }
  `,
  [REMOVE_MESSAGE]: gql`
    mutation removeMessage($id: Int!, $userId: Int!) {
      delete_messages(where: {id: { _eq: $id }, user_id: { _eq: $userId } }) {
        affected_rows
      }
    }
  `,
  [EDIT_MESSAGE]: gql`
    mutation editMessage($id: Int!, $userId: Int!, $messageBody: String!) {
      update_messages(where: {id: { _eq: $id }}, _set: {message_body: $messageBody}) {
        returning {
          message_body
        }
      }
    }
  `,
}