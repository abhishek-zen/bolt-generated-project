
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const TodoItem = ({
  todo,
  onDelete,
  onUpdate,
}: {
  todo: { id: string; text: string; completed: boolean };
  onDelete: (id: string) => void;
  onUpdate: (id: string, completed: boolean | 'indeterminate') => void;
}) => {
  return (
    <div key={todo.id} className="flex items-center space-x-2">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={(checked) => {
          if (checked !== undefined) {
            onUpdate(todo.id, checked);
          }
        }}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.text}
      </label>
      <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </div>
  );
};

export default function Home() {
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: string, completed: boolean | 'indeterminate') => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: completed === true } : todo))
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Add a todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>
      <div className="flex flex-col space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
}
