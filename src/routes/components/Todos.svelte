<script>
	import FilterButton from './FilterButton.svelte';
	import Todo from './Todo.svelte';
	import MoreActions from './MoreActions.svelte';
	import NewTodo from './NewTodo.svelte';

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

	// Uses name from NewTodo component
	const addTask = (name) => {
		//We do this because Objs Cannot have duplicate keys in a keyed each.
		// todos = [...todos, { id: newTodoId, name: newTodoName, completed: false }];
		//By using the spread syntax (...todos) instead of push() we avoid mutating the array, which is considered a good practice.
		// newTodoName = ''; // clears the newTodoName value to reset the input

		//  newTodo
		// assign a new value to todos, with a copy of the old todos, and a new object
		todos = [...todos, { id: newTodoId, name, completed: false }];
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

	// loops over all todos, and mark all the "completed" Key, to the value of MoreActions completed = true || false
	const checkAllTodos = (completed) => {
		todos = todos.map((t) => ({ ...t, completed }));
	};

	// return an array with all the todos = !true
	const removeCompletedTodos = () => (todos = todos.filter((t) => !t.completed));
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
	<!-- NewTodo -->
	<NewTodo autofocus on:addTodo={(e) => addTask(e.detail)} />

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
	<!-- We created two custom events checkAll & removeCompleted on MoreActions -->
	<!-- That way we can cleanly access them as an on:event action on another component -->
	<!-- Then we attached an action defined on the parent component to interact with the local variables -->
	<!-- todos = we are passing the todos array to the MoreActions component to check state and react accordingly (enable disabe buttons if al tasks are completed) -->
	<MoreActions
		{todos}
		on:checkAll={(e) => checkAllTodos(e.detail)}
		on:removeCompleted={removeCompletedTodos}
	/>
</div>
