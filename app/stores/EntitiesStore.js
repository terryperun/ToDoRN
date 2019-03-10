import { types } from 'mobx-state-tree';
import { createCollectionStore } from './utils/createCollectionStore';
import { Todo } from './TodoStore';

export const TodoCollectionStore = createCollectionStore(
  'TodoCollectionStore',
  Todo,
);

const EntitiesStore = types
  .model('EntitiesStore', {
    todo: types.optional(TodoCollectionStore, {}),
  })

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
