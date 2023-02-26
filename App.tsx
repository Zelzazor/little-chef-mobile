import { NavigationContainer } from '@react-navigation/native';
import { NavigationTab } from './src/features/navigation';
import { AuthProvider } from './src/features/auth';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <NavigationTab />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
