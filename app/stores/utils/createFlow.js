import { types, flow, getParent, getRoot } from 'mobx-state-tree';
import normalize from './normalize';

const ErrorModel = types.model('ErrorModel', {
  message: '',
  status: types.optional(types.maybeNull(types.number), null),
  reason: types.optional(types.maybeNull(types.string), null),
  stack: types.optional(types.maybeNull(types.string), null),
});

export function createFlow(flowDefinition) {
  const flowModel = types
    .model({
      inProgress: false,
      error: types.optional(types.maybeNull(ErrorModel), null),
    })
    .views((store) => ({
      get errorMessage() {
        if (store.error === null) {
          return null;
        }

        return store.error.message;
      },

      get isError() {
        return Boolean(store.error);
      },

      get Api() {
        return getRoot(store).Api;
      },
    }))
    .actions((store) => ({
      start() {
        store.inProgress = true;
        store.error = null;
      },

      success() {
        store.inProgress = false;
      },

      failed(err, shouldThrowError) {
        store.inProgress = false;

        store.error = {
          message: err.message || '',
          stack: err.stack || null,
          reason: err.reason || null,
          status: err.status || null,
        };

        if (shouldThrowError) {
          throw err;
        }
      },

      run: flow(flowDefinition(store, getParent(store))),

      normalize(items, keyName) {
        return normalize(items, keyName);
      },

      mergeEntities(key, object) {
        if (typeof key === 'object') {
          getRoot(store).entities.merge(key);
        } else {
          getRoot(store).entities.merge({ [key]: object });
        }
      },
    }));

  return types.optional(flowModel, {});
}
