import gql from 'graphql-tag'

export const GET_USERS = 'GET_USERS'

export default {
  [GET_USERS]: gql`
    subscription getUsers {
      users {
        username,
        id,
        last_seen,
      }
    }
  `
}