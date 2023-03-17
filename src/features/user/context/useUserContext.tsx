import { createContext, useContext, useEffect, useMemo } from 'react';
import { type FCC } from '../../../config';
import { useAuthContext } from '../../auth/context/useAuthContext';
import { useUser } from '../hooks/useUser';
import { User } from '../types/user';

interface UserContextProps {
  user: User;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: FCC = ({ children }) => {
  const { loggedIn, auth0User, credentials } = useAuthContext();
  const { useGetUser } = useUser();
  const { data: registeredUser, refetch: refetchUser } = useGetUser();

  useEffect(() => {
    if (loggedIn && !(credentials == null)) {
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

export const useUserContext: () => UserContextProps = () =>
  useContext(UserContext);
