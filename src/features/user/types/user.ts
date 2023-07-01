import { type Auth0User } from 'react-native-auth0';

export type RegisteredUser = {
  id: string;
  subject: string;
  name: string | null;
  nickName: string | null;
  email: string;
  birthDate: Date | null;
  experience: Experience;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

type Experience = {
  level: number;
  expInCurrentLevel: number;
  expToNextLevel: number;
};

export type User = Omit<Auth0User<null>, 'userId'> & RegisteredUser;
