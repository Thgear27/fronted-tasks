export type Todo = {
  id: string;
  text: string;
  finished: boolean;
  createdAt: string;
};

export type TodoCreateInput = Omit<Todo, "id" | "createdAt">;
export type TodoUpdateInput = Partial<Omit<Todo, "id" | "createdAt">>;
