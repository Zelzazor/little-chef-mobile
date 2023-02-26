import { NavigationContainer } from '@react-navigation/native';
import { NavigationTab } from './src/features/navigation';
import { AuthProvider } from './src/features/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './src/features/user/context/useUserContext';

const queryClient = new QueryClient();

const App = () => {
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
