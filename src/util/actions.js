// focus an input whenever it is selected
const selectOnFocus = (node) => {
    if (node && typeof node.select === 'function') { // make sure node is defined and has a select() method
        const onFocus = () => node.select(); // event handler
        node.addEventListener('focus', onFocus); // when node gets focus call onFocus()
        return {
            destroy: () => node.removeEventListener('focus', onFocus), // this will be executed when the node is removed from the DOM
        }
    }
}

// Focus an input on component init 
const focusOnInit = (node) => node && typeof node.focus === 'function' && node.focus();

export { focusOnInit, selectOnFocus }