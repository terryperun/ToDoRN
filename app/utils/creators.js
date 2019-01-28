import uuid from 'uuid/v4';

export const createTask = (text) => ({
  id: uuid(),
  text: text || '',
  completed: false,
});
