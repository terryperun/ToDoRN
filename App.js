import React from 'react';
import { Provider } from 'mobx-react/custom';
import { StatusBar, View, UIManager } from 'react-native';

import { compose, lifecycle } from 'recompose';

import RootNavigator from './app/navigation/RootNavigator';
import createStore from './app/stores/createStore';
import { globalStyles } from './app/styles';

const store = createStore();

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => (
  <View style={globalStyles.flex}>
    <StatusBar ranslucent />
    <Provider {...store}>
      <RootNavigator />
    </Provider>
  </View>
);

compose()(App);
lifecycle({
  async componentDidMount() {
    // await persistor.persist();
  },
});

export default App;
