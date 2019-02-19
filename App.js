import React from 'react';
import { Provider } from 'react-redux';
import {
  StatusBar,
  View,
  UIManager,
} from 'react-native';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { compose, lifecycle } from 'recompose';

import RootNavigator from './app/navigation/RootNavigator';
import { store, persistor } from './app/store';
import { globalStyles } from './app/styles';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// persistor.purge();

const App = () => (
  <View style={globalStyles.flex}>
    <StatusBar ranslucent />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  </View>
);

compose(
  lifecycle({
    async componentDidMount() {
      await persistor.persist();
    },
  }),
)(App);

export default App;
