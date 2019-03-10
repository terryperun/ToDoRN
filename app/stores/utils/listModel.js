import { types, getRoot } from 'mobx-state-tree';
import normalize from './normalize';

export default function listModel(name, definition, options = {}) {
  const { listPropertyName, env, entityName } = options;

  const baseStore = types.model(name, definition, env);

  const listStore = types
    .model(`${name}List`)
    .views((store) => ({
      get rawList() {
        return store[listPropertyName].slice();
      },
    }))

    .actions((store) => ({
      _setListData(data) {
        const { ids, entities } = store._normalize(data);

        store._merge(entityName, entities);
        store[listPropertyName] = ids;
      },

      _add(item) {
        store._mergeSingle(item);
        store[listPropertyName].push(item.id);
      },

      _addToBegin(item) {
        store._mergeSingle(item);
        store[listPropertyName].unshift(item.id);
      },

      _replace(id, newItem) {
        const index = store[listPropertyName].findIndex(
          (i) => i.id === id,
        );

        store._mergeSingle(newItem);
        store[index] = newItem;
      },

      _normalize(items, keyName) {
        return normalize(items, keyName);
      },

      _merge(key, object) {
        if (typeof key === 'object') {
          getRoot(store).entities.merge(key);
        } else {
          getRoot(store).entities.merge({ [key]: object });
        }
      },

      _mergeSingle(entity, identifier = 'id') {
        getRoot(store).entities.merge({
          [entityName]: {
            [entity[identifier]]: entity,
          },
        });
      },
    }));

  return types.compose(
    baseStore,
    listStore,
  );
}
