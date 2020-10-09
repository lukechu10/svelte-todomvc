<script lang="ts">
    import { todos, filter, Filter } from "../store";

    $: itemsLeft = $todos.reduce((acc, cur) => (!cur.completed ? acc + 1 : acc), 0);
    $: itemText = itemsLeft === 1 ? "item" : "items";

    $: hasCompletedTodos = $todos.find((todo) => todo.completed) !== undefined;

    // lookup table for list for filter names
    const filterTitles = [
        { key: Filter.All, value: "All", href: "./#" },
        { key: Filter.Active, value: "Active", href: "./#/active" },
        { key: Filter.Completed, value: "Completed", href: "./#/completed" },
    ];
</script>

<footer class="footer">
    <span class="todo-count"> <strong>{itemsLeft}</strong> <span>{itemText} left</span> </span>
    <ul class="filters">
        {#each filterTitles as { key, value, href }}
            <li>
                <a {href} class:selected={$filter === key} on:click={() => filter.set(key)}>
                    {value}
                </a>
            </li>
        {/each}
    </ul>
    {#if hasCompletedTodos}
        <button class="clear-completed" on:click={todos.clearCompleted}> Clear completed </button>
    {/if}
</footer>
