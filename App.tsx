import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/features/navigation';
import { AuthProvider } from './src/features/auth';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
