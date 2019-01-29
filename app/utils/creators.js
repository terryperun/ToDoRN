import uuid from 'uuid/v4';

export const createTask = (text, id, completed) => ({
  id: id || uuid(),
  text: text || '',
  completed: completed || false,
});
