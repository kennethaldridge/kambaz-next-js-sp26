import { create } from "zustand";

export type Todo = { id: string; title: string };

type TodoStore = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "", title: "Learn Mongo" }, // default input value

  setTodo: (todo) => set({ todo }),

  addTodo: () => {
    const { todos, todo } = get();
    const title = todo.title.trim();
    if (!title) return;

    const newTodo: Todo = { id: Date.now().toString(), title };
    set({
      todos: [...todos, newTodo],
      todo: { id: "", title: "Learn Mongo" },
    });
  },

  deleteTodo: (id) => {
    const { todos, todo } = get();
    set({
      todos: todos.filter((t) => t.id !== id),
      todo: todo.id === id ? { id: "", title: "Learn Mongo" } : todo,
    });
  },

  updateTodo: () => {
    const { todos, todo } = get();
    const title = todo.title.trim();
    if (!todo.id || !title) return;

    set({
      todos: todos.map((t) => (t.id === todo.id ? { ...t, title } : t)),
      todo: { id: "", title: "Learn Mongo" },
    });
  },
}));