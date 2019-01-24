import uuid from 'uuid/v4';
import * as actions from './todoActions';
import Api from '../../api/Api';

export const addTodo = (textTask) => async (dispatch) => {
  console.log('in Operation start 11--', textTask);
  const createTask = (text) => ({
    id: uuid(),
    text: text || '',
    completed: false,
  });
  const task = createTask(textTask);
  dispatch(actions.addTodoStart(task));
  console.log('in Operation start 22--', task);

  try {
    const newTask = await Api.add(task);
    console.log('in Operation ok 33--', newTask);
    dispatch(actions.addTodoOk(newTask, task.id));
  } catch (error) {
    console.log('in Operation error 44--');
    dispatch(actions.addTodoError({ message: error.message }));
  }
};

export const getAll = () => async (dispatch) => {
  dispatch(actions.getAllTodoStart());

  try {
    const allTodo = await Api.getAll();
    console.log('in Operation ok ALL--', allTodo);
    dispatch(actions.getAllTodoOk({ allTodo }));
  } catch (error) {
    dispatch(actions.getAllTodoError({ message: error.message }));
  }
};
