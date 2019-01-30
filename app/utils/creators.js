import uuid from 'uuid/v4';

export const createTask = (id, body) => ({
  id: id || uuid(),
  text: body.text || '',
  completed: body.completed || false,
});
