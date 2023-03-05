import { type Auth0User } from 'react-native-auth0';

export interface RegisteredUser {
  id: string;
  subject: string;
  name: string | null;
  nickName: string | null;
  email: string;
  birthDate: Date | null;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type User = Omit<Auth0User<null>, 'userId'> & RegisteredUser;
