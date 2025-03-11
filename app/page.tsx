
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>Todo App</h1>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo"
        />
        <Button onClick={handleAddTodo}>Add Todo</Button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              textAlign: "left",
            }}
          >
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => handleToggleTodo(todo.id)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            >
              {todo.text}
            </label>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
