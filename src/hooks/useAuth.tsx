import { useEffect, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { AUTH0_AUDIENCE } from '@env';

export const useAuth = () => {
  const { authorize, clearSession, user, getCredentials } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {
    if (loggedIn) {
      getCredentials('openid profile email', 0)
        .then((creds) => {
          setCredentials(creds);
        })
        .catch(console.error);
    }
  }, [loggedIn, getCredentials]);

  const onLogin = () => {
    setIsLoading(true);
    authorize({
      scope: 'openid profile email',
      audience: AUTH0_AUDIENCE,
    })
      .then(() => setIsLoading(false))
      .catch(console.error);
  };

  const onLogout = () => {
    try {
      setIsLoading(true);
      clearSession()
        .then(() => setIsLoading(false))
        .catch(console.error);
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return { isLoading, loggedIn, onLogin, onLogout, user, credentials };
};
