import { StackNavigator } from 'react-navigation';
import screens from './screens';
import HomeScreen from '../screens/Home/HomeScreenContainer';

const routes = {
  [screens.Home]: HomeScreen,
};

const AppNavigator = StackNavigator(routes, {
  headerLayoutPreset: 'center',
});

export default AppNavigator;
