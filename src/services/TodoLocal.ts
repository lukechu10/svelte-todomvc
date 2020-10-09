import type { Todo } from "../store";

/**
 * Service for saving todo state to `window.localStorage`.
 */
export class TodoLocal {
    static LOCAL_STORAGE_KEY = "todos-svelte";

    static loadTodos(): Todo[] {
        return JSON.parse(window.localStorage.getItem(this.LOCAL_STORAGE_KEY) ?? "[]"); // if no local storage, parse empty array
    }

    static storeTodos(todos: Todo[]): void {
        window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
}
