import { writable } from 'svelte/store';
import { hasLocalStorage } from '../util/envDetails.js';
// import { browser } from '$app/environment'; -> return true if running on browser side

// key: the localStorage identifier
// receives the key of the local storage and initial value
export const localStore = (key, initial) => {
	// TODO: add cookie support
	const toString = (value) => JSON.stringify(value, null, 2); // convert any value to string
	const toObj = JSON.parse; // convert any value toObj

	if (hasLocalStorage) {
		// client-only code here

		// verifies that item exists on local storage, if not it creates it
		if (localStorage.getItem(key) === null) {
			// item not present in local storage
			localStorage.setItem(key, toString(initial)); // initialize local storage with initial value
		}

		const saved = toObj(localStorage.getItem(key)); // convert to object
		const { subscribe, set, update } = writable(saved); // create the underlying writable store

		return {
			subscribe,
			set: (value) => {
				localStorage.setItem(key, toString(value)); // save also to local storage as a string
				return set(value);
			},
			update
		};
	} else {
		const { subscribe, set, update } = writable(initial); // create the underlying writable store

		return {
			subscribe,
			set: () => {
				set(initial);
			},
			update
		};
	}
};
