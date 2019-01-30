import uuid from 'uuid/v4';

export const createTask = (text, id) => ({
  id: id || uuid(),
  text: text || '',
  completed: false,
});
