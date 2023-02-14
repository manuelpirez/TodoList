// We import the writable() function from svelte/store
import { writable } from 'svelte/store';
export const todos = writable([]);

// Use writable to create a new store called alert with an initial value of "Welcome to the to-do list app!". We then export the store.
export const alert = writable('Welcome to the to-do list app!');
