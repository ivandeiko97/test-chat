import gql from 'graphql-tag'

export const GET_USERS = 'GET_USERS'
export const LOGIN = 'LOGIN'

export default {
  [GET_USERS]: gql`
    query getUsers {
      users {
        id,
        username,
        last_seen,
      }
    }
  `,
  [LOGIN]: gql`
    query logIn($username: String!, $password: String!) {
      users(where: {username: { _eq: $username }, password: { _eq: $password } }) { 
        id
        username
        last_seen     
      }
    }
  `
}
