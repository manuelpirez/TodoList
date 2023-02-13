<script>
	import { selectOnFocus, focusOnInit } from '../../util/actions';
	import { createEventDispatcher, tick } from 'svelte';
	const dispatch = createEventDispatcher();

	/**
	 * @type {{ id: any; completed: boolean; name: any; }}
	 */
	export let todo;

	let nameEl; // reference to the name input DOM node
	let editing = false; // track editing mode
	let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save
	let name = todo.name; // hold the name of the to-do being edited

	// CRUD
	const update = (/** @type {{ name?: string; completed?: boolean; id?: any; }} */ updatedTodo) => {
		todo = { ...todo, ...updatedTodo };
		dispatch('update', todo);
	};
	function onCancel() {
		name = todo.name; // restores name to its initial value and
		editing = false; // and exit editing mode
	}
	function onSave() {
		update({ name }); // updates todo name
		editing = false; // and exit editing mode
	}
	function onDelete() {
		dispatch('delete', todo); // emit delete event
	}
	async function onEdit() {
		editButtonPressed = true; // user pressed the Edit button, focus will come back to the Edit button
		editing = true; // enter editing mode

		// thanks to focusOnInit this is not necessary
		// await tick();
		// nameEl.focus(); // set focus to name input
	}
	function onToggle() {
		update({ completed: !todo.completed }); // updates todo status
	}

	// use actions
	const focusEditButton = (node) => editButtonPressed && node.focus();
</script>

<div class="stack-small">
	{#if editing}
		<!-- markup for editing todo: label, input text, Cancel and Save Button -->
		<form
			on:submit|preventDefault={onSave}
			class="stack-small"
			on:keydown={(e) => e.key === 'Escape' && onCancel()}
		>
			<div class="form-group">
				<label for="todo-{todo.id}" class="todo-label">New name for '{todo.name}'</label>
				<input
					bind:value={name}
					bind:this={nameEl}
					use:selectOnFocus
					use:focusOnInit
					type="text"
					id="todo-{todo.id}"
					autoComplete="off"
					class="todo-text"
				/>
				<!-- use:selecOnFocus With this directive we are telling Svelte to run this function, 
					passing the DOM node of the <input> as a parameter, as soon as the component is mounted 
					on the DOM. It will also be in charge of executing the destroy function when the 
					component is removed from DOM. So with the use directive, Svelte takes care of the 
					omponent's lifecycle for us. -->
			</div>
			<div class="btn-group">
				<button class="btn todo-cancel" on:click={onCancel} type="button">
					Cancel<span class="visually-hidden">renaming {todo.name}</span>
				</button>
				<button class="btn btn__primary todo-edit" type="submit" disabled={!name}>
					Save<span class="visually-hidden">new name for {todo.name}</span>
				</button>
			</div>
		</form>
	{:else}
		<!-- markup for displaying todo: checkbox, label, Edit and Delete Button -->
		<div class="c-cb">
			<input type="checkbox" id="todo-{todo.id}" on:click={onToggle} checked={todo.completed} />
			<label for="todo-{todo.id}" class="todo-label">{todo.name}</label>
		</div>
		<div class="btn-group">
			<button type="button" class="btn" on:click={onEdit} use:focusEditButton>
				Edit<span class="visually-hidden"> {todo.name}</span>
			</button>
			<button type="button" class="btn btn__danger" on:click={onDelete}>
				Delete<span class="visually-hidden"> {todo.name}</span>
			</button>
		</div>
	{/if}
</div>
