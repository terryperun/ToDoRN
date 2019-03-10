import { types, getRoot, getParent } from 'mobx-state-tree';
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

    isSelected: false,

    toggleCompleted: createFlow(toggleCompleted),
    updateText: createFlow(updateText),
    remove: createFlow(remove),
  })

  .actions((store) => ({
    setCompleted(value) {
      store.completed = value;
    },

    setText(value) {
      store.text = value;
    },

    toggleSelection() {
      store.isSelected = !store.isSelected;
    },

    setSelection(value) {
      store.isSelected = value;
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
      flow.failed(err);
    }
  };
}

function updateText(flow, store) {
  return function* updateTextFlow(newText) {
    store.setText(newText);

    try {
      flow.start();

      yield flow.Api.update(store.id, {
        text: newText,
      });

      flow.success();
    } catch (err) {
      flow.failed(err);
    }
  };
}

function remove(flow, store) {
  return function* removeFlow() {
    // we should point to root store
    // because getParent returns entities store
    getRoot(store).todo.list.remove(store.id);

    try {
      flow.start();

      yield flow.Api.remove(store.id);

      flow.success();

      // entities
      getParent(store, 2).destroy(store.id);
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

const TodoList = listModel('TodoList', {
  of: types.reference(Todo),
  entityName: 'todo',
  identifierName: 'id',
});

export const TodoStore = types
  .model('TodoStore', {
    list: TodoList,
    getAll: createFlow(getAll),
    add: createFlow(add),
    removeMany: createFlow(removeMany),
  })

  .views((store) => ({
    get hasNetworkActivity() {
      const itemsInProgress = store.list.asArray.some(
        (item) =>
          item.toggleCompleted.inProgress ||
          item.updateText.inProgress ||
          item.remove.inProgress,
      );

      return (
        store.getAll.inProgress ||
        store.add.inProgress ||
        store.removeMany.inProgress ||
        itemsInProgress
      );
    },

    get sections() {
      return store.list.asArray.reduce(
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

    get selectedCount() {
      return store.list.asArray.reduce((acc, current) => {
        if (current.isSelected) {
          acc += 1;
        }

        return acc;
      }, 0);
    },

    get selectedIds() {
      return store.list.asArray
        .filter((item) => item.isSelected)
        .map((item) => item.id);
    },

    get doneIds() {
      return store.list.asArray
        .filter((item) => item.completed)
        .map((item) => item.id);
    },
  }))

  .actions((store) => ({
    unselectAll() {
      store.list.array.forEach((item) => item.setSelection(false));
    },

    removeSelected() {
      return store.removeMany.run(store.selectedIds);
    },

    removeDone() {
      return store.removeMany.run(store.doneIds);
    },
  }));

function getAll(flow, store) {
  return function* getAllFlow() {
    try {
      flow.start();

      const res = yield flow.Api.getAll();

      store.list.set(res);

      flow.success();
    } catch (err) {
      flow.failed(err);
    }
  };
}

function add(flow, store) {
  return function* addFlow(text) {
    const todo = createTask(text);

    store.list.addToBegin(todo);

    try {
      flow.start();

      const res = yield flow.Api.add(todo);

      store.list.replace(todo.id, res);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}

function removeMany(flow, store) {
  return function* removeSelectedFlow(ids) {
    try {
      store.list.removeMany(ids);

      flow.start();

      yield flow.Api.removeMany(ids);

      flow.success();
    } catch (err) {
      flow.failed(err, true);
    }
  };
}
