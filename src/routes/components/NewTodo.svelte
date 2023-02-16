<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { selectOnFocus } from '../../util/actions';

	const dispatch = createEventDispatcher();

	export let autofocus = false;

	let name = ''; // value for the task text
	let nameEl; // reference to the name input DOM node

	const addTask = () => {
		dispatch('addTodo', name);
		name = '';
		nameEl.focus(); // give focus to the name input
	};

	const onCancel = () => {
		name = '';
		nameEl.focus(); // give focus to the name input
	};

	onMount(() => autofocus && nameEl.focus()); // if autofocus is true, we run nameEl.focus()
</script>

<!-- The on:eventName directive supports adding modifiers to the DOM event with the | character. In this case, the preventDefault modifier tells Svelte to generate the code to call event.preventDefault() before running the handler. -->
<!-- https://svelte.dev/docs#on_element_event -->
<form on:submit|preventDefault={addTask} on:keydown={(e) => e.key === 'Escape' && onCancel()}>
	<h2 class="label-wrapper">
		<label for="todo-0" class="label__lg">What needs to be done?</label>
	</h2>
	<!-- Binding https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_variables_props#adding_new_to-dos -->
	<!-- https://svelte.dev/docs#bind_element_property -->
	<!-- binding will trigger inverse cascade effect on all the reactivity linked variables or functions -->
	<!-- Svelte provides an easier way to bind any property to a variable, using the bind:property directive -->
	<input
		bind:value={name}
		bind:this={nameEl}
		autoComplete="off"
		use:selectOnFocus
		type="text"
		id="todo-0"
		class="input input__lg"
	/>
	<!-- bind:this Now we want the <input>element of the NewTodo component to re-gain focus every 
        time the Add button is pressed. For that we'll need a reference to the DOM node of the input. 
        Svelte provides a way to do this with the bind:this={dom_node} directive. When specified, 
        as soon as the component is mounted and the DOM node is created, Svelte assigns a reference to 
        the DOM node to the specified variable. -->
	<button type="submit" disabled={!name} class="btn btn__primary btn__lg">Add</button>
</form>
