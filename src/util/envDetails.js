// Describe functions to validate compiler environment

/**
 * Checks if the browser has support for localStorage
 * @type {boolean}
 */
const hasLocalStorage = typeof localStorage !== 'undefined';

export { hasLocalStorage };
