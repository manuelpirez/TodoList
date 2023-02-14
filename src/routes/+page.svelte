<script>
    import Todos from "./components/Todos.svelte";
    import Alert from "./components/Alert.svelte";

    import { todos } from "./../store/stores.js";
    // First we need some way for our Todos component to give back the updated to-dos to its parent.
    // We could emit an updated event with the list of to-dos,
    // but it's easier just to bind the todos variable.
    // !! to access the to-dos now we have to use the $todos reactive $store syntax.
    $todos = [
        { id: 1, name: "Create a Svelte starter app", completed: true },
        { id: 2, name: "Create your first component", completed: true },
        { id: 3, name: "Complete the rest of the tutorial", completed: false }
    ];
    $: console.log('todos', todos)
    console.log('todos store - todos:', todos)
    console.log('todos store content - $todos:', $todos)
</script>

<Alert />
<!-- Here, we send the variable todos as a prop, {todos} is shorthand for todos={todos}. We all like writing less code -->
<!-- Session 3 (stores): First we need some way for our Todos component to give back the updated to-dos to its parent.
    We could emit an updated event with the list of to-dos,
    but it's easier just to bind the todos variable. <Todos bind:todos />
    Everytime todos updates the variable it will get updated here as well-->
<!-- Session 3 part 2 (stores): change the var to use the $ syntax-->
<Todos bind:todos={$todos} />
