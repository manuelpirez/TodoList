<script>
	// Every time a user clicks on a button the filter variable gets updated
	// UPDATE: just use binding
	export let filter = 'all';
	// // Whenever filter is modified this function gets triggered because of reactivity
	// $: onclick(filter);

	// // In our case, the FilterButton component will receive an onclick handler from its parent. 
	// // Whenever the user clicks on any filter button, the child will call the onclick handler, 
	// // passing the selected filter as a parameter back up to its parent.
	// export let onclick = (clicked) => {};
</script>

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
