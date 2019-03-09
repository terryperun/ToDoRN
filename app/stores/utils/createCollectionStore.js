import { types } from 'mobx-state-tree';

export const createCollectionStore = (name, Model) =>
  types
    .model(name, {
      collection: types.map(Model),
    })
    .actions(store => ({
      add(key, value) {
        store.collection.set(key, value);
      },
      destroy(item) {
        store.collection.delete(item.id);
      },
    }));
