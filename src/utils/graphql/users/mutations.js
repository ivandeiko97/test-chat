import gql from 'graphql-tag'

export const REGISTRATION = 'REGISTRATION'
export const SET_ONLINE = 'SET_ONLINE'

export default {
  [REGISTRATION]: gql`
    mutation registration($username: String!, $password: String!) {
      insert_users(objects: [{username: $username, password: $password}]) {
        affected_rows
        returning {
          username
          id
          last_seen
        }
      }
    }
  `,
  [SET_ONLINE]: gql`
    mutation setOnline($id: Int!, $now: timestamptz!) {
      update_users(where: {id: { _eq: $id }}, _set: {last_seen: $now}) {
        affected_rows
      }
    }
  `
}
