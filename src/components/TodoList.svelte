<script lang="ts">
    import { todos, matchesFilter, filter } from "../store";
    import TodoItem from "./TodoItem.svelte";

    $: filteredTodos = $todos.filter((todo) => matchesFilter(todo, $filter));
    $: areAllCompleted = $todos.every((todo) => todo.completed);

    function toggleAll() {
        todos.updateAll({ completed: !areAllCompleted });
    }
</script>

<section class="main">
    <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        bind:checked={areAllCompleted}
        readonly
    />
    <label for="toggle-all" on:click={toggleAll} />

    <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
            <TodoItem {todo} />
        {/each}
    </ul>
</section>
