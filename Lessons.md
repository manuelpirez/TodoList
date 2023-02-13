# Session 1 Summary

That will do for now! :+1: In this article we already implemented most of our desired functionality. Our app can display, add, and delete to-dos, toggle their completed status, show how many of them are completed, and apply filters.

To recap, we covered the following topics:

-    Creating and using components
-    Turning static markup into a live template
-    Embedding JavaScript expressions in our markup
-    Iterating over lists using the {#each} directive
-    Passing information between components with props
-    Listening to DOM events
-    Declaring reactive statements
-    Basic debugging with console.log() and reactive statements
-   Binding HTML properties with the bind:property directive
-    Triggering reactivity with assignments
-    Using reactive expressions to filter data
-    Explicitly defining our reactive dependencies


# Session 2 Summary 
Now we have all of our app's required functionality in place. We can display, add, edit, and delete to-dos, mark them as completed, and filter by status.

In this session, we covered the following topics:

-    Extracting functionality to a new component
-    Passing information from child to parent using a handler received as a prop
-    Passing information from child to parent using the bind directive
-    Conditionally rendering blocks of markup using the if block
-    Implementing the "props-down, events-up" communication pattern
-    Creating and listening to custom events

# Session 3 Summary 

In this session we have finished adding all the required functionality to our app, plus we've taken care of a number of accessibility and usability issues. We also finished splitting our app into manageable components, each one with a unique responsibility.
In the meantime, we saw a few advanced Svelte techniques, like:

-   Dealing with reactivity gotchas when updating objects and arrays
-   Working with DOM nodes using bind:this={dom_node} (binding DOM elements)
-   Using the component lifecycle onMount() function
-   Forcing Svelte to resolve pending state changes with the tick() function
-   Adding functionality to HTML elements in a reusable and declarative way with the use:action directive
-   Accessing component methods using bind:this={component} (binding components)
