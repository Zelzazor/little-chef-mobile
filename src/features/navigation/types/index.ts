import { type GuideStackParamList } from '../../guide/types';

export type TabParamList = {
  Profile: undefined;
  SearchIndex: { screen: string };
  Login: undefined;
  Publish: undefined;
  Review: undefined;
  GuideStack: { screen: keyof GuideStackParamList };
};
