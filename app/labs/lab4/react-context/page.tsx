"use client";

import { CounterProvider } from "./counter/context";
import CounterContext from "./counter";
import { TodosProvider } from "./todo-list/todosContext";
import ReactContextTodoList from "./todo-list/ReactContextTodoList";

export default function ReactContextExamples() {
 return (
   <div>
     <h1>React Context Examples</h1>
     <CounterProvider>
       <CounterContext />
     </CounterProvider>
     <TodosProvider>
        <ReactContextTodoList />
     </TodosProvider>
   </div>
 );
}
