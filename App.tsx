import { NavigationContainer } from '@react-navigation/native';
import { NavigationStack } from './src/features/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
