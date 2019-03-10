import { createEntitiesStore } from './utils/createEntitiesStore';
import { Todo } from './TodoStore';

const EntitiesStore = createEntitiesStore({
  todo: Todo,
});

export default EntitiesStore;
