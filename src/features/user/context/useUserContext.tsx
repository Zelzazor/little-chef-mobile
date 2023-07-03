import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { type FCC } from '../../../config';
import { useAuthContext } from '../../auth/context/useAuthContext';
import { useUser } from '../hooks/useUser';
import { type RegisteredUser, type User } from '../types/user';
import {
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
} from 'react-query';
import { type AxiosResponse } from 'axios';

interface UserContextProps {
  user: User;
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<AxiosResponse<RegisteredUser, any>, unknown>
  >;
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
    return { user, refetchUser };
  }, [user, refetchUser]);

  return (
    <UserContext.Provider value={payload}>{children}</UserContext.Provider>
  );
};

export const useUserContext: () => UserContextProps = () =>
  useContext(UserContext);
