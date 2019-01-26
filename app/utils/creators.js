import uuid from 'uuid/v4';

const createTask = (text) => ({
  id: uuid(),
  text: text || '',
  completed: false,
});
export default createTask;
