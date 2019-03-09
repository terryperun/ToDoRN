import { types } from 'mobx-state-tree';
import { createCollectionStore } from './utils/createCollectionStore';
import { createFlow } from './utils/createFlow';

export const Todo = types.model('Todo', {
  id: types.identifier,
  text: '',
  completed: false,
  updatedAt: types.number,
  createdAt: types.number,
});

export const TodoCollectionStore = createCollectionStore(
  'TodoCollectionStore',
  Todo,
);

export const TodoStore = types
  .model('TodoStore', {
    items: types.array(types.reference(Todo)),
    getAll: createFlow(getAll),
  })

  .views((store) => ({
    get list() {
      return store.items.slice();
    },

    get hasNetworkActivity() {
      return store.getAll.inProgress;
    },
  }))

  .actions((store) => ({
    updateItems(items) {
      store.items = items;
    },
  }));

function getAll(flow, store) {
  return function* getAllFlow() {
    try {
      flow.start();

      const res = yield flow.Api.getAll();

      const { ids, entities } = flow.normalize(res);

      flow.mergeEntities('todo', entities);
      store.updateItems(ids);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
