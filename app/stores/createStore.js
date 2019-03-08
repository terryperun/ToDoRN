// import makeInspectable from 'mobx-devtools-mst';
// import { connectToDevTools } from 'mobx-devtools/lib/mobxDevtoolsBackend';
import RootStore from './RootStore';
// import createPersist from './utils/createPersist';

// connectToDevTools({ host: 'localhost', port: '8098' });

const createStores = (initialState = {}, env = {}) => {
  const store = RootStore.create(initialState, env);
  // makeInspectable(RootStore);

  // const persist = createPersist(RootStore, {
  //   whitelist: ['todo'],
  // });

  // persist.rehydrate();

  // persist.purge();

  return {
    store,
  };
};

export default createStores;
