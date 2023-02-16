// Store blueprint

import { writable } from 'svelte/store';

/**
 * Use writable to create a new store called alert.
 * Assign an initial String value
 * We then export the store.
 * @type {Writable<string>}
 */
export const alert = writable('Welcome to the to-do list app!');

//import { localStore } from './localStore.js';
///**
//* Assign a localStorage key to todoList
//* Assign initial value to the todoList
//* Export initial value for TodoList
// * @type {{set: function(*): void, subscribe: (this:void, run: Subscriber<any>, invalidate?: Invalidator<any>) => Unsubscriber, update: (this:void, updater: Updater<any>) => void}|{set: function(): void, subscribe: (this:void, run: Subscriber<*>, invalidate?: Invalidator<*>) => Unsubscriber, update: (this:void, updater: Updater<*>) => void}}
// */
//export const todos = localStore('todo_list', [
//	{ id: 1, name: 'Visit MDN web docs', completed: true },
//	{ id: 2, name: 'Complete the Svelte Tutorial', completed: false }
//]);
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
