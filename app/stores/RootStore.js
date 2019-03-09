import { types, getEnv } from 'mobx-state-tree';
import EntitiesStore from './EntitiesStore';
import { TodoStore } from './TodoStore';

const RootStore = types
  .model('RootStore', {
    todo: types.optional(TodoStore, {}),
    entities: types.optional(EntitiesStore, {
      todo: {},
    }),
  })

  .views((store) => ({
    get Api() {
      return getEnv(store).Api;
    },
  }));

export default RootStore;
