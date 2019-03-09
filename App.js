import React from 'react';
import { Provider as MSTProvider } from 'mobx-react/custom';
import { Provider } from 'react-redux';
import { StatusBar, View, UIManager } from 'react-native';

import { compose, lifecycle } from 'recompose';

import Api from './app/api/Api';
import RootNavigator from './app/navigation/RootNavigator';
import createStore from './app/stores/createStore';
import { globalStyles } from './app/styles';
import reduxStore from './app/store';

const mst = createStore({}, { Api });

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => (
  <View style={globalStyles.flex}>
    <StatusBar ranslucent />
    <Provider store={reduxStore}>
      <MSTProvider {...mst.store} root={mst.store}>
        <RootNavigator />
      </MSTProvider>
    </Provider>
  </View>
);

export default compose(
  lifecycle({
    async componentDidMount() {
      // await persistor.persist();
    },
  }),
)(App);
