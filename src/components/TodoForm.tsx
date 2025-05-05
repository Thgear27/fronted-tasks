import React, { useState } from "react";
import PlusCircleIcon from "./svgs/PlusCircleIcon";

type Props = {
  onAddTodo: (title: string) => void;
};

const TodoForm = ({ onAddTodo }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3 flex items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 text-gray-800 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!title.trim()}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 transition-all ${
              title.trim() ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
            }`}
          >
            <PlusCircleIcon size={18} />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
