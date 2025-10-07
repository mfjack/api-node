export type TaskStatus = "pending" | "done";

export interface CreateTaskData {
  userId: string;
  title: string;
  description?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
