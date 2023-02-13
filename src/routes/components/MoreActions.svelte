<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	//   Accept the todos array to modify buttons reaction
	export let todos;

	// exports the internal state
	let completed = true;

	// Creates a custom DOM event and exposes the "completed" variable
	const checkAll = () => {
		dispatch('checkAll', completed);
		completed = !completed;
	};

	// Creates a custom DOM event
	const removeCompleted = () => dispatch('removeCompleted');

	// Creates a listener for the todos filter
	// we will use this listener as a flag for disabling the buttons when all the tasks are completed
	$: completedTodos = todos.filter((t) => t.completed.length);
</script>

<div class="btn-group">
	<button type="button" class="btn btn__primary" disabled={todos.length === 0} on:click={checkAll}
		>{completed ? 'Check' : 'Uncheck'} all</button
	>
	<button
		type="button"
		class="btn btn__primary"
		disabled={completedTodos === 0}
		on:click={removeCompleted}>Remove completed</button
	>
</div>
