//TODO: Bootstrap - what type of storage the browser supports
//TODO: Add cookie support
import { writable } from 'svelte/store';
import { hasLocalStorage, toObj, toString } from '../util/util';

/**
 * Check if browser supports localStorage & look for item
 * Return stored value as an Obj
 * @param  {string} key
 * @returns {*|{}}
 */
const getFromLocalStore = (key) => {
	// verifies that item exists on localStorage & that exists
	if (hasLocalStorage) {
		const val = localStorage.getItem(key);
		// no val create a new one with an empty obj as value
		if (val === null) {
			return undefined;
		} else {
			const { subscribe, set, update } = writable(toObj(val)); // create the underlying writable store
			return {
				subscribe,
				set: (value) => {
					localStorage.setItem(key, toString(value)); // save also to local storage as a string
					return set(value);
				},
				update
			};
		}
	}
};
/**
 * Check if browser supports localStorage & set item
 * @param  {string} key
 * @param  {any} value
 * @returns {*|undefined}
 */
const setToLocalStore = (key, value) => {
	// Verifies that item exists on localStorage
	if (hasLocalStorage) {
		localStorage.setItem(key, toString(value)); // Save to local storage as a string

		// Add value to SvelteStore
		const { subscribe, set, update } = writable(toObj(localStorage.getItem(key))); // create the underlying writable store
		// Return Svelte contract
		return {
			subscribe,
			set: (value) => {
				localStorage.setItem(key, toString(value)); // save also to local storage as a string
				return set(value);
			},
			update
		};
	} else {
		//TODO: Cookie support
		const { subscribe, set, update } = writable(value); // create the underlying writable store
		// Return Svelte contract
		return {
			subscribe,
			set: (value) => set(value),
			update
		};
	}
};

export { getFromLocalStore, setToLocalStore };

// OLD initializer code
// import { browser } from '$app/environment'; -> return true if running on browser side
// key: the localStorage identifier
// receives the key of the local storage and initial value
//export const localStore = (key, initial) => {
//	const toString = (value) => JSON.stringify(value, null, 2); // convert any value to string
//	const toObj = JSON.parse; // convert any value toObj
//	if (hasLocalStorage) {
//		// client-only code here
//		// verifies that item exists on local storage, if not it creates it
//		if (localStorage.getItem(key) === null) {
//			// item not present in local storage
//			localStorage.setItem(key, toString(initial)); // initialize local storage with initial value
//		}
//		const saved = toObj(localStorage.getItem(key)); // convert to object
//		const { subscribe, set, update } = writable(saved); // create the underlying writable store
//		return {
//			subscribe,
//			set: (value) => {
//				localStorage.setItem(key, toString(value)); // save also to local storage as a string
//				return set(value);
//			},
//			update
//		};
//	} else {
//		const { subscribe, set, update } = writable(initial); // create the underlying writable store
//		return {
//			subscribe,
//			set: () => set(initial),
//			update
//		};
//	}
//};
