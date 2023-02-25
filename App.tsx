import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/features/navigation';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@env';

const App = () => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </Auth0Provider>
  );
};

export default App;
