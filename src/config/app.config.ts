import {AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE, API_URL} from '@env';


export const config = {
  colors: {
    primary: '#CA3433',
    secondary: '#F5F5F5',
    inactive: 'gray',
    background: '#F5FCFF',
  },
  auth0: {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    audience: AUTH0_AUDIENCE,
  },
  api: {
    url: API_URL,
  }
}