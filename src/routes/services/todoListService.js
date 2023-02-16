import { getFromLocalStore, setToLocalStore } from '../../store/localStore.js';

const getTodoList = () => {
	if (getFromLocalStore('todo_list') === undefined) {
		setToLocalStore('todo_list', [
			{ id: 1, name: 'Visit MDN web docs', completed: true },
			{ id: 2, name: 'Complete the Svelte Tutorial', completed: false },
			{ id: 3, name: 'Complete the Svelte Tutorial', completed: false },
			{ id: 4, name: 'Complete the Svelte Tutorial', completed: false }
		]);
	}
	return getFromLocalStore('todo_list');
};
const todos = getTodoList();

export { todos };
