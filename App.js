import React from 'react';
import { Provider as MSTProvider } from 'mobx-react/custom';
import { StatusBar, View, UIManager } from 'react-native';

import Api from './app/api/Api';
import RootNavigator from './app/navigation/RootNavigator';
import createStore from './app/stores/createStore';
import { globalStyles } from './app/styles';

const mst = createStore({}, { Api });

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => (
  <View style={globalStyles.flex}>
    <StatusBar ranslucent />
    <MSTProvider {...mst.store} root={mst.store}>
      <RootNavigator />
    </MSTProvider>
  </View>
);

export default App;
