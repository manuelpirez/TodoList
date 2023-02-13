<script>
	export let todos;

	$: totalTodos = todos.length; // Everytime todos[] is updated anywhere redefine totalTodos with todos.length value
	// $: newTodoId = totalTodos ? Math.max(...todos.map((t) => t.id)) + 1 : 1; // Here we map todos to get an array with all the IDs and the use Math.max to get the last ID and then add 1
	$: completedTodos = todos.filter((todo) => todo.completed).length; // loops over todos array to get an array with the completed tasks, and then gets the array length

	// Component encapsulation
	let headingEl;
	/* Note that we've added a tabindex attribute to the <h2> to allow the element to receive focus programmatically.
	 * As we saw earlier, using the bind:this={headingEl} directive gives us a reference to the DOM node in the variable
	 * headingEl. Then we use export function focus() to expose a function that gives focus to the <h2> heading.
	 */
	export const focus = () => headingEl.focus();
</script>

<!-- Note that we've added a tabindex attribute to the <h2> to allow the element to receive focus programmatically -->

<!-- bind:this we are binding headingE1 to this DOM node to be able to attach a focus function
   and expose that funcion to the parent-->
<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
	{completedTodos} out of {totalTodos} items completed
</h2>
