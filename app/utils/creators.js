import uuid from 'uuid/v4';

export const createTask = (text = '') => ({
  id: uuid(),
  text,
  completed: false,
  updatedAt: new Date().getTime(),
  createdAt: new Date().getTime(),
});
