import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import EmptyList from "./EmptyList";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/todoService";
import { useState, useEffect } from "react";
import type { Todo, TodoUpdateInput } from "../types/todo";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchTodos();

      if (!data) {
        setError("Failed to load tasks. Please try again later.");
        return;
      }

      setTodos(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again later.");
      console.error(err);
    }

    setIsLoading(false);
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo({
        text: title,
        finished: false,
      });

      if (!newTodo) return;

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error(err);
    }
  };

  const handleToggleComplete = (todoToUpdate: Todo) => {
    return async () => {
      try {
        const todoUpdated = await updateTodo(todoToUpdate.id, { finished: !todoToUpdate.finished });
        if (!todoUpdated) return;

        setTodos((prev) =>
          prev.map((todo) => (todo.id === todoToUpdate.id ? { ...todo, finished: !todo.finished } : todo))
        );
      } catch (err) {
        setError("Failed to update task. Please try again.");
        console.error(err);
      }
    };
  };

  const handleUpdateTodo = async (id: string, updates: TodoUpdateInput) => {
    try {
      const todoUpdated = await updateTodo(id, updates);
      if (!todoUpdated) return;

      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todoUpdated } : todo)));
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Master</h1>
        <p className="text-gray-600">Organize your tasks efficiently</p>
      </header>

      <TodoForm onAddTodo={handleAddTodo} />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-red-700 font-medium hover:text-red-800">
            Dismiss
          </button>
        </div>
      )}

      {isLoading && !todos ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading tasks...</span>
        </div>
      ) : todos.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Your Tasks</h2>
            <div className="text-sm text-gray-500">
              {todos.filter((t) => t.finished).length}/{todos.length} completed
            </div>
          </div>
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete(todo)}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default TodoList;
