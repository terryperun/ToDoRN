import { types } from 'mobx-state-tree';
import { createCollectionStore } from './utils/createCollectionStore';
import { createFlow } from './utils/createFlow';
import { createTask } from '../utils/creators';
import listModel from './utils/listModel';

export const Todo = types
  .model('Todo', {
    id: types.identifier,
    text: '',
    completed: false,
    updatedAt: types.number,
    createdAt: types.number,
    toggleCompleted: createFlow(toggleCompleted),
  })

  .actions((store) => ({
    setCompleted(value) {
      store.completed = value;
    },
  }));

function toggleCompleted(flow, store) {
  return function* toggleCompletedFlow() {
    const newValue = !store.completed;
    store.setCompleted(newValue);

    try {
      flow.start();

      yield flow.Api.update(store.id, {
        completed: newValue,
      });

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

export const TodoCollectionStore = createCollectionStore(
  'TodoCollectionStore',
  Todo,
);

export const TodoStore = listModel(
  'TodoStore',
  {
    items: types.array(types.reference(Todo)),
    getAll: createFlow(getAll),
    add: createFlow(add),
  },
  {
    listPropertyName: 'items',
    entityName: 'todo',
  },
).views((store) => ({
  get hasNetworkActivity() {
    const itemsInProgress = store.items.some(
      (item) => item.toggleCompleted.inProgress,
    );

    return (
      store.getAll.inProgress ||
      store.add.inProgress ||
      itemsInProgress
    );
  },

  get sections() {
    return store.rawList.reduce(
      (acc, item) => {
        if (!item.completed) {
          acc.new.push(item);
        } else {
          acc.done.push(item);
        }
        return acc;
      },
      { done: [], new: [] },
    );
  },
}));

function getAll(flow, store) {
  return function* getAllFlow() {
    try {
      flow.start();

      const res = yield flow.Api.getAll();

      store._setListData(res);

      flow.success();
    } catch (err) {
      flow.failed(err);
    }
  };
}

function add(flow, store) {
  return function* addFlow(text) {
    const todo = createTask(text);

    store._addToBegin(todo);

    try {
      flow.start();

      const res = yield flow.Api.add(todo);

      store._replace(todo.id, res);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
