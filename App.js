import React from 'react';
import { Provider } from 'react-redux';

// import { AsyncStorage } from 'react-native';
import RootNavigator from './app/navigation/RootNavigator';
import store from './app/store';

// AsyncStorage.clear();

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
