import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from '@env';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Auth0User,
  useAuth0,
  Credentials,
  Auth0Provider,
} from 'react-native-auth0';

interface AuthContextProps {
  isLoading: boolean;
  loggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  user: Auth0User<null>;
  credentials: Credentials;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const AuthContextWrapper = ({ children }) => {
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

  const onLogin = useCallback(() => {
    setIsLoading(true);
    authorize({ scope: 'openid profile email', audience: AUTH0_AUDIENCE })
      .then(() => setIsLoading(false))
      .catch(console.error);
  }, [authorize]);

  const onLogout = useCallback(() => {
    try {
      setIsLoading(true);
      clearSession()
        .then(() => setIsLoading(false))
        .catch(console.error);
    } catch (e) {
      console.log('Log out cancelled');
    }
  }, [clearSession]);

  const payload: AuthContextProps = useMemo(() => {
    return { isLoading, loggedIn, onLogin, onLogout, user, credentials };
  }, [isLoading, loggedIn, onLogin, onLogout, user, credentials]);

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </Auth0Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
