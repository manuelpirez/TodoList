<script>
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
	// JS objects does not acce
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

	// Filters
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_variables_props#sect7
	let filter = 'all'; //  Svelte analyzes our code to find out dependencies, so it's better to be explicit about it and not rely on the visibility of top-level variables.
	const filterTodos = (filter, todos) => // a function to filter our tasks by status
		filter === 'active'
			? todos.filter((t) => !t.completed) // returns all completed = false
			: filter === 'completed'
			? todos.filter((t) => t.completed)// returns all completed = true
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
	<div class="filters btn-group stack-exception">
		<button
			class="btn toggle-btn"
			class:btn__primary={filter === 'all'}
			aria-pressed={filter === 'all'}
			on:click={() => (filter = 'all')}
		>
			<span class="visually-hidden">Show</span>
			<span>All</span>
			<span class="visually-hidden">tasks</span>
		</button>
		<button
			class="btn toggle-btn"
			class:btn__primary={filter === 'active'}
			aria-pressed={filter === 'active'}
			on:click={() => (filter = 'active')}
		>
			<span class="visually-hidden">Show</span>
			<span>Active</span>
			<span class="visually-hidden">tasks</span>
		</button>
		<button
			class="btn toggle-btn"
			class:btn__primary={filter === 'completed'}
			aria-pressed={filter === 'completed'}
			on:click={() => (filter = 'completed')}
		>
			<span class="visually-hidden">Show</span>
			<span>Completed</span>
			<span class="visually-hidden">tasks</span>
		</button>
	</div>

	<!-- TodosStatus -->
	<h2 id="list-heading">
		{completedTodos} out of {totalTodos} items completed
	</h2>

	<!-- Todos -->
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
        <!-- The second parameter, (todo.id) will contain the index of the current item. Also, a key expression can be provided, which will uniquely identify each item. Svelte will use it to diff the list when data changes, rather than adding or removing items at the end, and it's a good practice to always specify one. -->
        {#each filterTodos(filter, todos) as todo (todo.id)}
        <!-- Filter todos function returns an filtered array based on the "filter" condition -->
			<li class="todo">
				<div class="stack-small">
					<div class="c-cb">
						<input
							type="checkbox"
							id="todo-{todo.id}"
							on:click={() => (todo.completed = !todo.completed)}
							checked={todo.completed}
						/>
                        <!-- since the list obj is defined on every <li> iteration, we can directly modify/access its contents -->
                            <!-- this will perform the regular cascade effect seen above -->
						<label for="todo-{todo.id}" class="todo-label"> {todo.name} </label>
					</div>
					<div class="btn-group">
						<button type="button" class="btn">
							Edit <span class="visually-hidden">{todo.name}</span>
						</button>
						<button type="button" class="btn btn__danger" on:click={() => deleteTask(todo)}>
							Delete <span class="visually-hidden">{todo.name}</span>
						</button>
					</div>
				</div>
			</li>
		{:else}
			<li>Nothing to do here! Day off!</li>
		{/each}
	</ul>

	<hr />

	<!-- MoreActions -->
	<div class="btn-group">
		<button type="button" class="btn btn__primary">Check all</button>
		<button type="button" class="btn btn__primary">Remove completed</button>
	</div>
</div>
