import {
  GuideList,
  type Link,
} from '../../features/guide/components/GuideList';

export const GuideScreen = () => {
  const links: Link[] = [
    {
      title: 'Getting started',
      screen: 'GettingStarted',
    },
    {
      title: 'Search',
      screen: 'Search',
    },
    {
      title: 'Submissions',
      screen: 'Submission',
    },
    {
      title: 'Profile',
      screen: 'Profile',
    },
    {
      title: 'Votes',
      screen: 'Vote',
    },
  ];

  return <GuideList links={links} />;
};
