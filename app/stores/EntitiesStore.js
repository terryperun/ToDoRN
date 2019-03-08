import { types } from 'mobx-state-tree';

const EntitiesStore = types
  .model('EntitiesStore', {})

  .actions((store) => ({
    merge(normalizedEntities) {
      Object.keys(normalizedEntities).forEach((entityKey) => {
        const storeEntity = store[entityKey];
        const entities = normalizedEntities[entityKey];

        Object.entries(entities).forEach(([key, value]) => {
          storeEntity.collection.set(key, value);
        });
      });
    },
  }));

export default EntitiesStore;
