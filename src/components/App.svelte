<script lang="ts">
    import { TodoLocal } from "../services/TodoLocal";
    import { todos } from "../store";
    import Copywright from "./Copywright.svelte";
    import Footer from "./Footer.svelte";
    import Header from "./Header.svelte";
    import TodoList from "./TodoList.svelte";

    // load todos from localStorage.
    todos.set(TodoLocal.loadTodos());

    // save todos to localStorage.
    $: TodoLocal.storeTodos($todos);
</script>

<div id="app">
    <section class="todoapp">
        <Header />
        {#if $todos.length > 0}
            <TodoList />
            <Footer />
        {/if}
    </section>
    <Copywright />
</div>
