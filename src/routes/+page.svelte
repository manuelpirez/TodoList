<script>
	import Todos from './components/Todos.svelte';
	let todos = [
		{ id: 1, name: 'Create a Svelte starter app', completed: false },
		{ id: 2, name: 'Create your first component', completed: true },
		{ id: 3, name: 'Complete the rest of the tutorial', completed: false }
	];
</script>

<!-- Here, we send the variable todos as a prop, {todos} is shorthand for todos={todos}. We all like writing less code -->
<Todos {todos} />
