import React, { useState } from "react";
import CheckIcon from "./svgs/CheckIcon";
import EditIcon from "./svgs/EditIcon";
import TrashIcon from "./svgs/TrashIcon";
import CloseIcon from "./svgs/CloseIcon";
import type { Todo, TodoUpdateInput } from "../types/todo";

type Props = {
  todo: Todo;
  onToggleComplete: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: TodoUpdateInput) => void;
};

const TodoItem = ({ todo, onToggleComplete, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.text);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onUpdate(todo.id, {
        text: title.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(todo.text);
    setIsEditing(false);
  };

  const confirmDelete = () => {
    setIsConfirmingDelete(true);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  return (
    <div
      className={`mb-4 bg-white rounded-lg shadow-sm border transition-all duration-300 overflow-hidden ${
        todo.finished ? "border-green-200 bg-green-50" : "border-gray-200"
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1 text-sm"
            >
              <CloseIcon size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1 text-sm"
            >
              <CheckIcon size={16} /> Save
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggleComplete()}
              className={`mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border transition-colors ${
                todo.finished ? "border-green-500 bg-green-500 text-white" : "border-gray-300 hover:border-blue-500"
              }`}
              aria-label={todo.finished ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.finished && <CheckIcon size={12} />}
            </button>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-medium break-words ${
                  todo.finished ? "text-gray-500 line-through" : "text-gray-800"
                }`}
              >
                {todo.text}
              </h3>
              <div className="mt-2 text-xs text-gray-400">Created: {new Date(todo.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                aria-label="Edit task"
              >
                <EditIcon size={18} />
              </button>
              <button
                onClick={confirmDelete}
                className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Delete task"
              >
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
          {isConfirmingDelete && (
            <div className="mt-3 p-3 bg-red-50 rounded-md border border-red-100 flex items-center justify-between">
              <p className="text-sm text-red-800">Are you sure you want to delete this task?</p>
              <div className="flex gap-2">
                <button
                  onClick={cancelDelete}
                  className="px-2 py-1 text-xs bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
