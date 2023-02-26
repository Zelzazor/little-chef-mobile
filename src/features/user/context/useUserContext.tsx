import { createContext, useContext, useEffect, useMemo } from 'react';
import { useAuthContext } from '../../auth';
import { useUser } from '../hooks';
import { User } from '../types';

interface UserContextProps {
  user: User;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider = ({ children }) => {
  const { loggedIn, auth0User, credentials } = useAuthContext();
  const { useGetUser } = useUser();
  const { data: registeredUser, refetch: refetchUser } = useGetUser();

  useEffect(() => {
    if (loggedIn && !!credentials) {
      refetchUser().catch(console.error);
    }
  }, [credentials, loggedIn, refetchUser]);

  const user: User = useMemo(() => {
    return { ...auth0User, ...registeredUser?.data } as User;
  }, [auth0User, registeredUser]);

  const payload: UserContextProps = useMemo(() => {
    return { user };
  }, [user]);

  return (
    <UserContext.Provider value={payload}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
