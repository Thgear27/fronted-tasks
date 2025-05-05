import { Todo, TodoCreateInput, TodoUpdateInput } from "../types/todo";
import axios from "axios";

export const fetchTodos = async (): Promise<Todo[] | undefined> => {
  try {
    const { data: tasks } = await axios.get<Todo[]>(`${import.meta.env.VITE_API_URL}/tasks`);
    if (tasks) return tasks;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const createTodo = async (todo: TodoCreateInput): Promise<Todo | undefined> => {
  try {
    const { data: task } = await axios.post<Todo[]>(`${import.meta.env.VITE_API_URL}/tasks`, todo);
    console.log(task[0]);
    return task[0];
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

export const updateTodo = async (id: string, update: TodoUpdateInput): Promise<Todo | undefined> => {
  try {
    const { data: task } = await axios.put<Todo[]>(`${import.meta.env.VITE_API_URL}/tasks/${id}`, update);
    console.log(task[0]);
    return task[0];
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete<Todo[]>(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
