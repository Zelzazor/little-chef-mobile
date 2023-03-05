import { config } from '../../../config/app.config';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useAuth0,
  type Credentials,
  Auth0Provider,
  type Auth0User,
} from 'react-native-auth0';
import { type FCC } from '../../../config';

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

const AuthContextWrapper: FCC = ({ children }) => {
  const {
    authorize,
    clearSession,
    user: auth0User,
    getCredentials,
  } = useAuth0();

  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const loggedIn = useMemo(() => Boolean(auth0User), [auth0User]);

  useEffect(() => {
    if (loggedIn) {
      getCredentials('openid profile email', 0)
        .then((creds) => {
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
      audience: config.auth0.audience,
    })
      .then(() => {
        setIsLoading(false);
      })
      .catch(console.error);
  }, [authorize]);

  const onLogout = useCallback(() => {
    try {
      setIsLoading(true);
      clearSession()
        .then(() => {
          setIsLoading(false);
        })
        .catch(console.error);
    } catch (e) {
      console.log('Log out cancelled');
    }
  }, [clearSession]);

  const payload: AuthContextProps = useMemo(() => {
    return { isLoading, loggedIn, onLogin, onLogout, auth0User, credentials };
  }, [isLoading, loggedIn, onLogin, onLogout, auth0User, credentials]);

  return (
    <AuthContext.Provider value={payload}>{children}</AuthContext.Provider>
  );
};

export const AuthProvider: FCC = ({ children }) => {
  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientId}
    >
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </Auth0Provider>
  );
};

export const useAuthContext: () => AuthContextProps = () =>
  useContext(AuthContext);
