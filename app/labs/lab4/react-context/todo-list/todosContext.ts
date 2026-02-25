"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type Todo = { id: string; title: string };

type TodosContextType = {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<Todo>({ id: "", title: "Learn Mongo" });

  const addTodo = (t: Todo) => {
    const title = t.title.trim();
    if (!title) return;

    const newTodo: Todo = { id: Date.now().toString(), title };
    setTodos((prev) => [...prev, newTodo]);
    setTodo({ id: "", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setTodo((curr) => (curr.id === id ? { id: "", title: "" } : curr));
  };

  const updateTodo = (t: Todo) => {
    const title = t.title.trim();
    if (!t.id || !title) return;

    setTodos((prev) => prev.map((x) => (x.id === t.id ? { ...x, title } : x)));
    setTodo({ id: "", title: "" });
  };

  const value = useMemo(
    () => ({ todos, todo, setTodo, addTodo, deleteTodo, updateTodo }),
    [todos, todo]
  );

  return React.createElement(TodosContext.Provider, { value }, children);
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used inside <TodosProvider>");
  return ctx;
}