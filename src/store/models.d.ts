export interface IProject {
  name: string;
  taskList: ITask[];
}
export interface ITask {
  name: string;
  description: string;
  mark: boolean;
  nestedTasks: ITask[];
}
