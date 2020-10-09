<script lang="ts">
    import { todos } from "../store";
    import type { Todo } from "../store";
    import { tick } from "svelte";

    export let todo: Todo;

    let editing = false;
    $: name = todo.name;

    let inputEl: HTMLInputElement;

    function handleCompleted() {
        todos.update({
            id: todo.id,
            completed: !todo.completed, // toggle completed status
        });
    }

    function handleRemove() {
        todos.remove({ id: todo.id });
    }

    async function handleEdit() {
        editing = true;
        await tick();
        inputEl.focus(); // focus onto input element
    }

    function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
        name = event.currentTarget.value;
    }

    function handleBlur() {
        let newName = name.trim();
        if (newName === "") {
            // remove todo
            todos.remove({ id: todo.id });
        } else {
            // update todo
            todos.rename({ id: todo.id, name });
            editing = false;
        }
    }

    function handleKeyup(ev: KeyboardEvent) {
        switch (ev.key) {
            case "Enter":
                handleBlur();
                break;
            case "Escape":
                // reset name to intial state
                name = todo.name;
                editing = false;
                break;
        }
    }
</script>

<li class:editing class:completed={todo.completed}>
    <div class="view">
        <input
            class="toggle"
            type="checkbox"
            on:change={handleCompleted}
            checked={todo.completed}
        />
        <label on:dblclick={handleEdit} for="destroy">{name}</label>
        <button class="destroy" on:click={handleRemove} />
    </div>
    <input
        bind:this={inputEl}
        class="edit"
        value={name}
        on:input={handleChange}
        on:keyup={handleKeyup}
        on:blur={handleBlur}
    />
</li>
