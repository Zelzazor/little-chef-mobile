import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './src/features/auth/context/useAuthContext';
import { NavigationTab } from './src/features/navigation/NavigationTab';
import { UserProvider } from './src/features/user/context/useUserContext';

const queryClient = new QueryClient();

const useHideSplashScreen = () => {
  useEffect(() => {
    SplashScreen.hide();

    return () => {
      SplashScreen.show();
    };
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
