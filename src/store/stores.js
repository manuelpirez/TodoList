// We import the writable() function from svelte/store
import { writable } from 'svelte/store';
import { localStore } from './localStore.js';

// Use writable to create a new store called alert with an initial value of "Welcome to the to-do list app!". We then export the store.
export const alert = writable('Welcome to the to-do list app!');

//export const todos = writable([]);
// export initial todoList
export const todos = localStore('svelte-local-todo-list', [
	{ id: 1, name: 'Visit MDN web docs', completed: true },
	{ id: 2, name: 'Complete the Svelte Tutorial', completed: false }
]);

// In the following example we create a counter store.
// Which will only allow us to add one to the counter or reset its value
// export const customStore = () => {
// 	const { subscribe, set, update } = writable(0);
//
// 	return {
// 		subscribe,
// 		addOne: () => update((n) => n + 1),
// 		reset: () => set(0)
// 	};
// };
