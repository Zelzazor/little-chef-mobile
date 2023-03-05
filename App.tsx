import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationTab } from './src/features/navigation';
import { AuthProvider } from './src/features/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './src/features/user/context/useUserContext';
import SplashScreen from 'react-native-splash-screen';

const queryClient = new QueryClient();

const useHideSplashScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
};

const App = () => {
  useHideSplashScreen();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <NavigationContainer>
            <NavigationTab />
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
