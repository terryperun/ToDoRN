import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar, View, UIManager } from 'react-native';
// import { AsyncStorage } from 'react-native';
import RootNavigator from './app/navigation/RootNavigator';
import store from './app/store';
import { globalStyles } from './app/styles';

// AsyncStorage.clear();
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => (
  <View style={globalStyles.flex}>
    <StatusBar ranslucent />
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  </View>
);

export default App;
