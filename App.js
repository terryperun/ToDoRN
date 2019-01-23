import React from 'react';
import { Provider } from 'react-redux';

import RootNavigator from './app/navigation/RootNavigator';
import store from './app/store';

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
