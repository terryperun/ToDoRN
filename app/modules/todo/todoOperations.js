import uuid from 'uuid/v4';
import * as actions from './todoActions';
import Api from '../../api/Api';

export const addTodo = (textTask) => async (dispatch) => {
  const createTask = (text) => ({
    id: uuid(),
    text: text || '',
    completed: false,
  });
  const task = createTask(textTask);
  dispatch(actions.addTodoStart(task));

  try {
    const newTask = await Api.add(task);
    const { id } = task;
    
    dispatch(actions.addTodoOk(newTask, id));
  } catch (error) {
    dispatch(actions.addTodoError({ message: error.message }));
  }
};

export const getAll = () => async (dispatch) => {
  dispatch(actions.getAllTodoStart());

  try {
    const allTodo = await Api.getAll();
    dispatch(actions.getAllTodoOk(allTodo));
  } catch (error) {
    dispatch(actions.getAllTodoError({ message: error.message }));
  }
};
