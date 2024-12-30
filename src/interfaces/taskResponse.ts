export interface ITaskResponse {
  completed: boolean;
  title: string;
  description: string;
  createdAt: string;
  id: string;
}

export interface TaskResponse {
  total: number;
  tasks: ITaskResponse[];
}
