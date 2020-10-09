<script lang="ts">
    import { todos } from "../store";

    let input: string = "";

    function handleSubmit(event: KeyboardEvent) {
        if (event.key === "Enter") {
            let todoName = input.trim();

            if (todoName !== "") {
                todos.add(todoName);

                // reset input field
                input = "";
            }
        }
    }
</script>

<header class="header">
    <h1>todos</h1>
    <input
        class="new-todo"
        placeholder="What needs to be done?"
        bind:value={input}
        on:keyup={handleSubmit}
    />
</header>
