import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
    name: string;
    completed: boolean;
    id: string;
}

export function matchesFilter(todo: Todo, filter: Filter) {
    switch (filter) {
        case Filter.All:
            return true;
        case Filter.Active:
            return !todo.completed;
        case Filter.Completed:
            return todo.completed;
    }
}

function createTodosStore() {
    const { subscribe, set, update } = writable([] as Todo[]);
    return {
        subscribe,
        set,
        /**
         * Adds a new todo to the todo list. The added todo is not completed.
         */
        add: (name: string) => {
            const todo: Todo = {
                name,
                completed: false,
                id: uuidv4(),
            };
            update((state) => [...state, todo]);
        },
        /**
         * Updates the completion status of a todo.
         */
        update: ({ id, completed }: { id: string; completed: boolean }) =>
            update((state) =>
                state.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
            ),
        /**
         * Updates the competition status of all the todos.
         */
        updateAll: ({ completed }: { completed: boolean }) =>
            update((state) => state.map((todo) => ({ ...todo, completed }))),
        /**
         * Renames a todo.
         */
        rename: ({ id, name }: { id: string; name: string }) =>
            update((state) => state.map((todo) => (todo.id === id ? { ...todo, name } : todo))),
        /**
         * Removes a todo.
         */
        remove: ({ id }) => update((state) => state.filter((todo) => todo.id !== id)),
        /**
         * Removes all the todos that are completed.
         */
        clearCompleted: () => update((state) => state.filter((todo) => !todo.completed)),
    };
}

export const todos = createTodosStore();

export const enum Filter {
    All,
    Active,
    Completed,
}

function getFilterFromHash(): Filter {
    switch (window.location.hash) {
        case "#/active":
            return Filter.Active;
        case "#/completed":
            return Filter.Completed;
        default:
            return Filter.All;
    }
}

function createFilterStore() {
    const { subscribe, set, update } = writable(getFilterFromHash());
    return {
        subscribe,
        set,
        update,
    };
}

export const filter = createFilterStore();
