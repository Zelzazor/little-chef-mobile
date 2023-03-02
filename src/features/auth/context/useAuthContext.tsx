import {AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE} from '@env';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useAuth0,
  Credentials,
  Auth0Provider,
  Auth0User,
} from 'react-native-auth0';

interface AuthContextProps {
  isLoading: boolean;
  loggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  auth0User: Auth0User<null>;
  credentials: Credentials | null;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const AuthContextWrapper = ({children}: {children: ReactNode}) => {
  const {authorize, clearSession, user: auth0User, getCredentials} = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const loggedIn = useMemo(() => !!auth0User, [auth0User]);

  useEffect(() => {
    if (loggedIn) {
      getCredentials('openid profile email', 0)
        .then(creds => {
          setCredentials(creds);
        })
        .catch(console.error);
    } else {
      setCredentials(null);
    }
  }, [loggedIn, getCredentials]);

  const onLogin = useCallback(() => {
    setIsLoading(true);
    authorize({
      scope: 'openid profile email',
      audience: AUTH0_AUDIENCE,
    })
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
    return {isLoading, loggedIn, onLogin, onLogout, auth0User, credentials};
  }, [isLoading, loggedIn, onLogin, onLogout, auth0User, credentials]);

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export const AuthProvider = ({children}: {children: ReactNode}) => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </Auth0Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
