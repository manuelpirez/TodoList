<script>
	import FilterButton from './FilterButton.svelte';
	import Todo from './Todo.svelte';
	/**
	 * This is how we tell svelte that this component accepts a prop & is open for business
	 * @type {any[]}
	 */
	export let todos = [];

	// Define initial state vars
	let newTodoName = '';

	// Reactivity zone
	$: totalTodos = todos.length; // Everytime todos[] is updated anywhere redefine totalTodos with todos.length value
	// $: newTodoId = totalTodos ? Math.max(...todos.map((t) => t.id)) + 1 : 1; // Here we map todos to get an array with all the IDs and the use Math.max to get the last ID and then add 1
	$: newTodoId = totalTodos ? todos.length + 1 : 1; // Here we map todos to get an array with all the IDs and the use Math.max to get the last ID and then add 1
	$: completedTodos = todos.filter((todo) => todo.completed).length; // loops over todos array to get an array with the completed tasks, and then gets the array length

	//  Unnecessary logging - This browser log should be triggered any time the declared variables are modified
	$: console.log('newTodoName: ', newTodoName);
	$: console.log('todoList: ', todos);

	// CRUD
	const deleteTask = (todo) => {
		todos = todos.filter((t) => t.id !== todo.id); // uses filter function to loop over the todoList, eval the given obj id and return a new array without the "todo" to be removed
		// since this function is dependent on todos, all the reactivity functions that are linked or dependant on todos, will be triggered, as an inverse cascade effect
	};
	const addTask = () => {
		//We do this because Objs Cannot have duplicate keys in a keyed each.
		todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }];
		//By using the spread syntax (...todos) instead of push() we avoid mutating the array, which is considered a good practice.
		newTodoName = ''; // clears the newTodoName value to reset the input
	};

	const updateTodo = (todo) => {
		const i = todos.findIndex((t) => t.id === todo.id);
		todos[i] = { ...todos[i], ...todo };
	};

	// Filters
	// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_variables_props#sect7
	let filter = 'all'; //  Svelte analyzes our code to find out dependencies, so it's better to be explicit about it and not rely on the visibility of top-level variables.
	const filterTodos = (
		filter,
		todos // a function to filter our tasks by status
	) =>
		filter === 'active'
			? todos.filter((t) => !t.completed) // returns all completed = false
			: filter === 'completed'
			? todos.filter((t) => t.completed) // returns all completed = true
			: todos; // everything else
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<!-- NewTodo -->

	<!-- The on:eventname directive supports adding modifiers to the DOM event with the | character. In this case, the preventDefault modifier tells Svelte to generate the code to call event.preventDefault() before running the handler. -->
	<!-- https://svelte.dev/docs#on_element_event -->
	<form on:submit|preventDefault={addTask}>
		<h2 class="label-wrapper">
			<label for="todo-0" class="label__lg"> What needs to be done? </label>
		</h2>
		<!-- Binding https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_variables_props#adding_new_to-dos -->
		<!-- https://svelte.dev/docs#bind_element_property -->
		<!-- binding will trigger inverse cascade effect on all the reactivity linked variables or functions -->
		<!-- Svelte provides an easier way to bind any property to a variable, using the bind:property directive -->
		<input bind:value={newTodoName} type="text" id="todo-0" autocomplete="off" />
		<button type="submit" disabled="" class="btn btn__primary btn__lg"> Add </button>
	</form>

	<!-- Filter -->
	<!-- onclick is a function that comes from the filterButton component -->
	<!-- When the action is triggered filter is defined with the value of clicked that is what we defined as a parameter on FilterButton component -->
	<!-- this updates the value and trigger all the reactivity functions related or that use the filter var -->
	<!-- UPDATE: avoid sharing handlers, instead use bind, the variable on the child and parent component must have the same name -->
	<FilterButton bind:filter />

	<!-- TodosStatus -->
	<h2 id="list-heading">
		{completedTodos} out of {totalTodos} items completed
	</h2>

	<!-- Todos -->
	<ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
		<!-- The second parameter, (todo.id) will contain the index of the current item. Also, a key expression can be provided, which will uniquely identify each item. Svelte will use it to diff the list when data changes, rather than adding or removing items at the end, and it's a good practice to always specify one. -->
		{#each filterTodos(filter, todos) as todo (todo.id)}
			<li class="todo">
				<Todo
					{todo}
					on:update={(e) => updateTodo(e.detail)}
					on:delete={(e) => deleteTask(e.detail)}
				/>
			</li>
		{:else}
			<li>Nothing to do here!</li>
		{/each}
	</ul>

	<hr />

	<!-- MoreActions -->
	<div class="btn-group">
		<button type="button" class="btn btn__primary">Check all</button>
		<button type="button" class="btn btn__primary">Remove completed</button>
	</div>
</div>
