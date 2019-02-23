import { AsyncStorage } from 'react-native';
import uuid from 'uuid/v4';

const methods = {
  post: 'post',
  get: 'get',
  patch: 'patch',
  delete: 'delete',
};

const saveCache = (cache) =>
  AsyncStorage.setItem('cache', JSON.stringify(cache));
const getCache = async () => {
  const cache = await AsyncStorage.getItem('cache');

  if (!cache) {
    return [];
  }

  return JSON.parse(cache);
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const randomDelay = () =>
  new Promise((res) => {
    const delay = getRandomArbitrary(200, 2000);

    setTimeout(res, delay);
  });

const getId = (endpoint) => endpoint.split('/')[1];

const handleRequest = async (endpoint, options, cache) => {
  if (options.body) {
    options.body = JSON.parse(options.body); // eslint-disable-line no-param-reassign
  }

  switch (options.method) {
    case methods.get: {
      return cache;
    }

    case methods.post: {
      if (endpoint === 'todos/remove') {
        const newCache = cache.filter(
          (todo) => !options.body.includes(todo.id),
        );

        await saveCache(newCache);

        return { success: true };
      }

      const timestamp = new Date().getTime();
      const newTodo = {
        ...options.body,
        id: uuid(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const newCache = cache.concat(newTodo);

      await saveCache(newCache);

      return newTodo;
    }

    case methods.patch: {
      const id = getId(endpoint);

      let newTodo;

      const newCache = cache.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        newTodo = {
          ...todo,
          ...options.body,
          updatedAt: new Date().getTime(),
        };

        return newTodo;
      });

      await saveCache(newCache);

      return newTodo;
    }

    case methods.delete: {
      const id = getId(endpoint);

      const newCache = cache.filter((todo) => todo.id !== id);

      await saveCache(newCache);

      return { success: true };
    }

    default:
      return cache;
  }
};

export class AbortError extends Error {
  constructor() {
    super();
    this.name = 'AbortError';
    this.message = 'Request was aborted.';
    this.stack = new Error().stack;
  }
}

class EventEmitter {
  constructor() {
    this.listener = null;
  }

  send() {
    this.listener();
  }

  subscribe(cb) {
    this.listener = cb;
  }
}

export function createAbortSignal() {
  const abortEvent = new EventEmitter();

  function abort() {
    abortEvent.send();
  }

  function signal() {
    abortEvent.subscribe(() => {
      throw new AbortError();
    });
  }

  signal.abort = abort;

  return signal;
}

const fetchData = async (endpoint, options = {}) => {
  if (options.signal) {
    options.signal();
  }

  if (!options.method) {
    options.method = methods.get; // eslint-disable-line no-param-reassign
  }

  if (options.body) {
    options.body = JSON.stringify(options.body); // eslint-disable-line no-param-reassign
  }

  // getting cached data from store
  const cache = await getCache();

  const res = await handleRequest(endpoint, options, cache);

  await randomDelay();

  return res;
};

const TodoApi = {
  add(body, { signal } = {}) {
    return fetchData('todos', { method: 'post', body, signal });
  },

  remove(id, { signal } = {}) {
    return fetchData(`todos/${id}`, { method: 'delete', signal });
  },

  removeMany(ids, { signal } = {}) {
    return fetchData('todos/remove', {
      method: 'post',
      body: ids,
      signal,
    });
  },

  getAll({ signal } = {}) {
    return fetchData('todos', { signal });
  },

  update(id, body, { signal } = {}) {
    return fetchData(`todos/${id}`, {
      method: 'patch',
      body,
      signal,
    });
  },
};

export default TodoApi;
