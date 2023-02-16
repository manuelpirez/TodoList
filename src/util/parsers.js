// Helper methods for handling type conversions

/**
 * Convert any value to String
 * @param value
 * @returns {string}
 */
const toString = (value) => JSON.stringify(value, null, 2);
/**
 * Convert any value to Obj
 * @type {(text: string, reviver?: (this:any, key: string, value: any) => any) => any}
 */
const toObj = JSON.parse; // convert any value toObj

export { toString, toObj };
