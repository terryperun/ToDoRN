import { types, getEnv } from 'mobx-state-tree';
import EntitiesStore from './EntitiesStore';

const RootStore = types
  .model('RootStore', {
    entities: types.optional(EntitiesStore, {}),
  })

  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

export default RootStore;
